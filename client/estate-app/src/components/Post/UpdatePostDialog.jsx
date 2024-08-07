import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

function UpdatePostDialog(props) {
  const { openDialog, handleClose, handleSave, handlePostChange } = props;

  return (
    <div>
      <Dialog open={openDialog.open} onClose={handleClose}>
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <TextField
            value={openDialog.post.text}
            onChange={(e) => handlePostChange(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={openDialog.post.text === ""}
            onClick={handleSave}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdatePostDialog;
