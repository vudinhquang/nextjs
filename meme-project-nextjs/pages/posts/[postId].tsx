import { GetServerSideProps, NextPageContext, InferGetServerSidePropsType } from "next";

import { HomeSidebar } from "../../components/HomeSidebar";
import { PostDetailContent } from "../../components/PostDetailContent";
import { getTokenSSRAndCSS } from "../../helpers";
import postService from "../../services/postService";
import { PostType } from "..";

export type TypeCategory = {
    TAG_ID: string,
    PID: string,
    tag_index: string,
    tag_value: string,
}

type PostDetailDataProps = {
    post: PostType;
    postCategories: TypeCategory[];
    userPosts: PostType[];
}

type PostDetailProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const PostDetail: PostDetailProps = ({ userPosts, post, postCategories }) => {
    return (
        <div className="container">
            {/*sections*/}
            <div className="row">
                <div className="col-lg-8">
                   <PostDetailContent />
                </div>
                <div className="col-lg-4">
                    <HomeSidebar userPosts={userPosts} />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<PostDetailDataProps> = async (context) => {
    const ctx = context as NextPageContext;
    const [token, userToken] = getTokenSSRAndCSS(ctx);
    const userid = userToken?.id;
    const postid = ctx.query.postId;
  
    const postDetailPos = postService.getPostsByPostId({ postid, token })
    const userPostsPos = postService.getPostsByUserId({ token, userid });
  
    const [ postDetail, userPostsRes ] = await Promise.all([ postDetailPos, userPostsPos]);
  
    const props = {
        post: postDetail?.data?.post || null,
        postCategories: postDetail?.data?.categories || [],
        userPosts: userPostsRes?.posts || [],
    }
  
    return {
      props 
    }
}

export default PostDetail