import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Post from "../components/Post/Post";
import {
  getPosts,
  addPost,
  updatePost,
  deletePost,
} from "../actions/post/postAction";
import { useDispatch, useSelector } from "react-redux";
import AddPost from "../components/Post/AddPost";
import { v4 as uuidv4 } from "uuid";
import UpdatePostDialog from "../components/Post/UpdatePostDialog";

function PostPage() {
  // const { posts, addedPost, updatedPost, deletedPost } = props;
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.getPosts);
  const [state, setState] = useState({
    text: "",
  });
  const [openDialog, setOpenDialog] = useState({
    open: false,
    post: {},
  });

  const handleCloseDialog = () => {
    setOpenDialog({
      ...openDialog,
      open: false,
    });
  };

  const handleOpenDialog = (post) => {
    setOpenDialog({
      open: true,
      post,
    });
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  const handleAddPost = () => {
    const _id = uuidv4();
    const post = {
      id: _id,
      text: state.text,
    };
    dispatch(addPost(post));
    cleanState();
  };

  const handleSavePost = async () => {
    try {
      await dispatch(updatePost(openDialog.post));
      await handleCloseDialog();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleOpenDialogPostChange = (value) => {
    setOpenDialog({
      ...openDialog,
      post: {
        ...openDialog.post,
        text: value,
      },
    });
  };

  const cleanState = () => {
    setState({
      text: "",
    });
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item xs={12}>
        <AddPost
          state={state}
          handleAddPost={handleAddPost}
          handleStateChange={setState}
        />
        {posts &&
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              handleOpen={handleOpenDialog}
              handleDelete={handleDeletePost}
            />
          ))}
      </Grid>
      <UpdatePostDialog
        openDialog={openDialog}
        handleClose={handleCloseDialog}
        handleSave={handleSavePost}
        handlePostChange={handleOpenDialogPostChange}
      />
    </Grid>
  );
}

export default PostPage;
