import { Button, TextField } from "@mui/material";
import React from "react";

function AddPost(props) {
  const { state, handleAddPost, handleStateChange } = props;

  return (
    <div>
      <TextField
        fullWidth
        label="Enter Text"
        value={state.text || ""}
        onChange={(e) =>
          handleStateChange({
            ...state,
            text: e.target.value,
          })
        }
      />
      <br />
      <Button
        disabled={state.text === ""}
        onClick={handleAddPost}
        variant="contained"
      >
        Add
      </Button>
    </div>
  );
}

export default AddPost;
