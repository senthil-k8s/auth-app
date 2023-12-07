
import React from 'react'

const ProfilePage = ({params}:any) => {

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p className='text-4xl'>Profile Page
            <span className='p-2 ml-2 bg-orange-300'>{params.id}</span>
        </p>

    </div>
  )
}

export default ProfilePage