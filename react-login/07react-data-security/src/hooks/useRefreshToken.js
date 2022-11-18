// we want to implement in our component
// so we can use a private version of axios
// and use those tokens with it anytime we use that instance of axios
import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data);
      return { 
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken
      };
    });
    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
