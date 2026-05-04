export default function FoodCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow p-3">
      <img
        src={item.image}
        alt={item.name}
        className="rounded-lg h-32 w-full object-cover"
      />
      <h2 className="font-semibold mt-2">{item.name}</h2>
      <p className="text-gray-500">₹{item.price}</p>

      <button className="mt-2 w-full bg-green-500 text-white py-1 rounded-lg">
        Add
      </button>
    </div>
  );
}