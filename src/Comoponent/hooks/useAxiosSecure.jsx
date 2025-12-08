import axios from 'axios'
import useAuth from './useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
   headers: {
      "Content-Type": "application/json"
    }
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const {  logOut } = useAuth()
  useEffect(() => {
     const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      // console.log({token});
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // ✅ Response interceptor — handle auth errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        console.log('Error caught from axios interceptor -->', error.response);
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // ✅ Cleanup interceptors when unmounted
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);
  return axiosSecure
}

export default useAxiosSecure
