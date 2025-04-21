import { useState } from 'react';
import CommentItem from './CommentItem';

export default function CommentList({ comments, fetchComments }) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          fetchComments={fetchComments}
          isEditing={editingCommentId === comment.id}
          editContent={editContent}
          setEditContent={setEditContent}
          setEditingCommentId={setEditingCommentId}
        />
      ))}
    </div>
  );
}
