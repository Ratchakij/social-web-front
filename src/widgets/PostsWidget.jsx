import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/auth-slice";
import axios from "../config/axios";
import PostWidget from "./PostWidget";

export default function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const res = await axios.get("/posts");
    const data = res.data;
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const res = await axios.get(`/posts/${userId}/posts`);
    const data = res.data;
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostWidget key={post._id} post={post} />
      ))}
    </>
  );
}
