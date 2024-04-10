import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FlexBetween from "../components/FlexBetween";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import axios from "../config/axios";
import { setPosts, setPost } from "../store/auth-slice";

export default function PostWidget({ post }) {
  // _id,
  // userId,
  // firstName,
  // lastName,
  // description,
  // location,
  // picturePath,
  // userPicturePath,
  // likes,
  // comments,
  const dispatch = useDispatch();
  const loginUserId = useSelector((state) => state.user._id);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const [isComments, setIsComments] = useState(false);
  const isLiked = Boolean(post.likes[loginUserId]);
  const likeCount = Object.keys(post.likes).length;

  const patchLike = async () => {
    const postLike = { userId: loginUserId };
    const res = await axios.patch(`/posts/${post._id}/like`, postLike);
    console.log(res);
    const updatePost = res.data;

    dispatch(setPost({ post: updatePost }));
  };

  return (
    <WidgetWrapper m="2rem">
      <Friend
        friendId={post.userId}
        name={`${post.firstName} ${post.lastName}`}
        subtitle={post.location}
        userPicturePath={post.userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {post.description}
      </Typography>
      {post.picturePath && (
        <img
          width="100%"
          height="auto"
          src={`http://localhost:3001/assets/${post.picturePath}`}
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* LIKE BUTTON */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "Crimson" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* COMMENT BUTTON */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{post.comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        {/* SHARE BUTTON */}
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rme">
          {post.comments.map((comment, i) => (
            <Box key={`${post.firstName} ${post.lastName}-${i}`}>
              <Divider />
              <Typography
                sx={{
                  color: main,
                  m: "0.5rem 0",
                  pl: "1rem",
                }}
              >
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}
