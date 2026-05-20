import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { FiLogIn } from "react-icons/fi";
import axios from "axios";

const initialState = { identifier: "", password: "" }

export default function Login() {
    const { dispatch } = useAuthContext();
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    const getRedirectPath = () => {
        const from =
            location.state?.from?.pathname ||
            location.state?.from ||
            sessionStorage.getItem('redirectPath') ||
            "/";

        console.log('Location state:', location.state);
        console.log('Session storage redirect:', sessionStorage.getItem('redirectPath'));
        console.log('Final redirect path:', from);
        return from;
    };

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleLogin = async e => {
        e.preventDefault()
        const { identifier, password } = state;

        if (!identifier || !password) {
            return setMessage("Please fill in all fields!");
        }

        setLoading(true)
        setMessage("")
        try {
            const res = await axios.post(`${import.meta.env.VITE_HOST}/auth/login`, { identifier, password })
            const { token, user, message } = res.data;
            setMessage(message);
            setState(initialState);
            localStorage.setItem("ecomplatjwt", token);
            dispatch({ type: "SET_LOGGED_IN", payload: { user } });

            const redirectPath = getRedirectPath();
            console.log('Navigating to:', redirectPath);

            sessionStorage.removeItem('redirectPath');

            navigate(redirectPath, { replace: true });
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full min-h-screen bg-gray-100 flex justify-center items-center p-2.5 sm:p-5'>
            <form
                className='w-full max-w-[500px] bg-white flex flex-col gap-4 p-6 rounded-xl shad'
                onSubmit={handleLogin}
            >
                <div>
                    <h1 className='text-[#333] text-2xl'>Welcome Back</h1>
                    <p className='text-gray-700'>Login to continue</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-700'>Username or Email</label>
                    <input
                        type="text"
                        name='identifier'
                        value={state.identifier}
                        placeholder="Enter username or email"
                        className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-gray-700'>Password</label>
                    <input
                        type="password"
                        name='password'
                        value={state.password}
                        placeholder="Enter password"
                        className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center items-center gap-2 bg-[var(--secondary)] text-white p-4 mt-3 text-sm font-semibold rounded-[8px] transition-all duration-150 ease-linear hover:bg-[var(--secondary)]/75"
                >
                    {loading ? "Please wait..." : <>Login <FiLogIn /></>}
                </button>

                {message && <p className="text-sm text-red-500">{message}</p>}

                <p className='text-[#333] mt-2'>Don't have an account? <Link to="/auth/signup" className='text-[var(--secondary)]'>Create account now</Link></p>
            </form>
        </div>
    )
}