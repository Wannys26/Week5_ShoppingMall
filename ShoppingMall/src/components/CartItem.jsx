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
      <span className="item-name">{item.productName}</span>
      <span className="item-qty">{item.quantity}</span>
      <span className="item-price">
        {item.totalPrice.toLocaleString()} 원
      </span>
      <button onClick={onAdd}></button>
      <button onClick={onDelete}></button>
    </div>
  );
}
