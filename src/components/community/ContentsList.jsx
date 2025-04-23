import { Link } from 'react-router-dom';

export default function ContentsList({ posts, category }) {
  return (
    <div className="mt-6">
      <ul className=" text-xs lg:text-sm text-gray-500">
        {posts.map((post) => {
          return (
            <li key={post.id} className="">
              <Link
                to={`/community/${category}/${post.id}`}
                className="flex justify-between items-center font-semibold text-gray-700 border-b border-gray-300 py-2"
              >
                <span>
                  {post.createdAt} | {post.title}
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
