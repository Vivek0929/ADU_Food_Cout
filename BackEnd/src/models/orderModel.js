import pool from "../config/db.js";

export const createOrder = async (order) => {
  const { userId, items, total, timeSlotId, timeSlot, instructions, status = "Pending" } = order;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.query(
      "INSERT INTO orders (userId, total, timeSlotId, timeSlot, instructions, status) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, total, timeSlotId || null, timeSlot || null, instructions || null, status]
    );
    const orderId = result.insertId;
    if (items && items.length > 0) {
      const itemValues = items.map((item) => [orderId, item.id, item.name, item.quantity, item.price]);
      await conn.query(
        "INSERT INTO order_items (orderId, foodId, name, quantity, price) VALUES ?",
        [itemValues]
      );
    }
    await conn.commit();
    return { id: orderId, ...order };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export const getAllOrders = async () => {
  const [orders] = await pool.query(
    `SELECT o.*, u.name as customer, u.email as customerEmail
     FROM orders o LEFT JOIN users u ON o.userId = u.id
     ORDER BY o.createdAt DESC`
  );
  for (const order of orders) {
    const [items] = await pool.query("SELECT * FROM order_items WHERE orderId = ?", [order.id]);
    order.items = items;
    order.items_list = items.map((i) => `${i.name} x${i.quantity}`).join(", ");
  }
  return orders;
};

export const getUserOrders = async (userId) => {
  const [orders] = await pool.query(
    "SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC",
    [userId]
  );
  for (const order of orders) {
    const [items] = await pool.query("SELECT * FROM order_items WHERE orderId = ?", [order.id]);
    order.items = items;
    order.items_list = items.map((i) => `${i.name} x${i.quantity}`).join(", ");
  }
  return orders;
};

export const getOrderById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
  if (!rows[0]) return null;
  const order = rows[0];
  const [items] = await pool.query("SELECT * FROM order_items WHERE orderId = ?", [id]);
  order.items = items;
  order.items_list = items.map((i) => `${i.name} x${i.quantity}`).join(", ");
  return order;
};

export const updateOrderStatus = async (id, status) => {
  await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
  return getOrderById(id);
};
