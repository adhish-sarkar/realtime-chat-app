// import React from 'react'

import { useAppStore } from "@/store"

const Profile = () => {
  const { userInfo } = useAppStore();
  return (
    <>
    <div>Profile</div>
    <div>Email : {userInfo.email}</div>
    </>
  )
}

export default Profile