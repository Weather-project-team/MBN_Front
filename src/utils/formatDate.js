export const formatShortDate = (dateString) => {
  const date = new Date(dateString);

  // 월, 일이 1자리일 경우 0을 채워서 두 자릿수로 만들어줌
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 1월은 01로 변환
  const day = date.getDate().toString().padStart(2, '0'); // 1일은 01로 변환

  return `${month}-${day}`;
};
