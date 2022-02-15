import React, { useRef } from 'react';
import './Login.css';
import { useAuth } from '../../Auth/AuthContext.js';
import decode from 'jwt-decode';

const Login = (props) => {
    const { setUser } = useAuth();
    const toggle = () => props.history.push('/register');
    const redirect = () => props.history.push('/library/books');
    const username = useRef();
    const password = useRef();

    const loginValidation = (e) => {
        e.preventDefault()

        const userTemplate = {
            username: username.current.value,
            password: password.current.value
        };

        return fetch(`http://localhost:4000/session`, {
            method: 'POST',
            body: JSON.stringify(userTemplate),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res[0] || res.message) {
                    throw new Error(res[0] || res.message);
                }
                localStorage.setItem('token', res.token);
                const user = decode(res.token);
                console.log(user);
                setUser(user);
                redirect();
            })
            .catch((err) => {
                alert(err)
            });
    }

    return (
        <div className="login">
            <h3>Login</h3>
            <form className="login">
                <input type="text" placeholder="Username" ref={username} />
                <input type="password" placeholder="Password" ref={password} />
                <div className="action">
                    <button className="log-action" onClick={loginValidation}>Login</button>
                    <p className="registration-action" onClick={toggle}>Register instead</p>
                </div>
            </form>
        </div>
    );
}

export default Login;