import XFrame from '../assets/XFrame.svg';
import defaultImage from '../assets/defaultImage.png';

export default function CartItem({ item, checked, onCheck, onAdd, onDelete }) {
  return (
    <div className="cart-item">
      <input type="checkbox" checked={checked} onChange={onCheck} />
      <img
        src={item.image || defaultImage}
        alt={item.name}
        className="item-img"
      />
      <span className="item-name">{item.name}</span>
      <span className="item-qty">{item.quantity}</span>
      <span className="item-price">
        {(item.price * item.quantity).toLocaleString()} 원
      </span>
      <button onClick={onAdd}>+1</button>
      <button onClick={onDelete}>
        <img src={XFrame} alt="삭제" />
      </button>
    </div>
  );
}
