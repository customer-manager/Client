import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e:any) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <React.Fragment>
            <div className="auth-main v2" style={{width:"50%",margin:"auto",height:"100vh"}}>
                <div className="auth-wrapper">
                    <div className="auth-form">
                        <Card className="my-5 mx-3">
                            <CardBody>
                                <form onSubmit={handleLogin}>
                                    <h4 className="f-w-500 mb-1" style={{ marginBottom: "25px" }}>İsim ve şifre ile giriş yapın</h4>
                                    <div className="mb-3" style={{ marginBottom: "25px" }}>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="floatingInput" 
                                            placeholder="Username" 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)} 
                                        />
                                    </div>
                                    <div className="mb-3" style={{ marginBottom: "25px" }}>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="floatingInput1" 
                                            placeholder="Password" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>
                                    <div className="d-flex mt-1 justify-content-between align-items-center" style={{ marginBottom: "25px" }}>
                                      
                                        
                                    </div>
                                    <div className="d-grid mt-4">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LoginPage;
