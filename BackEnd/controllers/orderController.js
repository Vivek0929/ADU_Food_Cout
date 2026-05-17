import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import pool, { dbState } from '../config/db.js';

const ORDERS_FILE = fileURLToPath(new URL('../orders_store.json', import.meta.url));

// Helper: Ensure the orders_store.json fallback file exists
export const ensureOrdersFile = async () => {
  try {
    await fs.access(ORDERS_FILE);
  } catch (e) {
    await fs.writeFile(ORDERS_FILE, JSON.stringify([]));
  }
};

const readOrdersFromFile = async () => {
  try {
    const txt = await fs.readFile(ORDERS_FILE, 'utf-8');
    return JSON.parse(txt || '[]');
  } catch (e) {
    return [];
  }
};

const writeOrdersToFile = async (orders) => {
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
};

// GET /api/orders
export const getAllOrders = async (req, res) => {
  try {
    if (dbState.dbAvailable) {
      const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
      // Parse the items back from JSON string if needed, although frontend expects string for items_list
      // We will parse items_json if it exists so the frontend gets the full object back
      const parsedRows = rows.map(row => ({
        ...row,
        items: row.items_json ? JSON.parse(row.items_json) : []
      }));
      return res.json(parsedRows);
    } else {
      const orders = await readOrdersFromFile();
      // Sort newest first
      orders.sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at));
      return res.json(orders);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    // ensure required fields
    if (!newOrder.id || !newOrder.customer) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }

    if (dbState.dbAvailable) {
      const itemsJson = JSON.stringify(newOrder.items || []);
      const createdAt = newOrder.createdAt || new Date().toISOString();
      const status = newOrder.status || 'Pending';

      await pool.query(
        `INSERT INTO orders (id, customer, items_json, items_list, total, time, created_at, status, timeSlotId, timeSlot, instructions)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newOrder.id,
          newOrder.customer,
          itemsJson,
          newOrder.items_list || '',
          newOrder.total || 0,
          newOrder.time || '',
          createdAt,
          status,
          newOrder.timeSlotId || null,
          newOrder.timeSlot || '',
          newOrder.instructions || ''
        ]
      );
      return res.status(201).json(newOrder);
    } else {
      const orders = await readOrdersFromFile();
      orders.push(newOrder);
      await writeOrdersToFile(orders);
      return res.status(201).json(newOrder);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// PATCH /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ error: 'Status is required' });

    if (dbState.dbAvailable) {
      const [result] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.json({ message: 'Order updated successfully', id, status });
    } else {
      const orders = await readOrdersFromFile();
      const orderIndex = orders.findIndex(o => o.id === id);
      
      if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }

      orders[orderIndex].status = status;
      await writeOrdersToFile(orders);
      return res.json({ message: 'Order updated successfully', id, status });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};
