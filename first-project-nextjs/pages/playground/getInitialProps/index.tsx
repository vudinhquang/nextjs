import React, { useEffect, useState } from "react";

const BASE_URL = "http://api-meme-zendvn-01.herokuapp.com/api"

const DemoGetIntialProps = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(BASE_URL + '/post/getListPagination.php?pagesize=5&currPage=1')
        .then(async (response) => {
            const data = await response.json();
            setPosts(data.posts);
            console.log(data.posts);
        }) 
    }, []);

    return (
        <div className="container">
            <h1>Demo GetIntialProps</h1>
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

export default DemoGetIntialProps;