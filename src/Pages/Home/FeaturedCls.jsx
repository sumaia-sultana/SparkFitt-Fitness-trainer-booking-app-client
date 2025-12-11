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
        <section className="my-12">
      <h2 className="text-3xl text-[#3624bf] font-bold text-center mb-8"> Featured Classes</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((cls) => (
          <div key={cls._id} className="p-4   rounded-2xl shadow-md">
            <h3 className="text-xl text-[#3624bf] font-semibold">{cls.name}</h3>
            {/* <p className="text-gray-600 mb-2">{cls. }</p> */}
            <p className="text-sm  ">Total Bookings: {cls.bookingCount || 0}</p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default FeaturedCls;