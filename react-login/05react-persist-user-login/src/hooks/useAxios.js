import { axiosPrivate } from "../api/axios"
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxios = () => {
  const refresh = useRefreshToken();
  const { auth: { accessToken } } = useAuth();


  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  )

  axiosPrivate.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const prevRequest = error?.config;

      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;

        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosPrivate(prevRequest);
      }

      return Promise.reject(error);
    }
  )

  return axiosPrivate;
}

export default useAxios;