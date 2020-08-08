// import React, { useEffect, useState } from "react";
import React from "react";
import Link from 'next/link'
import { NextPage } from 'next'

const BASE_URL = "http://api-meme-zendvn-01.herokuapp.com/api"

type PostType = {
    PID: string;
    post_content: string;
}

type PropsType = {
    posts: PostType[]
}


const DemoGetIntialProps = ({ posts }) => {

    /*
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(BASE_URL + '/post/getListPagination.php?pagesize=5&currPage=1')
        .then(async (response) => {
            const data = await response.json();
            setPosts(data.posts);
            console.log(data.posts);
        }) 
    }, []);
    */

    return (
        <div className="container">
            <h1>Demo GetIntialProps</h1>
            <Link href="/playground/getInitialProps/test">
                <a>Di chuyen qua trang Test</a>
            </Link>
            <ul>
                {
                    posts.map((post) => {
                        return <li key={post.PID}>{post.post_content}</li>
                    })
                }
            </ul>
        </div>
    )
}

DemoGetIntialProps.getInitialProps = async ({ req }) => {
    const response = await fetch(BASE_URL + '/post/getListPagination.php?pagesize=5&currPage=1');
    const data = await response.json();

    return {
        posts: data.posts
    }
}

export default DemoGetIntialProps;