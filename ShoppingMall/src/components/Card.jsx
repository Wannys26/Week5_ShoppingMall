export default function Card({ category, title, price, image, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
      <div className="w-full aspect-[3/2] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{category}</p>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 truncate">{title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-base font-bold">${price}</span>
          <button
            onClick={onAddToCart}
            className="text-sm bg-violet-600 text-white px-3 py-1 rounded hover:bg-violet-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}