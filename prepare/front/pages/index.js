import React from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import { userState } from "../reducers/user";
import { postState } from "../reducers/post";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector(userState);
  const { mainPosts } = useSelector(postState);
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
