import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Comoponent/hooks/useAxiosSecure';
import useAuth from '../../Comoponent/hooks/useAuth';

const NewsLetter = () => {
    const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false); 

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

   const handleFocus = () => {
    if (!focused) {
      setFocused(true);
      if (user?.email) {
        setEmail(user.email);
      }
    }
  };

  // Prefill email if user is logged in
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Oops!", "Please enter an email address.", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosSecure.post("/subscribers", { email });
      setSubmitted(true);
      Swal.fire("Subscribed!", response.data.message, "success");
    } catch (error) {
      console.error("Subscription failed:", error);
      if (error.response?.status === 409) {
        Swal.fire("Already Subscribed", error.response.data.message, "info");
        setSubmitted(true);
      } else {
        Swal.fire("Error", "Subscription failed. Try again later.", "error");
      }
    } finally {
      setLoading(false);
    }
  };
    return (
      <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl text-[#064877] font-bold mb-4">Spark Up Your Inbox — Subscribe & Stay with Us!</h2>
        <p className="mb-6 text-gray-600">Stay connected with the sustainable fitness tips, exclusive offers, and updates that will be delivered straight to your inbox.</p>
        <form onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
           placeholder={focused ? '' : 'Please enter your email to subscribe.. e.g-abc@gmail.com'}
            onFocus={handleFocus}
            className="w-full sm:w-[400px] px-4 py-3 text-base placeholder:text-base placeholder:text-gray-400 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064877]"
             value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={submitted}/>

     <button 
     type="submit"
     disabled={submitted || loading}
     className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
    <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-[#064877] rounded-md group-hover:mt-0 group-hover:ml-0"></span>
    <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[#064877] rounded-md opacity-0 group-hover:opacity-100 "></span>
    <span className="relative text-[#064877] transition-colors duration-200 ease-in-out delay-100 group-hover:text-white"> {loading ? 'Subscribing...' : submitted ? 'Subscribed' : 'Subscribe'}</span>
    </button>
        </form>
      </div>
    </section>
    );
};

export default NewsLetter;