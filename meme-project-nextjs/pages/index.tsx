import { PostListItem } from "../components/PostListItem";
import { HomeSidebar } from "../components/HomeSidebar";

export default function Home() {
  return (
    <div className="container">
      {/*sections*/}
      <div className="row">
        <div className="col-lg-8">
          <PostListItem />
        </div>
        <div className="col-lg-4">
          <HomeSidebar />
        </div>
      </div>
    </div>
  )
}
