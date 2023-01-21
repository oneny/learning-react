import axios from 'axios';

export type TUserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}


const delay = () => new Promise<void>((res) => setTimeout(() => res(), 1800));

const usersApi = axios.create({
  baseURL: 'http://localhost:3500',
});

export const usersUrlEndpoint = '/users';

export const getUsers = async () => {
  await delay();
  const response = await usersApi.get<TUserData[]>(usersUrlEndpoint);
  return response.data;
};

export const getUserById = async (url: string, userId: number) => {
  await delay();
  const response = await usersApi.get<TUserData>(`${url}/${userId}`);
  return response.data;
};

