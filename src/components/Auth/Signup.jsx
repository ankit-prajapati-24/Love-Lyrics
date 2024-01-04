import React ,{useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
// import { setuserdata } from '../slices/SignUpData';
import { useForm } from 'react-hook-form';
import { apiConnecter } from '../../services/apiconnecter';
// import { apiConnecter } from '../services/apiconnecter';

// import logo from '../assets/IMG_20230909_193215-removebg-preview-removebg-preview.png'

function Signup() {
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const cType = watch('cType');


  const onSubmit = async (formData) => {
    const toastid = toast.loading("Loading...");
    try {
      if(formData.password.length < 8 ){
        toast.error("Password should be at least 8 characters");
        return;
      }
      if(formData.confirmPassword !== formData.password){ 
        return;
             toast.error("Password Does Not Match");
      }
      if(formData.uid.length < 12){
        toast.error("UID should be at least 12 digit");

        return;
      }
      setLoading(true);
    //   dispatch(setuserdata(formData));
      const uidres = await apiConnecter("POST", "http://localhost:4000/api/v1/auth/verifyuid", formData);
      console.log(uidres.data.data.Failed,"this is uid res");
      // if()
       if(uidres.data.data.Failed != null){
         toast.error(uidres.data.data.Failed.ErrorMessage);
         toast.dismiss(toastid);
       }

      const res = await apiConnecter("POST", "http://localhost:4000/api/v1/auth/sendotp", formData);
      if (res.data.success) {
        toast.success("Otp Send Successfully");
        navigate('/VerifyOtp');
      }
    } catch (err) {
      console.error(err, "Error sending OTP");
      toast.error("Error sending OTP. Please try again.");
    } finally {
      toast.dismiss(toastid);
      setLoading(false);
    }
  };

  return (
      <div className="flex bg-black h-screen max-w-[1600px]  mx-auto w-full object-cover relative border ">
      <LoadingBar color="red" ref={ref} />
   
    

         <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[500px] mx-auto  flex flex-col gap-y-4 p-6 rounded-md   shadow-lg ">
            <h1 className='text-3xl p-2 font-bold text-white mb-3 mx-auto flex items-center justify-center z-10 '>SignUp</h1>
            {/* <div className="flex gap-x-4">
              <label className="flex-1">
                <p className="mb-1 text-sm leading-[1.375rem] text-gray-700">
                  First Name <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="firstName"
                  {...register('firstName', { required: true })}
                  placeholder="Enter first name"
                  className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
                />
              </label>
              <label className="flex-1">
                <p className="mb-1 text-sm leading-[1.375rem] text-gray-700 ">
                  Last Name <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="lastName"
                  {...register('lastName', { required: true })}
                  placeholder="Enter last name"
                  className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
                />
              </label>
            </div> */}
            <label className="w-full">
              <p className="mb-1 text-sm leading-[1.375rem] text-gray-700">
                Email Address <sup className="text-red-500 ">*</sup>
              </p>
              <input
                required
                type="text"
                name="email"
                {...register('email', { required: true })}
                placeholder="Enter email address"
                className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
              />
            </label>
            {/* <label className="w-full">
              <p className="mb-1 text-sm leading-[1.375rem] text-gray-700">
                UID <sup className="text-red-500">*</sup>
              </p>
              <input
                type="text"
                name="uid"
                {...register('uid', { required: true })}
                placeholder="Enter 12 Digit Aadhar Number"
                className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
              />
            </label> */}
            <div className="flex flex-col gap-x-4">
              <label className="relative flex-1">
                <p className="mb-1 text-sm leading-[1.375rem] text-gray-700  ">
                  Create Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  {...register('password', { required: true })}
                  placeholder="Enter Password"
                  className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>

              <label className="relative flex-1">
                <p className="mb-1 text-sm leading-[1.375rem] text-gray-700 ">
                  Confirm Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  {...register('confirmPassword', { required: true })}
                  placeholder="Confirm Password"
                  className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>
            </div>

            
            <button
              type="submit"
              className="flex mx-auto rounded-md  max-w-[50%] w-[30%] lg:max-w-[290px] min-w-[180px] md:max-w-[320px] bg-black flex-col justify-between items-center px-2 py-2 border text-white hover:text-white group  mt-4"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="flex justify-center items-center text-white flex-col  gap-2">
              <p>Already Have an account?</p>
              <Link to="/Login" className="font-bold">Login</Link>
            </div>
            <GoogleLogin
        onSuccess={credentialResponse => {
            console.log(credentialResponse);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        />;
          </form>
        
      </div>
 
  );
}

export default Signup;
