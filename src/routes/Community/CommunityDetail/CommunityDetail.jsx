import { useEffect, useState } from 'react';
import { getPostDetailApi } from '../../../api/community/community';
import { useNavigate, useParams } from 'react-router-dom';
import ImageSlider from '../../../components/communityDetail/ImageSlider';
import { formatShortDate } from '../../../utils/formatDate';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { editPostState } from '../../../atoms/editPostAtom';

export default function CommunityDetail() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const setEditPost = useSetRecoilState(editPostState);
  const navigate = useNavigate();
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
  const {
    title,
    createdAt,
    nickname,
    content,
    imageUrls,
    likeCount,
    viewCount,
  } = post;

  const handelEdit = () => {
    navigate(`/community/edit/${id}`);
    setEditPost(post);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="text-gray-500 mb-4">
        작성자: {nickname} | 작성일: {formatShortDate(createdAt)}
      </div>

      {imageUrls.length > 0 && <ImageSlider imageUrls={imageUrls} />}

      <div className="mb-4">{content}</div>
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          좋아요{likeCount}
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded">댓글</button>

        <button onClick={handelEdit}>수정하기</button>
      </div>
    </div>
  );
}
