import React from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router';
import { imageUpload } from './api/utils';
import useAuth from './hooks/useAuth';
import axios from 'axios';

const Signup = () => {
  const { createUser,saveUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value

    const image = form?.image?.files[0]

    // image url response from imgbb
    const imageUrl = await imageUpload(image)

    try {
      //2. User Registration
      const result = await createUser(email, password)


      //3. Save username & profile photo
      await updateUserProfile(name, imageUrl);
      await saveUser(email, name, imageUrl);
       
      console.log(result)

 
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
       const result = await signInWithGoogle();
    const user = result.user;

    //  Check if user exists in DB first
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.email}`);
    if (!res.data || !res.data.role) {
      // If no role found, user doesn't exist yet — so save it
      await saveUser(user.email, user.displayName, user.photoURL);
    }

      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
    return (
        <div className='flex justify-center items-center min-h-screen  '>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 border border-[#d6d3d1] dark:border-[#3a3633] bg-[#f5f5f4] dark:bg-[#3a3633]'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl dark:text-[#e2e8f0] font-bold'>Sign Up</h1>
          <p className='text-sm text-[#484441] dark:text-[#6b7280]'>Welcome to SparkFit</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 dark:bg-[#3a3633] border rounded-md dark:border-[#2c2825] border-[#d6d3d1] focus:outline-[#6366f1] bg-gray-200  '
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                className='dark:border-[#2c2825] border-[#d6d3d1] rounded-md border px-4 py-2 cursor-pointer'
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
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
                className='w-full px-3 py-2 dark:bg-[#3a3633] border rounded-md dark:border-[#2c2825] border-[#d6d3d1] focus:outline-[#6366f1] bg-gray-200  '
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
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 dark:bg-[#3a3633] border rounded-md dark:border-[#2c2825] border-[#d6d3d1] focus:outline-[#6366f1] bg-gray-200  '
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
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16  bg-[#2c2825] '></div>
          <p className='px-3 text-sm  '>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16  bg-[#2c2825]'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 dark:border-[#2c2825] border-[#d6d3d1] border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center  '>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-[#6366f1] '
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
    );
};

export default Signup;