import React, { useRef } from 'react';
import './Register.css';

const Register = ({ history }) => {
    const toggle = () => history.push('/session');
    const username = useRef();
    const email = useRef();
    const password = useRef();

    const registerValidation = (e) => {
        e.preventDefault();
        const userData = {
            username: username.current.value,
            password: password.current.value
        }

        fetch(`http://localhost:4000/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(res => {
                if(res[0]) {
                    throw new Error(res[0]);
                }
                if (res.message === 'Duplicate record') {
                    throw new Error(res.message);
                }
                alert(res.message);
                toggle();
            })
            .catch(err => alert(err[0] || err.message));
    };

    return (
        <div className="register">
            <h3>Register</h3>
            <form className="register">
                <input type="text" placeholder="Username" ref={username} />
                <input type="email" placeholder="Email" ref={email} />
                <input type="password" placeholder="Password" ref={password} />
                <div className="action">
                    <button className="reg-action" onClick={(e) => registerValidation(e)}>Register</button>
                    <p className="login-action" onClick={toggle}>Login instead</p>
                </div>
            </form>
        </div>
    );
}

export default Register;