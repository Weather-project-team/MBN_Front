import { useState } from 'react';
import { timerCreateApi } from '../../api/timer/timer';

export default function TimerCreate({ getTimerData }) {
  const token = localStorage.getItem('token');

  const [name, setName] = useState('');
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(1);

  const handleCreate = async (e) => {
    e.preventDefault();

    const durationInSeconds = hour * 3600 + minute * 60;

    const data = {
      name,
      remainingSeconds: durationInSeconds,
    };

    try {
      console.log(data);
      await timerCreateApi(data, token);
      alert('타이머 생성 성공!');
      // 초기화하고 싶다면 아래 코드 추가
      // setName('');
      // setHour(1);
      // setMinute(1);
      getTimerData();
    } catch (err) {
      console.error(err);
      alert('타이머 생성 실패!');
    }
  };

  return (
    <aside className="hidden lg:block lg:col-span-1 border-l border-gray-300 pl-6 text-sm">
      <h3 className="font-semibold mb-2">Boss Timer Create!</h3>
      <form className="flex flex-col gap-2" onSubmit={handleCreate}>
        <label className="flex flex-col">
          Boss Name
          <input
            placeholder="Boss name"
            className="border px-2 py-1 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <div>
          {/* 시간 선택 */}
          <select
            className="border px-2 py-1 rounded"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
          >
            {Array.from({ length: 13 }, (_, i) => (
              <option key={i} value={i}>
                {i}시간
              </option>
            ))}
          </select>

          {/* 분 선택 */}
          <select
            className="border px-2 py-1 ml-3 rounded"
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}분
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-green-500 rounded p-2 text-white">
          Create!
        </button>
      </form>
    </aside>
  );
}
