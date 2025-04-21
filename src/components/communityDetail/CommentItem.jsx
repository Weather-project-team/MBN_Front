import { AiOutlineLike } from 'react-icons/ai';
import { MdOutlineSubdirectoryArrowRight, MdReport } from 'react-icons/md';
import { deleteCommentApi, editCommentApi } from '../../api/comment/comment';
import { formatShortDate } from '../../utils/formatDate';

export default function CommentItem({
  comment,
  isEditing,
  editContent,
  setEditContent,
  setEditingCommentId,
  fetchComments,
}) {
  const token = localStorage.getItem('token');
  console.log(comment);
  const handleCancel = () => {
    setEditingCommentId(null);
    setEditContent('');
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    const body = { content: editContent };

    try {
      await editCommentApi(body, token, comment.id); // ✅ 수정 완료
      await fetchComments(); // ✅ 목록 다시 불러오기
      setEditingCommentId(null); // ✅ Edit 창 닫기
      setEditContent(''); // ✅ textarea 초기화
    } catch (err) {
      console.error('댓글 수정 실패', err);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await deleteCommentApi(commentId, token);
      await fetchComments(); // ✅ 댓글 목록 갱신
    } catch (err) {
      console.error('댓글 삭제 실패', err);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      {comment.deleted ? (
        <div className="flex items-start gap-2 mt-4 text-gray-500">
          <h1>삭제된 댓글입니다.</h1>
        </div>
      ) : (
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
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            </div>

            {!isEditing ? (
              <p className="whitespace-pre-line">{comment.content}</p>
            ) : (
              <form
                onSubmit={handleEditSave}
                className="mt-2 flex flex-col gap-2 w-full"
              >
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
              {comment.edited ? (
                <p className="text-sm text-gray-500 ml-4">Edited</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
