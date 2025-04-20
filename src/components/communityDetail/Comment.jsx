import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { getAllCommentsApi } from '../../api/comment/comment';

export default function Comment({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await getAllCommentsApi(postId);
      setComments(res);
    } catch (err) {
      console.error('댓글 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);
  return (
    <>
      <CommentForm postId={postId} onCommentSubmit={fetchComments} />
      <CommentList comments={comments} postId={postId} />
    </>
  );
}
