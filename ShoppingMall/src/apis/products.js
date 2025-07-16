import instance from './instance';

// 전체 상품 조회
export const fetchAllProducts = async () => {
  const res = await instance.get('/products');
  return res.data.products;
};

// 상품 개별 조회
export const fetchProductById = async (id) => {
  const res = await instance.get(`/products/${id}`);
  return res.data;
};

// 상품 이름 검색
export const searchProducts = async (name) => {
  const res = await instance.get('/products', {
    params: { name },
  });
  return res.data.products;
};
