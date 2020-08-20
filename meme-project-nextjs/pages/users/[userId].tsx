import { NextPage, NextPageContext } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { UserDetailInfo } from "../../components/UserDetailInfo";
import { UserDetailPosts } from "../../components/UserDetailPosts";
import { PostType } from "..";
import { TypeUser } from "../../state";
import { getTokenSSRAndCSS } from "../../helpers";
import userService from "../../services/userService";
import postService from "../../services/postService";
import { useAuthen } from "../../helpers/useAuthen";


type PropsType = {
    userDetailInfo: TypeUser;
    userDetailPosts: PostType[];
}

const UserDetail: NextPage<PropsType> = ({ userDetailInfo, userDetailPosts }) => {
    useAuthen();
    const router = useRouter();
    useEffect(() => {
        if(!userDetailInfo) {
            alert("User khong ton tai");
            router.push('/');
        }
    }, [userDetailInfo])

    return (
        <div className="container">
            <UserDetailInfo 
                postCount={userDetailPosts.length}
                userDetailInfo={userDetailInfo} 
            />

            <UserDetailPosts 
                userDetailPosts={userDetailPosts} 
                userDetailInfo={userDetailInfo} 
            />
        </div>
    )
}

UserDetail.getInitialProps = async (ctx: NextPageContext) => {
    const userid = ctx.query.userId as string;
    const [token] = getTokenSSRAndCSS(ctx);

    const userPos = userService.getUserById(userid);
    const postPos = postService.getPostsByUserId({ token, userid });

    const [userRes, postRes] = await Promise.all([userPos, postPos]);

    return {
        userDetailInfo: userRes.user || null,
        userDetailPosts: postRes?.posts || [],
    }
}

export default UserDetail