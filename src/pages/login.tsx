import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import '../styles/login.css'; 

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Hata mesajı için state
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            // Hata mesajını state'e set et
            setError('Girilen kullanıcı bulunamadı');
        }
    };

    return (
        <div className="cover">
            <div className="login-container">
                <div className="circle circle-one"></div>
                <div className="form-container">
                    <img
                        src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                        alt="illustration"
                        className="illustration"
                    />
                    <h1 className="opacity">GİRİŞ YAP</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="KULLANICI İSMİ"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="ŞİFRE"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="opacity">GİRİŞ</button>
                        {error && <p className="error-message">{error}</p>} {/* Hata mesajını render et */}
                    </form>
                </div>
                <div className="circle circle-two"></div>
                <div className="theme-btn-container"></div>
            </div>
        </div>
    );
};

export default LoginPage;
