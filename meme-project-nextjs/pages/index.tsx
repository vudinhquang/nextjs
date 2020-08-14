import React, { useEffect } from "react";
import { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next'

import { PostListItem } from "../components/PostListItem";
import { HomeSidebar } from "../components/HomeSidebar";


export type PostType = {
  PID: string;
  USERID: string;
  fullname: string;
  profilepicture: string;
  url_image: string;
  post_content: string;
  time_added: string;
  status: string;
  count: string | null;
}

type HomeDataProps = {
  listPosts: PostType[];
  userPosts: PostType[];
}

type HomeProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const Home: HomeProps = ({ listPosts, userPosts }) => {
  // useEffect(() => {
  //   console.log("listPosts", listPosts);
  //   console.log("userPosts", userPosts);
  // }, [])

  return (
    <div className="container">
      {/*sections*/}
      <div className="row">
        <div className="col-lg-8">
          <PostListItem listPosts={listPosts} />
        </div>
        <div className="col-lg-4">
          <HomeSidebar userPosts={userPosts} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeDataProps> = async (context) => {
  const props = {
    listPosts: [
      {
        "USERID": "192",
        "profilepicture": "",
        "fullname": "asS",
        "PID": "122",
        "url_image": "http://api-meme-zendvn-01.herokuapp.com/public/post/192/tải xuống.jpg",
        "post_content": "ffbdfb",
        "time_added": "2020-08-10 22:53:14",
        "status": "1",
        "count": null
      }
    ],
    userPosts: []
  }

  return {
    props 
  }
}

export default Home;
