import React from 'react';
import toast from 'react-hot-toast';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import useAuth from './hooks/useAuth';
import LoadSpinner from './Shared/LoadSpinner';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FcGoogle } from 'react-icons/fc';
import HelmetTitle from './HelmetTitle';

const Login = () => {
     const { signIn, signInWithGoogle, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/'
  if (user) return <Navigate to={from} replace={true} />
  if (loading) return <LoadSpinner />
  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      //User Login
      await signIn(email, password)

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle()
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
    return (
      <>
      <HelmetTitle title="Log in" />
         <div className='flex justify-center items-center min-h-screen  '>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-[#f5f5f4] border-[#d6d3d1] dark:bg-[#3a3633] dark:text-[#e2e8f0]'>
         
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-[#6b7280]'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-[#d6d3d1] dark:border-[#2c2825] focus:outline-[#6366f1] bg-[#d6d3d1] dark:bg-[#3a3633]  '
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-[#d6d3d1] dark:border-[#2c2825] focus:outline-[#6366f1] bg-[#d6d3d1] dark:bg-[#3a3633]  '
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-[#6366f1] w-full rounded-md py-3 text-[#ffffff]'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-[#6366f1] text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16  bg-[#2c2825]'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16  bg-[#2c2825]'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center dark:text-[#e2e8f0]'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-[#6366f1] dark:text-[#e2e8f0]'>
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
      </>
    );
};

export default Login;