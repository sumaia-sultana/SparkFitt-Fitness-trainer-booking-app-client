import React from 'react';
import PaymentForm from './PaymentForm';
 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_SECURE_KEY);

const Payment = () => {
    return (
       <Elements stripe={stripePromise}>
  <PaymentForm />
</Elements>
    );
};

export default Payment;