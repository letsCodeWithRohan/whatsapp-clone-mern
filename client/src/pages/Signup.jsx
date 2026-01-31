import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdOutlineEmail } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        username: '',
        gender: 'male',
        fullname: ''
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiBaseUrl = "http://localhost:3000";
            const response = await axios.post(`${apiBaseUrl}/api/auth/signup`, formData, {
                withCredentials: true
            });
            // const response = await axios.get("http://127.0.0.1:5000/api/status")
            toast.success(response?.data?.message)
            setFormData({
                email: '',
                password: '',
                username: '',
                gender: 'male',
                fullname: ''
            })
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className='bg-base-300 flex items-center justify-center overflow-hidden h-[100dvh] w-full'>
            <div className="bg-base-100 flex w-3/5 h-9/10 rounded-lg p-2">
                <div className="w-1/2 relative h-full rounded-lg bg-[url('https://images.unsplash.com/photo-1750096319146-6310519b5af2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D')] bg-cover bg-center rounded-l-md flex flex-col justify-between">
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
                <div className="w-1/2 flex items-center justify-center h-full">
                    <form onSubmit={handleSubmit} className="flex-col gap-3 flex w-4/5">
                        <h1 className="text-2xl font-semibold">Get Started 🔰</h1>
                        <p className="text-gray-500 text-sm">Create a fresh account to chat.</p>
                        <label className="input">
                            <FaRegCircleUser className="text-lg opacity-50" />
                            <input type="text" required placeholder="Fullname" value={formData.fullname} onChange={handleInput} name="fullname" />
                        </label>
                        <label className="input">
                            <MdOutlineAlternateEmail className="text-lg opacity-50" />
                            <input type="text" required placeholder="Username" value={formData.username} onChange={handleInput} name="username" />
                        </label>
                        <label className="input">
                            <MdOutlineEmail className="text-lg opacity-50" />
                            <input type="email" required placeholder="Email address" value={formData.email} onChange={handleInput} name="email" />
                        </label>
                        <label className="input">
                            <IoKeyOutline className="text-lg opacity-50" />
                            <input type="password" required placeholder="Password" value={formData.password} onChange={handleInput} name="password" />
                        </label>
                        <div className="flex p-2.5 justify-evenly border-1 border-gray-500 rounded-md items-center gap-2">
                            <div className="border-r-1 border-gray-500 pe-2 text-sm text-gray-400">Gender</div>
                            <div className="flex-1 flex items-center justify-evenly">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleInput}
                                        className="radio radio-success radio-xs"
                                    />
                                    <span className="text-sm text-gray-400">Male</span>
                                </div>
                                <div className="w-2 h-full bg-gray-600"></div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        className="radio radio-success radio-xs"
                                        checked={formData.gender === 'female'}
                                        onChange={handleInput}
                                    />
                                    <span className="text-sm text-gray-400">Female</span>
                                </div>
                                <div className="w-1 h-full bg-gray-600"></div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="other"
                                        className="radio radio-success radio-xs"
                                        checked={formData.gender === 'other'}
                                        onChange={handleInput}
                                    />
                                    <span className="text-sm text-gray-400">Other</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" checked className="checkbox checkbox-success checkbox-sm" />
                            <span className="text-xs">I agree to the <span className="underline">
                                Terms & Privacy
                            </span>
                            </span>
                        </div>
                        <button className="btn hover:bg-emerald-500 bg-emerald-600">Get Started</button>
                        <p className="text-center text-sm">
                            <span className="text-gray-500 text-sm me-1">
                                Already have an account?
                            </span>
                            <Link className="text-blue-600 underline" to="/login">login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup