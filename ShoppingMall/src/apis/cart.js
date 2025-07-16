import instance from './instance';

// 장바구니 조회
export const getCart = async () => {
  const res = await instance.get('/cart');
  return res.data;
};

// 장바구니 아이템 추가
export const addToCart = async (productId, quantity) => {
  const res = await instance.post('/cart', {
    productId,
    quantity,
  });
  return res.data;
};

// 장바구니 아이템 삭제
export const deleteCartItem = async (id) => {
  const res = await instance.delete(`/cart/${id}`);
  return res.data;
};
