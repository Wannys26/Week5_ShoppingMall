import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import {
  getCart,
  addToCart as apiAddToCart,
  deleteCartItem,
} from '../apis/cart';

export default function CartPage() {
  const { cart, setCart, removeItems, removeCheckedItems } = useCart();
  const [checkedItems, setCheckedItems] = useState([]);

  // 1) 서버에서 전체 장바구니 가져와 동기화
  const fetchAndSyncCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error('장바구니 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchAndSyncCart();
  }, []);

  
  const idField =
    cart.length > 0 && cart[0].cartItemid != null
      ? 'cartItemid'
      : 'productId';

  // cart가 바뀔 때마다 전체 선택 상태로 초기화
  useEffect(() => {
    if (cart.length > 0) {
      setCheckedItems(cart.map(item => item[idField]));
    } else {
      setCheckedItems([]);
    }
  }, [cart, idField]);

  if (!Array.isArray(cart)) {
    return <div>장바구니 데이터를 불러오는 중입니다...</div>;
  }
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <p>장바구니가 비었습니다.</p>
        <button
          onClick={() => (window.location.href = '/')}
          className="go-shopping"
        >
          쇼핑하러 가기
        </button>
      </div>
    );
  }

  // 전체 선택/해제
  const handleCheckAll = e => {
    setCheckedItems(
      e.target.checked ? cart.map(item => item[idField]) : []
    );
  };

  // 개별 선택 토글
  const handleItemCheck = uid => {
    setCheckedItems(prev =>
      prev.includes(uid) ? prev.filter(x => x !== uid) : [...prev, uid]
    );
  };

  // 선택 삭제
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(checkedItems.map(uid => deleteCartItem(uid)));
      await fetchAndSyncCart();
    } catch (err) {
      console.error('선택 삭제 실패:', err);
    }
  };

  // 개별 삭제
  const handleDelete = async uid => {
    try {
      await deleteCartItem(uid);
      await fetchAndSyncCart();
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  // 수량 추가
  const handleAdd = async item => {
    try {
      await apiAddToCart(item.productId, 1);
      await fetchAndSyncCart();
    } catch (err) {
      console.error('수량 추가 실패:', err);
    }
  };

  // 체크된 아이템 총액 계산
  const checkedTotal = checkedItems.reduce((sum, uid) => {
    const item = cart.find(x => x[idField] === uid);
    if (!item) return sum;
    return sum + (item.totalPrice ?? item.price * item.quantity);
  }, 0);

  return (
    <div className="cart-wrapper">
      <h2>장바구니</h2>
      <hr />

      <div className="cart-actions">
        <label>
          <input
            type="checkbox"
            onChange={handleCheckAll}
            checked={checkedItems.length === cart.length}
          />{' '}
          전체 선택
        </label>
        <button
          onClick={handleDeleteSelected}
          className="delete-selected"
        >
          선택 삭제
        </button>
      </div>

      <div className="cart-main">
        <div className="cart-items">
          {cart.map(item => {
            const uid = item[idField];
            const qty = item.quantity;
            const unitPrice = item.price ?? (item.totalPrice / item.quantity);
            const total = item.totalPrice ?? unitPrice * item.quantity;
            return (
              <CartItem
                key={`cart-${uid}`}                
                item={{ ...item, quantity: qty, totalPrice: total }}
                checked={checkedItems.includes(uid)}
                onCheck={() => handleItemCheck(uid)}
                onAdd={() => handleAdd(item)}
                onDelete={() => handleDelete(uid)}
              />
            );
          })}
        </div>

        <div className="cart-summary">
          <p>
            총 주문 금액 <b>{checkedTotal.toLocaleString()} 원</b>
          </p>
          <p>할인 금액 0 원</p>
          <p>배송비 0 원</p>
          <p>
            <b>총 결제 금액 {checkedTotal.toLocaleString()} 원</b>
          </p>
          <button className="checkout-btn">결제하기</button>
        </div>
      </div>
    </div>
  );
}
