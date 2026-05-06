import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";

const foodItems = [
  {
    id: 1,
    name: "Veg Biryani",
    price: 80,
    image: "https://source.unsplash.com/300x200/?biryani",
  },
  {
    id: 2,
    name: "Dosa",
    price: 40,
    image: "https://source.unsplash.com/300x200/?dosa",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="p-4">
        <h2 className="text-lg font-bold mb-3">
          Today's Menu
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {foodItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}