import { useEffect, useState } from 'react';
import { getPostDetailApi } from '../../../api/community/community';
import { useParams } from 'react-router-dom';

export default function CommunityDetail() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getPost = async () => {
      const res = await getPostDetailApi(id);
      setPost(res);
    };
    getPost();
  }, []);
  console.log('post', post);
  if (!post) {
    return <div>Loading...</div>;
  }
  const { title, createdAt, content, imageUrls, likeCount, viewCount } = post;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="text-gray-500 mb-4">
        작성자: ㅎㅎ | 작성일: {createdAt}
      </div>
      <div className="mb-4">{content}</div>
      <div>
        {imageUrls.map((image, idx) => {
          return (
            <img
              key={idx}
              src={`${import.meta.env.VITE_API_BASE_URL}${image}`}
              alt={`post-image-${idx}`}
            />
          );
        })}
      </div>
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          좋아요{likeCount}
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded">댓글</button>
      </div>
    </div>
  );
}
