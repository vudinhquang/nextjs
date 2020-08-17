import { useState } from "react";

import { PostDetailForm } from "../../components/PostDetailForm";
import { PostDetailSidebar } from "../../components/PostDetailSidebar";
import { useAuthen } from "../../helpers/useAuthen";

const initState = {
    url_image: '',
    post_content: '',
    category: [],
    obj_image: {
        file: null,
        base64: '',
    }
}

export default function PostCreate() {
    useAuthen();
    const [postData, setPostData] = useState(initState);
    return (
        <div className="container">
            {/*sections*/}
            <div className="row">
                <div className="col-lg-8">
                    <PostDetailForm />
                </div>
                <div className="col-lg-4">
                    <PostDetailSidebar
                        category={postData.category}
                    />
                </div>
            </div>
        </div>
    )
}