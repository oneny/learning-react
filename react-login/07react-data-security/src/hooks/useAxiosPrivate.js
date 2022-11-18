import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        // we have an accessToken with with a short time span
        // if our accessToken has expired,
        // we will be in this async error handler
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest?.send) {
          prevRequest.sent = true;
          const newAcessToken = await refresh();

          prevRequest.headers = { ...prevRequest.headers };

          prevRequest.headers["Authorization"] = `Bearer ${newAcessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [auth, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
