import { NextPageContext } from 'next';
import cookie from "cookie";
import Cookies from "js-cookie";
import atob from "atob";

type UserToken = {
    id: string;
    email: string;
}

export const parseJwt = (token: string) => {
    try {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch(e) {
        return null;
    }
}

export const getTokenSSRAndCSS = (ctx?: NextPageContext): [string, UserToken | null] => {
    let token = '';
    let userToken = null;

    if(typeof window === "undefined") {
        // SSR
        const cookieStr = ctx?.req?.headers?.cookie || '';
        token = cookie.parse(cookieStr).token;
        userToken = parseJwt(token);
    } else {
        // CSR
        token = Cookies.get('token') || '';
    }

    return [token, userToken];
}

export const validateEmail = (email :string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const handleError = (key: string, value: string, password?: string): string => {
    let error = '';
    if(value.trim().length === 0) {
        return "Trường này là bắt buộc.";
    }
    switch (key) {
        case "email":
            if(!validateEmail(value)) error = 'Email không hợp lệ';
            else error = '';
            break;
        case "password":
            if(value.length < 6) error = 'Mật khẩu quá ngắn';
            else error = '';
            break;
        case "repassword":
            if(value !== password) error = "Mật khẩu nhập lại không khớp";
            else error = '';
            break;
    }

    return error;
}