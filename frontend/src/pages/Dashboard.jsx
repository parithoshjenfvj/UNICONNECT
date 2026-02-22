import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [user,setuser]=useState(null);
    useEffect(()=>{
        fetch("http://localhost:3000/user/dashboard",{
            method:"GET",
            credentials:"include"
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setuser(data.user)
        })
        .catch(err=>{
            console.log(err);
        });
    },[]);
  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <h3>Welcome {user.fullName}</h3>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Dashboard
