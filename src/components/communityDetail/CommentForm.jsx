import { useState } from 'react';
import { createCommentApi } from '../../api/comment/comment';

export default function CommentForm({ postId, onCommentSubmit }) {
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      content,
      postId: Number(postId),
    };
    try {
      await createCommentApi(formData, token);
      setContent('');
      onCommentSubmit(); // 💥 댓글 다시 불러오기 요청!
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What’s on your mind?"
          className="border border-gray-300 rounded-lg w-full p-2 resize-none
    focus:outline-none focus:ring-2 focus:ring-blue-500 h-30"
        />
        <div className="flex justify-end">
          <button
            className="border border-gray-300
             px-4 py-2 rounded-full cursor-pointer hover:border-blue-500"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
