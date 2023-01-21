import axios from "axios";

export type TPostsByUserIdData = {
  userId: string;
  id: string;
  title: string;
  body: string;
}

// Not needed until optimistic UI updates example
const delay = () => new Promise<void>((res) => setTimeout(() => res(), 1800));

const postsApi = axios.create({
  baseURL: 'http://localhost:3500'
});

export const postsUrlEndpoint = '/posts';

export const getPostsByUserId = async (url: string, userId: number): Promise<TPostsByUserIdData[]> => {
  await delay();
  const response = await postsApi.get<TPostsByUserIdData[]>(`${url}?userId=${userId}`);
  return response.data;
}

