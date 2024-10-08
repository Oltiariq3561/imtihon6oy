import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const usernameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const ageRef = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const validate = () => {
        if (usernameRef.current.value.length < 3) {
            alert("User is not valid");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = "red";
            return false;
        }
        if (ageRef.current.value < 12) {
            alert("Age is not valid");
            ageRef.current.focus();
            ageRef.current.style.outlineColor = "red";
            return false;
        }
        if (surnameRef.current.value.length < 3) {
            alert("Surname is not valid");
            surnameRef.current.focus();
            surnameRef.current.style.outlineColor = "red";
            return false;
        }
        if (!validateEmail(emailRef.current.value)) {
            alert("Email is not valid");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        if (passwordRef.current.value !== rePasswordRef.current.value) {
            alert("Passwords do not match!");
            return false;
        }

        return true;
    };

    const handRegister = (event) => {
        event.preventDefault();

        const isValid = validate();
        if (!isValid) {
            return;
        }
        

        const registerUser = {
            age: ageRef.current.value,
            email: emailRef.current.value,
            firstName: usernameRef.current.value,
            lastName: surnameRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: rePasswordRef.current.value
        };
        setLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/register`, registerUser, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => {
                if (data.data.message === "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi") {
                    navigate("/login");
                    ageRef.current.value = '';
                    usernameRef.current.value = '';
                    surnameRef.current.value = '';
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                    rePasswordRef.current.value = '';
                }
            })
            .catch(err => { console.log(err); })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='bg-gray-100 border rounded-lg mx-auto border-gray-300 shadow-md w-1/3 mt-24 p-6'>
            <h2 className='text-center text-black text-4xl mb-6 font-bold'>Register</h2>
            <form className='flex flex-col'>
                <input ref={usernameRef} className='p-3 mb-4 border rounded-lg w-full border-gray-400 focus:outline-none focus:ring-2 focus:ring-black' type="text" placeholder='Enter name...' />
                <input ref={surnameRef} className='p-3 mb-4 border rounded-lg w-full border-gray-400 focus:outline-none focus:ring-2 focus:ring-black' type="text" placeholder='Enter surname...' />
                <input ref={emailRef} className='p-3 mb-4 border rounded-lg w-full border-gray-400 focus:outline-none focus:ring-2 focus:ring-black' type="email" placeholder='Enter email...' />
                <input ref={passwordRef} className='p-3 mb-4 border rounded-lg w-full border-gray-400 focus:outline-none focus:ring-2 focus:ring-black' type="password" placeholder='Create password...' />
                <input ref={rePasswordRef} className='p-3 mb-4 border rounded-lg w-full border-gray-400 focus:outline-none focus:ring-2 focus:ring-black' type="password" placeholder='Confirm password...' />
                <input ref={ageRef} className='p-3 mb-4 border rounded-lg w-full border-gray-400 focus:outline-none focus:ring-2 focus:ring-black' type="number" placeholder='Enter age...' />
                <button disabled={loading} onClick={handRegister} className='bg-black text-white w-full p-3 rounded-lg hover:bg-gray-800 transition duration-200'>{loading ? "Registering" : "Register"}</button>
                <Link className='text-center mt-4 text-black hover:text-gray-600' to="/login">Akkaunt bormi? Login</Link>
            </form>
        </div>
    );
}

export default Register;
