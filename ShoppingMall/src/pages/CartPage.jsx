import { useEffect, useState } from 'react';
import { cartData } from '../mock/CartData';
import CartItem from '../components/CartItem';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    // mock 데이터 불러오기
    setCart(cartData);
  }, []);

    const handleCheckAll = (e) => {
    if (e.target.checked) {
      setCheckedItems(cart.map(item => item.id)); // 모든 ID 체크
    } else {
      setCheckedItems([]); // 전체 해제
    }
  };

const handleItemCheck = (id) => {
  if (checkedItems.includes(id)) {
    setCheckedItems(checkedItems.filter(itemId => itemId !== id));
  } else {
    setCheckedItems([...checkedItems, id]);
  }
};


  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-wrapper">
      <h2>장바구니</h2>
      <hr />

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>장바구니가 비었습니다.</p>
          <button className="go-shopping">쇼핑하러 가기</button>
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
            <p>총 주문 금액 <b>{total.toLocaleString()} 원</b></p>
            <p>할인 금액 0 원</p>
            <p>배송비 0 원</p>
            <p>
              <b>총 결제 금액 {total.toLocaleString()} 원</b>
            </p>
            <button className="checkout-btn">
                <div className="checkout-btn-message">결제하기</div>
                </button>
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
            <button className="delete-selected">선택 삭제</button>
          </div>
        </>
      )}
    </div>
  );
}
