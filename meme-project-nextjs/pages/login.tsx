import { useState } from "react";
import { useRouter } from 'next/router'
import fetch from "isomorphic-fetch";
// import Cookies from "js-cookie";

import api from "../services/api";

interface FormLogin {
    email: string;
    password: string;
}

const initFormData = {
    email: '',
    password: ''
}

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormLogin>(initFormData);

    const handleOnChange = (key: string) => (evt: any) => {
        const value = evt.target.value;
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        /*
        api.callJson('member/login.php', { data: formData, method: 'POST' })
            .then(data => {
                console.log(data);
            });
        */

        const body = JSON.stringify(formData);
        const method = "POST";

        fetch('/api/login', {
                body,
                method,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log("data = ", data);
                // Cookies.set("token", data.token, { expires: 30 });
                // router.push('/');
        })
    }

    return (
        <div className="ass1-login">
            <div className="ass1-login__logo">
            <a href="index.html" className="ass1-logo">Project Meme</a>
            </div>
            <div className="ass1-login__content">
            <p>Đăng nhập</p>
            <div className="ass1-login__form">
                {/* <form action="#" onSubmit={handleSubmit}> */}
                <form action="/api/login" method="POST">
                <input 
                    // value={formData.email}
                    // onChange={handleOnChange('email')}
                    name="email"
                    type="text" className="form-control" placeholder="Email" required />
                <input 
                    // value={formData.password}
                    // onChange={handleOnChange('password')}
                    name="password"
                    type="password" className="form-control" placeholder="Mật khẩu" required />
                <div className="ass1-login__send">
                    <a href="/register">Đăng ký một tài khoản</a>
                    <button type="submit" className="ass1-btn">Đăng nhập</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    )
}