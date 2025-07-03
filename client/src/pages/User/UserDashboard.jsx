import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';


const UserDashboard = () => {
  useUserAuth();
  return (
    <DashboardLayout></DashboardLayout>
  )
}

export default UserDashboard
