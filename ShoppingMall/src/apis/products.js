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

// 상품 이름 검색 (GET /products?name=검색어)
// encodeURIComponent()는 검색어에 띄어쓰기, 특수문자, 한글, %, &, = 등이 있을 때
//URI(주소)로 안전하게 변환해주는 함수
export const searchProducts = async (name) => {
  const res = await instance.get(`/products?name=${encodeURIComponent(name)}`);
  return res.data.products;
};