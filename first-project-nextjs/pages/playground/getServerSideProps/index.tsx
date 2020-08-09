// import React, { useEffect, useState } from "react";
import React from "react";
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { InferGetServerSidePropsType } from 'next'

const BASE_URL = "http://api-meme-zendvn-01.herokuapp.com/api"

type PostType = {
    PID: string;
    post_content: string;
}

type PropsType = {
    posts: PostType[]
}

type PagePropsType = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>

// const DemoGetServerSideProps = ({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
const DemoGetServerSideProps: PagePropsType = ({ posts }: PropsType) => {

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

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    const response = await fetch(BASE_URL + '/post/getListPagination.php?pagesize=5&currPage=1');
    const data = await response.json();

    const posts: PostType[] = data.posts;

    /*
    return {
        props: {
            posts
        }
    }
    */
    const props = {
        posts: data.posts
    }

    return {
        props
    }
}

export default DemoGetServerSideProps;