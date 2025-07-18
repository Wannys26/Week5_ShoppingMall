import instance from './instance';

// 장바구니 조회
export const getCart = async () => {
  const res = await instance.get('/cart');
  console.log('장바구니 조회 응답:', res.data);
  return res.data;
};

// 장바구니 아이템 추가
export const addToCart = async (productId, quantity) => {
  const res = await instance.post('/cart', {
    productId,
    quantity,
  });
  console.log('장바구니 추가 완료');
  return res.data;
};

// 장바구니 아이템 삭제
export const deleteCartItem = async (id) => {
  const res = await instance.delete(`/cart/${id}`);
  return res.data;
};
