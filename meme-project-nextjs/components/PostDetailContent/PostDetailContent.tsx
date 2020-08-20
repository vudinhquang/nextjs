import { useState } from "react";
import { useRouter } from "next/router";

import "./PostDetailContent.css";
import { PostCommentForm } from "../PostCommentForm"
import { PostCommentList } from "../PostCommentList"
import { PostItem } from "../PostItem";
import Link from "next/link";
import { PostType } from "../../pages";
import { TypeCategory, TypeComment } from "../../pages/posts/[postId]";
import postService from "../../services/postService";
import { useGlobalState } from "../../state";

type PropsType = {
    listComments: TypeComment[];
    postDetailData: PostType;
    postCategories: TypeCategory[];
}

const PostDetailContent: React.FC<PropsType> = ({
    postDetailData,
    postCategories,
    listComments: initListComments
}) => {
    const router = useRouter();
    const postId = router.query.postId as string;
    const [token] = useGlobalState("token");
    const [listComments, setListComments] = useState(initListComments);

    const handleSubmitForm = async (commentValue: string, callback: (e?: Error) => void) => {
        try {
            const result = await postService.postComment(postId, commentValue, token);
            if(result.status !== 200) throw new Error("Dang binh luan khong thanh cong!");

            const listCmtRes = await postService.getCommentByPostId(postId);

            if(result.status === 200) {
                setListComments(listCmtRes.comments);
                callback();
            }

        } catch(e) {
            // Khi throw new Error chay vao trong catch
            callback(e);
        }

        /*
        postService
            .postComment(postId, commentValue, token)
            .then(async (res) => {
                if(res.status === 200) {
                    const commentsPos = await postService.getCommentByPostId(postId);
                } else {
                    // Bao Loi
                    alert("Dang comment khong thanh cong");
                }
            })
        */
    }
    
    return (
    <div className="ass1-section__list">

        <PostItem post={postDetailData} />

        <div className="list-categories">
            <h5><strong>Danh mục: </strong></h5> 
            <ul>
                
                {
                    postCategories.map(obj => {
                        return (
                        <li key={obj.TAG_ID}>
                            <Link href="/categories/[cateId]" as={`/categories/${obj.tag_index}`}>
                                <a>{obj.tag_value}</a>
                            </Link>
                        </li>
                        )
                    })
                }
                
            </ul>
        </div>

        <PostCommentForm handleSubmitForm={handleSubmitForm} />

        <PostCommentList listComments={listComments} />
    </div>
    );
};

export default PostDetailContent;
