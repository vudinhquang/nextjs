// import React, { useEffect, useState } from "react";
import React from "react";
import Link from 'next/link'

const BASE_URL = "http://api-meme-zendvn-01.herokuapp.com/api"

type PostType = {
    PID: string;
    post_content: string;
}

type PropsType = {
    posts: PostType[]
}

const DemoGetServerSideProps = ({ posts }) => {

    return (
        <div className="container">
            <h1>Demo GetServerSideProps </h1>
            <Link href="/playground/getServerSideProps/test">
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

// Khong lien quan gi toi NextJs -> La kien thuc cua ReactJs thuan
DemoGetServerSideProps.defaultProps = {
    posts: []
}

export const getServerSideProps = async (context) => {
    const response = await fetch(BASE_URL + '/post/getListPagination.php?pagesize=5&currPage=1');
    const data = await response.json();

    const props = {
        posts: data.posts
    }
    return {
        props
    }
}

export default DemoGetServerSideProps;