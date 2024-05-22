import { userData } from "../../lib/dummydata.js";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import "./profilePage.scss";

const profilePage = () => {
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={userData.img} alt="" />
            </span>
            <span>
              Username: <b>{userData.name}</b>
            </span>
            <span>
              Email: <b>{userData.email}</b>
            </span>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Save List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
};

export default profilePage;
