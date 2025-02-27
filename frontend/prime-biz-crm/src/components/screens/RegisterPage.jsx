import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setSuccessMessage("");

        try {
            const res = await axios.post("http://localhost:8000/api/register/", { username, email, password });
            setSuccessMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setPassword("");
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-3/4">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
                        Sign Up
                    </button>
                </form>

                {successMessage && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;