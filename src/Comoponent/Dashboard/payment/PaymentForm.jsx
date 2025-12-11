import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
 
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import LoadSpinner from '../../Shared/LoadSpinner';
import { useLocation, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
 

const PaymentForm = ( ) => {

  const stripe = useStripe();
  const elements = useElements();
   const location = useLocation();
   const navigate = useNavigate();
    
    const params = new URLSearchParams(location.search);
  const axiosSecure = useAxiosSecure();
  const { booking, selectedPackage } = location.state || {};
   const packageType = params.get('packageType');  
  const trainerName = params.get('trainer');  
  const slotId = params.get('slotId');
  console.log(packageType, trainerName, slotId);
  
  const { user } = useAuth();


   // ✅ Fetch user's previous bookings
  const { data: prevPayments = [], isLoading } = useQuery({
    queryKey: ['userBookings', user?.email],
   enabled: !!user?.email && !!booking?.classes?.[0]?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    }
  });
   if (isLoading || !booking || !selectedPackage) {
    return <div className="text-center"><LoadSpinner /></div>;
  }
   const alreadyBooked = prevPayments.some(b => b.slotId === slotId);
   

    const handleSubmit = async (e) => {
        e.preventDefault();
     const classId = booking?.classes?.[0]?._id;

    // Prevent double booking of same class
    const alreadyPaidForClass = prevPayments.some(
     (payment) => payment.classId === classId && payment.userEmail === user.email
    );

        
    if (alreadyPaidForClass) {
     Swal.fire({
    icon: 'warning',
    title: 'Duplicate Booking',
    text: 'You have already booked this class slot.',
    confirmButtonColor: '#064877',
  });
      return;
    }
         
        try {
      // Step 1: Create payment intent
      const { data } = await axiosSecure.post('/create-payment-intent', {
        amountInCents: selectedPackage.price * 100  
      });

      const clientSecret = data.clientSecret;

      // Step 2: Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.displayName || 'Anonymous',
            email: user?.email || 'no-email',
          },
        },
      });

      if (error) {
        Swal.fire('Payment Error', error.message, 'error');
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Step 3: Save payment in database
        await axiosSecure.post('/payments', {
          transactionId: paymentIntent.id,
          price: selectedPackage.price,
          trainerName: booking.trainerName,
          slotName: booking.slot_name,
          packageName: selectedPackage.name,
          userEmail: user.email,
          userName: user.displayName,
          date: new Date(),
          classId: booking.classes?.[0]?._id,
        });
         const classId = booking?.classes?.[0]?._id;
        if (!classId) {
       console.error('  booking.classes[0]._id is missing:', booking);
       Swal.fire('Booking Error', 'Class ID not found. Please try again.', 'error');
       return;
       }

        // Step 4: Update booking count
        await axiosSecure.patch(`/class-booking-count/${classId}`);

        Swal.fire('Payment Successful', 'Thank you for your purchase!', 'success');
       navigate(`/dashboard/booked-trainer`);
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Server Error', err.message, 'error');
    }
  };

   
   return (
  <div className="max-w-lg mx-auto space-y-6">
    <div className=" p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
      <p><strong>Trainer:</strong> {booking.trainerName}</p>
      <p><strong>Slot:</strong> {booking.slot_name}</p>
      <p><strong>Package:</strong> {selectedPackage.name}</p>
      <p><strong>Price:</strong> ${selectedPackage.price}</p>
      <p><strong>Member Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>

    <form onSubmit={handleSubmit}>
      <CardElement className="py-6 px-4 border border-gray-300 text-[#3624bf] rounded-lg" />
      <button
        type="submit"
       disabled={alreadyBooked}
        className={`lg:px-4 p-0.5 py-2 rounded w-full transition ${
            alreadyBooked
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#3624bf] text-white hover:bg-[#58829f]'
          }`}
        >
          {alreadyBooked ? 'Already Booked' : 'Pay Now'} ${selectedPackage.price}
      </button>
    </form>
  </div>
);


};

export default PaymentForm;