import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import Input from '../../components/inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';
import { validateEmail } from '../../utils/helper';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext); //Import user context
  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName){
        setError("please enter your Full Name.");
        return;
    }
    if (!validateEmail(email)){
        setError("please enter a valid email address.");
        return;
    }
    if (!password) {
      setError("Please enter the paassword");
      return;
    }

    setError("");

    try {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("adminInviteToken", adminInviteToken);
      if (profilePic) {
        formData.append("profileImage", profilePic);
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { token , role } = response.data;

      if (token) {
       localStorage.setItem("token", token);
       updateUser(response.data); //Update user context

       //Redirect based on role
       if (role === "admin") {
         navigate("/admin/dashboard");
       } else {
         navigate("/user/userdashboard");
       }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError( error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }; 
  

  return (
    <div>
      <AuthLayout>
        <div className='lg:w-[100%] h-auto md:h-full mt-20 md:mt-6 flex flex-col justify-center '>
          <h4 className='text-xl font-bold text-black '> 
            Create an Account
          </h4>
          <p className='text-xs text-slate-700 mt-1 mb-2'>
            Join us today by entering your detains below
          </p>
          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>    

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                  value={fullName}
                  onChange={({target}) => setFullName(target.value)}
                  label="Full Name"
                  placeholder="Enter your Full Name"
                  type="text"
              />
              <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder = "Enter your email address"
            type="text"
            />
          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder = "Min 8 Characters"
            type="password"
            />
            
          <Input
            value={adminInviteToken}
            onChange={({target}) => setAdminInviteToken(target.value)}
            label="Admin Invite Token"
            placeholder = "6 Digit Code"
            type="text"
            />
                  </div>
              {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

              <button type='submit' className='btn-primary'>SignUp</button>

              <p className='"text-[4px] text-slate-800 '>
                Already an account ?{" "}
                <Link className="font-medium text-primary underline" to="/login">
                LogIn
                </Link>
              </p>
       
            
          </form>
        </div>
      </AuthLayout>
    </div>
  )
}

export default SignUp;
