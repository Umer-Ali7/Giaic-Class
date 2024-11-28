"use client";

import { useState, useEffect } from "react";

export default function FetchPostPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/external")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError("An unexpected error occurred"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-red-600 text-4xl font-bold mb-4">Posts</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-opacity-75"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      ) : (
        <ul className="w-full max-w-2xl grid grid-cols-1 gap-6">
          {posts.map((post: { id: number; title: string; body: string }) => (
            <li
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {post.id}. {post.title}
              </h2>
              <p className="text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}