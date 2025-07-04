import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productData from '../data/products.json';
import defaultImage from '../assets/defaultImage.png';
import likeIcon from '../assets/LikeButton.svg';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const found = productData.find((p) => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  const handleAddToCart = () => {
    setShowModal(true);
  };

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const totalPrice = product ? (product.price * quantity).toLocaleString('ko-KR') : 0;

  if (!product) return <div className="p-6 text-center">상품을 불러오는 중입니다...</div>;

  return (
    <main className="max-w-5xl mx-auto p-8 bg-white">
      <div className="flex flex-col md:flex-row gap-10">
        {/* 이미지 */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img src={defaultImage} alt={product.name} className="w-72 h-72 object-contain" />
        </div>

        {/* 상품 정보 */}
        <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
          <div>
            {/* 카테고리 + 찜 버튼 */}
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-400">카테고리</p>
              <button onClick={() => setLiked(!liked)} className="p-1 hover:opacity-70">
                <img
                  src={likeIcon}
                  alt="찜하기"
                  className={`w-5 h-5 ${liked ? 'opacity-100' : 'opacity-30'}`}
                />
              </button>
            </div>

            <h2 className="text-2xl font-semibold mb-1">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-4">description</p>
            <p className="text-lg font-semibold text-right text-gray-800">{product.price.toLocaleString()}원</p>
          </div>

          {/* 수량 선택 */}
          <div>
            <p className="text-sm text-gray-400 mb-2">구매 수량</p>
            <div className="flex items-center gap-4 mb-4">
              <button onClick={decrease} className="w-8 h-8 border rounded text-lg">−</button>
              <span className="text-lg">{quantity}</span>
              <button onClick={increase} className="w-8 h-8 border rounded text-lg">+</button>
            </div>

            {/* 총 금액 */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-400">총 상품 금액</span>
              <span className="text-lg font-semibold text-black">₩{totalPrice}</span>
            </div>

            {/* 장바구니 버튼 */}
            <button
              onClick={handleAddToCart}
              className="w-full py-2 rounded bg-[#6B21A8] text-white hover:bg-[#5A189A]"
            >
              장바구니
            </button>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <p className="text-lg font-semibold">🛒 장바구니에 추가되었습니다!</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                계속 쇼핑하기
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
              >
                장바구니로 이동
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
