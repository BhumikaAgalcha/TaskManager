import React from 'react'
import loginImage from '../../assets/images/loginimage.jfif'

const AuthLayout = ({children}) => {
  return (
   <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-3xl font-bold text-center'>Welcome to Team Track</h2>
        <p className='text-center text-gray-500'>Tash Manager</p>
          {children}
        </div>

        <div >
            <img src={loginImage} alt="" className='w-[450px] h-[548px] ml-10.5 mt-0.5 ' />
        </div>
    </div>
  )
}

export default AuthLayout
