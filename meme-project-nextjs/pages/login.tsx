import { useState } from "react";
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
        console.log(formData);
        api.callJson('member/login.php', formData, 'POST')
            .then(data => {
                console.log(data);
            });
    }

    return (
        <div className="ass1-login">
            <div className="ass1-login__logo">
            <a href="index.html" className="ass1-logo">Project Meme</a>
            </div>
            <div className="ass1-login__content">
            <p>Đăng nhập</p>
            <div className="ass1-login__form">
                <form action="#" onSubmit={handleSubmit}>
                <input 
                    value={formData.email}
                    onChange={handleOnChange('email')}
                    type="text" className="form-control" placeholder="Email" required />
                <input 
                    value={formData.password}
                    onChange={handleOnChange('password')}
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