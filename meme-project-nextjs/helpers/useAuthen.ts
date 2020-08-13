import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

import { parseJwt } from ".";

// Bat buoc dang nhap moi vao duoc
// Create Post
function useAuthen() {
    const token = Cookies.get("token");
    const router = useRouter();
    
    useEffect(() => {
        const userToken = parseJwt(token);
        if(!(userToken && userToken.id && userToken.email)) {
            router.push('/login');
        } 
    }, [token])
}

// Chua dang nhap moi cho phep vao
// Da dang nhap roi -> Day qua homepage
function useNotAuthen() {
    const token = Cookies.get("token");
    const router = useRouter();
    
    useEffect(() => {
        const userToken = parseJwt(token);
        if(userToken && userToken.id && userToken.email) {
            router.push('/');
        } 
    }, [token])
}

export {
    useAuthen,
    useNotAuthen
}