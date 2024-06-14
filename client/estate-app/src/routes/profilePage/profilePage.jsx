import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import "./profilePage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    currentUser && (
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
                <img src={currentUser?.avatar || "/noavatar.jpg"} alt="" />
              </span>
              <span>
                Username: <b>{currentUser?.username}</b>
              </span>
              <span>
                Email: <b>{currentUser?.email}</b>
              </span>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <div className="title">
              <h1>My List</h1>
              <Link to="/add">
                <button>Create New Post</button>
              </Link>
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
            <Chat />
          </div>
        </div>
      </div>
    )
  );
};

export default ProfilePage;
