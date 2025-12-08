 
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
 

const useRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
         data: userInfo = {},
    isLoading: userInfoLoading,
    refetch,
  } = useQuery({
    queryKey: ['userInfo', user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users/${user.email}`);
      console.log(`/users/${user.email}`);
       
       
      return res.data; // returns full user object: { role, status, name, etc. }
    },
  });

  const roleLoading = authLoading || userInfoLoading;

    return  { role: userInfo.role || 'member',
       
        
    status: userInfo.status || '',
    roleLoading,
    refetch, };
};

export default useRole;