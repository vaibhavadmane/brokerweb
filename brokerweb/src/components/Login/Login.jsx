

import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  // New state to store error message
    const [emailLog, setEmailLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    const navigate = useNavigate();
    let user = document.getElementById("username");
    let emails = document.getElementById("email");
    let full = document.getElementById("fullname");
    let file = document.getElementById("file");
    let pass = document.getElementById("pass");

    const submit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('fullname', fullname);
            formData.append('avatar', avatar);
            formData.append('password', password);

            user.value = "";
            emails.value = "";
            full.value = "";
            file.value = "";
            pass.value = "";

            const response = await axios.post("http://localhost:8000/api/v1/users/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            console.log(response.data.message);

        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Assuming 409 is the status code for "User already exists"
                setErrorMessage("User already exists. Please choose another username or email.");
            } else {
                setErrorMessage('An error occurred during registration. Please try again.');
            }
            console.error('Error during registration:', error);
        }
        navigate('/'); 
    };


    const submit1 = async (e) => {
      e.preventDefault();  // Prevent the default form submission behavior

      // Reset error state
      setError('');
       const email=emailLog;
       const password=passwordLog;
       console.log(email);
       console.log(password);
       
       
      try {
          const response2 = await axios.post("http://localhost:8000/api/v1/users/login", {
              email, 
              password
          }, {
              headers: {
                  'Content-Type': 'application/json',  // This is more appropriate than multipart/form-data
              },
          });
          console.log(response2);
          
          const userdata=response2.data.data.user
          //  dispatch(incrementByAmount(userdata))
          console.log("Login successful:", userdata);

          // Reset form after successful submission
          setEmailLog('');
          setPasswordLog('');
          navigate('/'); 
          
      } catch (error) {
        if (error.response) {
            console.error('Backend returned an error:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error during request setup:', error.message);
        }
        setError('Login failed. Please check your credentials and try again.');
    }
    
  };




  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center">
          <button
            onClick={() => setIsSignUp(false)}
            className={`px-4 py-2 rounded-l-lg ${!isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`px-4 py-2 rounded-r-lg ${isSignUp ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Sign Up
          </button>
        </div>

        {isSignUp ? (
          <form className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
            <input
              type="text"
                    id="username"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
                    id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
             <input
              type="fullname"
               id="fullname"
              placeholder="Fullname"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="file"
               id="file"
              placeholder="avatar"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <input
              type="password"
                id="pass"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
              onClick={submit}
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Sign In</h2>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmailLog(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              id="pass"
              onChange={(e) => setPasswordLog(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={submit1}
            >
              Sign In
            </button>
          </form>
        )}

        <p className="text-center text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={toggleForm} className="text-blue-500 hover:underline">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login