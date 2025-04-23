import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecentApi } from '../../api/home/home';
import { formatShortDate } from '../../utils/formatDate';

export default function MainRecentPosts() {
  const [recentPosts, setRecentPosts] = useState([]);
  const getRecentPosts = async () => {
    try {
      const res = await getRecentApi();
      setRecentPosts(res);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getRecentPosts();
  }, []);
  return (
    <div className="mt-6 text-center">
      <h1 className="font-bold text-3xl mb-3 text-gray-500 border-b-1 border-gray-300">
        Welcome! Mabari Community
      </h1>
      <ul className=" text-xs lg:text-sm text-gray-500">
        {recentPosts?.map((post) => {
          return (
            <li key={post.id} className="">
              <Link
                to={`/community/${post.category}/${post.id}`}
                className="flex justify-between items-center font-semibold text-gray-700 border-b border-gray-300 py-2"
              >
                <span>
                  {formatShortDate(post.createdAt)} | {post.title}
                </span>
                <span>
                  {post.nickname} | {post.likeCount} | {post.viewCount}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
