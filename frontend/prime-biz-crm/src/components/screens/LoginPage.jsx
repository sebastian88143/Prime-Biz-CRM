import React, { useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const LoginPage = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/login/", { username, password });
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
        } catch (err) {
            setError("Błędne dane logowania");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-3/4">
                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <div className="w-48 h-20 bg-gray-300 flex items-center justify-center rounded-lg text-gray-700 font-semibold">
                        LOGO PRIMEBIZ CRM
                    </div>
                </div>

                {/* Nagłówek */}
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {/* Komunikat o błędzie */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Formularz */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-center mt-4 text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;