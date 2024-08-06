import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader } from "react-bootstrap";
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
            <div className="auth-main v2" style={{width:"50%",height:"300px",margin:"auto"}}>
                <div className="auth-wrapper">
                    <div className="auth-form">
                        <Card className="my-5 mx-3">
                            <CardBody style={{boxShadow:"3px 2px 2px 2px rgba(0,0,0,0.4)",borderRadius:"20px"}}>
                                <h4 className="f-w-500 mb-1" style={{ paddingBottom:"100px" }}>İsim ve şifre ile giriş yapın</h4>
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3" style={{ marginBottom: "25px" }}>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="floatingInput" 
                                            placeholder="Kullanıcı ismi" 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)} 
                                        />
                                    </div>
                                    <div className="mb-3" style={{ marginBottom: "25px" }}>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="floatingInput1" 
                                            placeholder="şifre" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>
                                    <div className="d-flex mt-1 justify-content-between align-items-center" style={{ marginBottom: "25px" }}>
                                      
                                        
                                    </div>
                                    <div className="d-grid mt-4">
                                        <button type="submit" className="btn btn-primary" style={{width:"50%"}}>Login</button>
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
