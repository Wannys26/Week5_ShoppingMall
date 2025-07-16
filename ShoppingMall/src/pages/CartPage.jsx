import { useCart } from '../contexts/CartContext';
import { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { getCart, addToCart, deleteCartItem } from '../apis/cart';

export default function CartPage() {
  const { cart, removeCheckedItems, setCart, addToCart: addToCartContext, removeItems } = useCart();
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data.cartItems); 
      } catch (err) {
        console.error('장바구니 불러오기 실패:', err);
      }
    };
    fetchCart();
  }, []);

   if (!cart) {
    return <div>장바구니 데이터를 불러오는 중입니다...</div>;
  }

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
    removeCheckedItems(checkedItems); 
    setCheckedItems([]);
  };

  const handleAdd = async (item) => {
    try {
      await addToCart(item.id, 1);          
      addToCartContext(item, 1);
    } catch (err) {
      console.error('수량 추가 실패:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCartItem(id);
      removeItems([id]);
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  const checkedTotal = Array.isArray(cart)
    ? cart
      .filter(item => checkedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="cart-wrapper">
      <h2>장바구니</h2>
      <hr />
      {Array.isArray(cart) && cart.length === 0 ? (
        <div className="empty-cart">
          <p>장바구니가 비었습니다.</p>
          <button onClick={() => window.location.href = '/'} className="go-shopping">쇼핑하러 가기</button>
        </div>
      ) : (
        <>
          <div className="cart-main">
            <div className="cart-items">
              {Array.isArray(cart) && cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  checked={checkedItems.includes(item.id)}
                  onCheck={() => handleItemCheck(item.id)}
                  onAdd={() => handleAdd(item)}
                  onDelete={() => handleDelete(item.id)}
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
