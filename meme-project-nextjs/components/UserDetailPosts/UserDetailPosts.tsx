import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { PostType } from "../../pages";
import { PostItem } from "../PostItem";
import { useGlobalState, TypeUser } from "../../state";

type PropsType = {
    userDetailPosts: PostType[];
    userDetailInfo: TypeUser;
}

const UserDetailPosts: React.FC<PropsType> = ({ userDetailPosts, userDetailInfo }) => {
    const [currentUser] = useGlobalState("currentUser");
    const checkIsOwner = currentUser?.USERID === userDetailInfo.USERID;

    return (
        <Masonry columnsCount={2} className="ass1-section__wrap row ass1-section__isotope-init">
            {
                userDetailPosts.map(post => (
                    <PostItem
                        key={post.PID} 
                        post={post} 
                        isOwner={checkIsOwner}
                        customClass="col-lg-6"
                    />
                ))
            }
        </Masonry>
    )
}

export default UserDetailPosts;