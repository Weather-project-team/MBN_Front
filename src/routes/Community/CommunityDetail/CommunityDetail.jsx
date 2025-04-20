import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  deletePostApi,
  getPostDetailApi,
} from '../../../api/community/community';
import { editPostState } from '../../../atoms/editPostAtom';
import { userState } from '../../../atoms/userAtom';
import Comment from '../../../components/communityDetail/Comment';
import ImageSlider from '../../../components/communityDetail/ImageSlider';
import { formatShortDate } from '../../../utils/formatDate';

export default function CommunityDetail() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const user = useRecoilValue(userState);
  const setEditPost = useSetRecoilState(editPostState);
  const navigate = useNavigate();
  useEffect(() => {
    const getPost = async () => {
      const res = await getPostDetailApi(id);
      setPost(res);
    };
    getPost();
  }, []);
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
    profileImageUrl,
  } = post;

  const handelEdit = () => {
    navigate(`/community/edit/${id}`);
    setEditPost(post);
  };

  const handleDelete = async () => {
    deletePostApi(id, token)
      .then(() => {
        alert('게시글이 삭제되었습니다.');
        navigate('/community/pc');
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
        alert('게시글 삭제에 실패했습니다.');
      });
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

        {user?.id === post.authorId && (
          <div>
            <button onClick={handelEdit}>수정하기</button>
            <button onClick={handleDelete}>삭제하기</button>
          </div>
        )}
      </div>

      <Comment postId={id} />
    </div>
  );
}
