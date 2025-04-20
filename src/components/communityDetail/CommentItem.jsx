import { AiOutlineLike } from 'react-icons/ai';
import { MdOutlineSubdirectoryArrowRight, MdReport } from 'react-icons/md';
import { formatShortDate } from '../../utils/formatDate';

export default function CommentItem({
  comment,
  isEditing,
  editContent,
  setEditContent,
  setEditingCommentId,
}) {
  const handleCancel = () => {
    setEditingCommentId(null);
    setEditContent('');
  };

  return (
    <div className="flex items-start gap-2 mt-4">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}${comment.profileImageUrl}`}
        alt="123"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col w-full">
        <div className="flex gap-2 items-center">
          <p className="font-semibold">{comment.nickname}</p>
          <p className="text-gray-500 text-sm">
            {formatShortDate(comment.createdAt)}
          </p>
          <button
            onClick={() => {
              setEditingCommentId(comment.id);
              setEditContent(comment.content);
            }}
            className="cursor-pointer text-gray-400"
          >
            Edit
          </button>
        </div>

        {!isEditing ? (
          <p className="whitespace-pre-line">{comment.content}</p>
        ) : (
          <form className="mt-2 flex flex-col gap-2 w-full">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full min-w-0 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 h-30"
              placeholder="수정 내용 입력"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-3 py-1 bg-gray-200 text-sm rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded"
              >
                Save
              </button>
            </div>
          </form>
        )}

        <div className="flex items-center mt-2">
          <button className="text-gray-500 flex items-center hover:text-blue-500 cursor-pointer">
            mention <MdOutlineSubdirectoryArrowRight />
          </button>
          <button className="text-gray-500 ml-3 mr-3 flex items-center hover:text-blue-500 cursor-pointer">
            likes <AiOutlineLike />
          </button>
          <button className="text-gray-500 flex items-center hover:text-red-500 cursor-pointer">
            report <MdReport />
          </button>
        </div>
      </div>
    </div>
  );
}
