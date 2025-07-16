import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { fetchProductById } from '../apis/products';
import defaultImage from '../assets/defaultImage.png';
import exitIcon from '../assets/exit.svg';
import cartIcon from '../assets/purpleCart.svg';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        console.log('상품 상세 조회 성공: ', data);
        setProduct(data);
      } catch (err) {
        console.error('상품 상세 조회 실패:', err);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setShowModal(true);
    }
  };

  const totalPrice = product ? (product.price * quantity).toLocaleString() : 0;

  if (!product) return <div className="p-6 text-center">상품을 불러오는 중입니다...</div>;

  return (
    <main className="max-w-5xl mx-auto p-8 bg-white">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img src={defaultImage} alt={product.name} className="w-72 h-72 object-contain" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
          <div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-400">카테고리</p>
              <button onClick={() => setLiked(!liked)} className="p-1 hover:opacity-70">
                <img src={likeIcon} alt="찜하기" className={`w-5 h-5 ${liked ? 'opacity-100' : 'opacity-30'}`} />
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-1">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-right text-gray-800">
              {product.price.toLocaleString()}원
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">구매 수량</p>
            <div className="flex items-center gap-4 mb-4">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 border rounded text-lg">−</button>
              <span className="text-lg">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 border rounded text-lg">+</button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-400">총 상품 금액</span>
              <span className="text-lg font-semibold text-black">₩{totalPrice}</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-2 rounded bg-[#6B21A8] text-white hover:bg-[#5A189A]"
            >
              장바구니
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="relative bg-white w-full max-w-xs md:max-w-sm p-6 rounded-md shadow-md text-center">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-500 hover:opacity-70">
              <img src={exitIcon} alt="닫기" className="w-4 h-4" />
            </button>
            <div className="flex justify-center mb-3">
              <img src={cartIcon} alt="장바구니" className="w-6 h-6" />
            </div>
            <p className="text-sm text-gray-700 font-medium mb-6">장바구니에 추가되었습니다.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowModal(false)} className="text-sm text-violet-600 hover:underline">
                쇼핑 계속하기
              </button>
              <button onClick={() => navigate('/cart')} className="bg-[#6B21A8] hover:bg-[#5A189A] text-white text-sm px-4 py-2 rounded">
                장바구니 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
