"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardLists = ({ data, handleTagClick }) => {
  console.log(data);
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setposts] = useState([]);
  const handleSearchText = (e) => {
    // e.preventDefault();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("/api/prompt");
      const data = await resp.json();
      // console.log(data);
      setposts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username"
          value={searchText}
          onChange={() => {
            handleSearchText();
          }}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardLists data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
