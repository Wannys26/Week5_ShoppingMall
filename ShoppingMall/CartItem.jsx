import XFrame from '../assets/XFrame.svg';

export default function CartItem({ item, checked, onCheck }) {
  return (
    <div className="cart-item">
      <input type="checkbox" checked={checked} onChange={onCheck} />
      <img src={item.image} alt={item.name} className="item-img" />
      <span className="item-name">{item.name}</span>
      <span className="item-qty">{item.quantity}</span>
      <span className="item-price">{(item.price * item.quantity).toLocaleString()} 원</span>
      <button className="delete-btn">
        <img src={XFrame} className="delete-icon" />
      </button>
    </div>
  );
}
