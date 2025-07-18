import instance from './instance';
const userId = 2;

// 1) 장바구니 조회
export const getCart = async () => {
  const res = await instance.get(`/cart/items/${userId}`);
  return res.data; 
};
// 2) 장바구니 아이템 추가
export const addToCart = async (productId, quantity) => {
  const res = await instance.post(
    `/cart/items/${userId}`,
    { productId, quantity },     
    { withCredentials: true }  
  );
  return res.data; 
};

// 3) 장바구니 아이템 삭제
export const deleteCartItem = async (cartItemId) => {
  const res = await instance.delete(
     `/cart/items/${cartItemId}?userId=${userId}`,
    { withCredentials: true }
  );
  return res.data;
};
