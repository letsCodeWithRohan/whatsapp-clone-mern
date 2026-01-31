import { FaWhatsapp } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import axios from 'axios'
import React from "react";

function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", formData,{
                withCredentials: true
            });
            // const response = await axios.get("http://127.0.0.1:5000/api/status")
            toast.success(response?.data?.message)
            setFormData({
                email: '',
                password: ''
            })
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className='bg-base-300 flex items-center justify-center overflow-hidden h-[100dvh] w-full'>
            <div className="bg-base-100 flex w-3/5 h-9/10 rounded-lg p-2">
                <div className="md:w-1/2 hidden relative h-full rounded-lg bg-[url('https://images.unsplash.com/photo-1750096319146-6310519b5af2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D')] bg-cover bg-center rounded-l-md md:flex flex-col justify-between">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
                    <div className='flex items-center p-5 gap-2 z-30'>
                        <FaWhatsapp className="text-green-500 text-xl" />
                        <h1 className='text-sm font-semibold'>Whatsapp Clone</h1>
                    </div>
                    <div className="p-5 z-30 flex flex-col gap-3">
                        <h1 className="text-3xl">Simple, secure<br />& reliable</h1>
                        <p className="text-xs mb-3 text-emerald-200">Nobody can see or read your chats, not even Whatsapp Clone.</p>
                    </div>
                </div>
                <div className="md:w-1/2 w-full flex items-center justify-center h-full">
                    <div className="flex-col gap-3 flex w-4/5">
                        <h1 className="text-2xl font-semibold">Welcome Back 👋</h1>
                        <p className="text-gray-500 text-sm">Log in to your existing account to chat.</p>
                        <div className="flex flex-col -gap-1">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Email address</legend>
                                <input
                                    value={formData.email}
                                    onChange={handleInput}
                                    type="email"
                                    name="email"
                                    className="input w-full"
                                    placeholder="Enter your email here" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Password</legend>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInput}
                                    name="password"
                                    className="input w-full"
                                    placeholder="Enter your password here" />
                            </fieldset>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked className="checkbox checkbox-success checkbox-sm" />
                            <span className="text-xs">I agree to the <span className="underline">
                                Terms & Privacy
                            </span>
                            </span>
                        </div>
                        <button onClick={handleSubmit} className="btn hover:bg-emerald-500 bg-emerald-600">Login</button>
                        <p className="text-center text-sm">
                            <span className="text-gray-500 me-1">
                                Don't have an account?
                            </span>
                            <Link className="text-blue-600 underline" to="/signup">signup</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
