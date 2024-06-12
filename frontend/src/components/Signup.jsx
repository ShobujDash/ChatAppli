import React, { useState } from "react";
import axios from 'axios'
import { Link ,useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';


function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const handleCheckbox = (gender) => {
    setUser({...user,gender:gender})
  }

  const submitHandler =async (e)=> {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  }



  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-sm shadow-md bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-white">Signup</h1>
        <form action="" onSubmit={submitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              name="fullName"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                type="checkbox"
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                type="checkbox"
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
          </div>
          <div className="text-center flex gap-5">
            <p>Already have an account?</p>
            <Link className="text-red-500 underline" to="/login">
              Login
            </Link>
          </div>
          <div>
            <button type="submit" className="btn btn-block btn-sm mt-2 ">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
