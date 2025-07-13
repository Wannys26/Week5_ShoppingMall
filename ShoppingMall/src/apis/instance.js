import instance from './instance';

export const fetchAllProducts = async () => {
  const res = await instance.get('/products');
  return res.data;
};
