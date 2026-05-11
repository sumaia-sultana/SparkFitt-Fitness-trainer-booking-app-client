import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Comoponent/hooks/useAxiosSecure';
import LoadSpinner from '../../Comoponent/Shared/LoadSpinner';

const FeaturedCls = () => {
    const axiosSecure = useAxiosSecure();

  const { data: featured = [], isLoading } = useQuery({
    queryKey: ['featuredClasses'],
    queryFn: async () => {
      const res = await axiosSecure.get('/featured-classes');
      return res.data;
    }
  });

  if (isLoading) return <LoadSpinner />;
    return (
        <section className="w-1/3 mx-5 px-3">
      <h2 className="text-3xl text-[#6366f1] font-bold text-left mb-8"> Featured Classes</h2>
      <div className="grid grid-cols-1 gap-6">
        {featured.map((cls) => (
          <div key={cls._id} className="p-4 border border-[#9ca3af] dark:[]  rounded-2xl shadow-md">
            <h3 className="text-xl text-[#6366f1] font-semibold">{cls.name}</h3>
            {/* <p className="text-gray-600 mb-2">{cls. }</p> */}
            <p className="text-sm  ">Total Bookings: {cls.bookingCount || 0}</p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default FeaturedCls;