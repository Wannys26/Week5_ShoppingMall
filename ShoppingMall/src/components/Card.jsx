import { useNavigate } from 'react-router-dom';
import defaultImage from '../assets/defaultImage.png';

export default function Card({ id, category, name, price, onAddToCart }) {
  
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300
        ph:max-w-[90vw] dt:max-w-sm cursor-pointer
      "
    >
      {/* 이미지 영역 */}
      <div
        className="
          w-full overflow-hidden
          ph:aspect-square dt:aspect-[3/2]
        "
      >
        <img
          src={defaultImage}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 + 버튼 영역 */}
      <div className="p-4">
        {/* 카테고리 */}
        <p className="text-gray-500 mb-1 ph:text-xs dt:text-sm">
          {category}
        </p>

        {/* 상품명 */}
        <h3 className="font-semibold text-gray-800 mb-2 truncate ph:text-sm dt:text-base">
          {name}
        </h3>

        {/* 가격 + 장바구니 버튼 */}
        <div className="flex justify-between items-center">
          <span className="font-bold ph:text-base dt:text-lg">
            ₩{price.toLocaleString()}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation(); // 카드 클릭 이벤트 방지
              onAddToCart();       // 장바구니 추가
            }}
            className="
              bg-violet-600 text-white rounded hover:bg-violet-700
              ph:px-2 dt:px-3
              ph:py-0.5 dt:py-1
              ph:text-xs dt:text-sm
            "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
