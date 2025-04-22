export function formatTime(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) return '00';

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
  } else if (mins > 0) {
    return `${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
  } else {
    return String(secs).padStart(2, '0');
  }
}
