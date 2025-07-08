import { useNavigate } from 'react-router-dom';
import defaultImage from '../assets/defaultImage.png';

export default function Card({ id, category, name, price, onAddToCart }) {
  
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  }
  
  
  return (
    <div
    onClick={handleCardClick} 
    className="
      bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300
      ph:max-w-[90vw] dt:max-w-sm"> {/*박스 너비-데스크탑일때 max로 보이도록 코드 추가했습니다.*/}
      <div className="
      w-full overflow-hidden
      ph:aspect-square dt:aspect-[3/2]"> {/*이미지 비율을 모바일에서는 정사각형, 데스크탑에서 3:2로 보이게 기존 코드수정했습니다. */}
        <img src={defaultImage} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <p className="
         text-gray-500 mb-1
         ph:text-xs dt:text-sm"> {/*글자 크기 조정을 위해 코드 수정했습니다.*/}
          {category}</p>
        <h3 className="
        font-semibold text-gray-800 mb-2 truncate
        ph:text-sm dt:text-base">{/*제목 부분 크기 조정을 위해 코드 수정했습니다.*/}
        {name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="
          font-bold
          ph:text-base dt:text-lg"> {/* 가격 부분 크기 조정을 위해 코드 수정했습니다.*/}
          ${price}</span>
          <button
            onClick={(e) => { 
              e.stopPropagation();
              onAddToCart();
            }}
            className=" 
            bg-violet-600 text-white rounded hover:bg-violet-700
            ph:px-2 dt:px-3 
            ph:py-0.5 dt:py-1
            ph:text-xs dt:text-sm
            "> {/*순서대로 버튼 가로, 세로 패딩 추가하였고, 버튼 글자 크기도 코드 추가하였습니다.*/}
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
