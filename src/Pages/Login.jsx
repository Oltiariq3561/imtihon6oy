import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const checkEmailValidity = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    function validate() {
        if (emailRef.current.value.length < 3) {
            alert("Username is not valid!");
            emailRef.current.focus();
            passwordRef.current.style.outlineColor = 'red';
            return false;
        }
    }

    function validateInputs() {
        if (!checkEmailValidity(emailRef.current.value)) {
            alert("Email is not valid");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        return true;
    }

    function handleLogin(event) {
        event.preventDefault();

        const isValid = validateInputs();
        if (!isValid) {
            return;
        }

        const userCredentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setIsLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/login`, userCredentials, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.data.user.id) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));   
                    navigate("/");
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                }
            })
            .catch(err => {
                console.log(err.response);      
            })
    }
    function register(event) {
        navigate('/register');
    }

    return (
        <div className='border rounded-md mx-auto border-gray-800 shadow-lg w-1/2 mt-24 bg-white'>
            <h2 className='text-center text-black text-6xl mb-5 font-extrabold py-5'>Login</h2>
            <form className='flex flex-col items-center py-5'>
                <input ref={emailRef} className='p-3 mb-3 border rounded-md w-1/2 border-gray-400 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black'  type="email"  placeholder='Enter your email...' />
                <input ref={passwordRef} className='p-3 mb-3 border rounded-md w-1/2 border-gray-400 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black' type="password" placeholder='Enter your password...'/>
                <button disabled={isLoading} onClick={handleLogin} className='bg-black text-white w-1/2 p-2 rounded-md hover:bg-gray-800 transition duration-300'>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                <button onClick={register} className='mx-auto mt-2 text-black hover:text-gray-600'>Akkaunt yoqmi</button>
            </form>
        </div>
    );
}

export default UserLogin;
