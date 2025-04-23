import { useEffect, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  deletePostApi,
  getPostDetailApi,
} from '../../../api/community/community';
import toggleLikeApi from '../../../api/community/communityAction';
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
  const getPost = async () => {
    const res = await getPostDetailApi(id);
    setPost(res);
  };
  useEffect(() => {
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
    category,
  } = post;

  const handelEdit = () => {
    navigate(`/community/edit/${id}`);
    setEditPost(post);
  };

  const handleDelete = async () => {
    deletePostApi(id, token)
      .then(() => {
        alert('게시글이 삭제되었습니다.');
        navigate(`/community?category=${category}`);
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
        alert('게시글 삭제에 실패했습니다.');
      });
  };

  const toggleLikes = async () => {
    toggleLikeApi(id, token)
      .then(() => {
        getPost();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="text-gray-500 mb-4 text-sm">
        {nickname} | Posted on : {formatShortDate(createdAt)} | Views :{' '}
        {viewCount}
      </div>

      {imageUrls.length > 0 && <ImageSlider imageUrls={imageUrls} />}

      <div className="mb-4">{content}</div>
      <div className="flex gap-2 justify-between">
        <button
          onClick={toggleLikes}
          className="bg-gray-500 flex items-center text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Likes
          <AiOutlineLike className="ml-2 mr-2" />
          {likeCount}
          {/* <AiFillLike/> */}
        </button>

        {user?.id === post.authorId && (
          <div>
            <button
              className="bg-blue-500 px-4 py-2 rounded text-white"
              onClick={handelEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded text-white ml-4"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <Comment postId={id} />
    </div>
  );
}
