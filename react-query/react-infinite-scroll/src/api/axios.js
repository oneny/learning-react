import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://[::1]:8000'
})

export const getPostsPage = async (pageParam = 1, options = {}) => {
  const response = await api.get(`/news?page=${pageParam}&count=10`, options);
  return response.data;
};
