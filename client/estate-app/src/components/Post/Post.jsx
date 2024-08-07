import React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const theme = createTheme();

const StyledCard = styled(Card)(({ theme }) => ({
  width: 400,
  margin: theme.spacing(2, 0),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: "bold",
}));

const StyledContent = styled(Typography)(({ theme }) => ({
  fontSize: 16,
}));

function Post(props) {
  const { post, handleDelete, handleOpen } = props;

  return (
    <ThemeProvider theme={theme}>
      <StyledCard>
        <CardContent>
          <StyledTypography color="primary" gutterBottom>
            {post.id}
          </StyledTypography>
          <StyledContent color="textSecondary" gutterBottom>
            {post.text}
          </StyledContent>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleOpen(post)} size="small">
            Edit
          </Button>
          {""}
          <Button onClick={() => handleDelete(post.id)} size="small">
            Delete
          </Button>
        </CardActions>
      </StyledCard>
    </ThemeProvider>
  );
}

export default Post;
