import { useCart } from '../contexts/CartContext';
import {useState} from 'react';
import CartItem from '../components/CartItem';


export default function CartPage() {
  const { cart, removeCheckedItems } = useCart(); 
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setCheckedItems(cart.map(item => item.id));
    } else {
      setCheckedItems([]);
    }
  };

  const handleItemCheck = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(itemId => itemId !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleDeleteSelected = () => {
  removeCheckedItems(checkedItems);  // context 내부에서 cart 업데이트
  setCheckedItems([]);        // 체크 초기화는 그대로 유지
};
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

 const checkedTotal = cart
  .filter(item => checkedItems.includes(item.id))
  .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-wrapper">
      <h2>장바구니</h2>
      <hr />
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>장바구니가 비었습니다.</p>
          <button onClick={() => window.location.href = '/'} className="go-shopping">쇼핑하러 가기</button>
        </div>
      ) : (
        <>
          <div className="cart-main">
            <div className="cart-items">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  checked={checkedItems.includes(item.id)}
                  onCheck={() => handleItemCheck(item.id)}
                />
              ))}
            </div>

            <div className="cart-summary">
              <p>총 주문 금액 <b>{checkedTotal.toLocaleString()} 원</b></p>
              <p>할인 금액 0 원</p>
              <p>배송비 0 원</p>
              <p><b>총 결제 금액 {checkedTotal.toLocaleString()} 원</b></p>
              <button className="checkout-btn">결제하기</button>
            </div>
          </div>

          <div className="cart-actions">
            <label>
              <input
                type="checkbox"
                onChange={handleCheckAll}
                checked={checkedItems.length === cart.length}
              /> 전체 선택 |
            </label>
            <button className="delete-selected" onClick={handleDeleteSelected}>
              선택 삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
}
