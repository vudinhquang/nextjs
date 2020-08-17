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

    const onChangeDetailForm = (key: string, value: any) => {
        // console.log(key, value);
        setPostData({
            ...postData,
            [key]: value
        })
    }

    return (
        <div className="container">
            {/*sections*/}
            <div className="row">
                <div className="col-lg-8">
                    <PostDetailForm 
                        url_image={postData.url_image}
                        post_content={postData.post_content}
                        obj_image={postData.obj_image}
                        onChangeDetailForm={onChangeDetailForm}
                    />
                </div>
                <div className="col-lg-4">
                    <PostDetailSidebar
                        category={postData.category}
                        onChangeDetailForm={onChangeDetailForm}
                    />
                </div>
            </div>
        </div>
    )
}