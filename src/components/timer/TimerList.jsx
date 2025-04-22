import { useState } from 'react';
import { deleteTimerApi, updateTimerApi } from '../../api/timer/timer';
import { formatTime } from '../../utils/formatTime';

export default function TimerList({ bossTimer, setBossTimer }) {
  const [runningTimers, setRunningTimers] = useState({});

  const handleStart = (id) => {
    const token = localStorage.getItem('token');

    // 🟢 백엔드에 isRunning true + 현재 remainingSeconds 반영
    const timerToUpdate = bossTimer.find((t) => t.id === id);
    updateTimerApi(
      id,
      {
        isRunning: true,
        remainingSeconds: timerToUpdate.remainingSeconds,
      },
      token
    );

    setRunningTimers((prev) => ({
      ...prev,
      [id]: setInterval(() => {
        setBossTimer((prev) =>
          prev.map((timer) =>
            timer.id === id && timer.remainingSeconds > 0
              ? { ...timer, remainingSeconds: timer.remainingSeconds - 1 }
              : timer
          )
        );
      }, 1000),
    }));
  };

  const handleStop = (id) => {
    const token = localStorage.getItem('token');

    clearInterval(runningTimers[id]);

    const timerToUpdate = bossTimer.find((t) => t.id === id);
    updateTimerApi(
      id,
      {
        isRunning: false,
        remainingSeconds: timerToUpdate.remainingSeconds,
      },
      token
    );

    setRunningTimers((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handelDelete = async (timerId) => {
    const token = localStorage.getItem('token'); // ✅ 이 줄 추가
    try {
      await deleteTimerApi(timerId, token);
      console.log(timerId, token);
      // 삭제 후 UI에서도 제거
      setBossTimer((prev) => prev.filter((timer) => timer.id !== timerId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="lg:col-span-3 px-4">
      <h1 className="text-2xl font-bold mb-4">Boss Timer</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bossTimer?.map((boss) => {
          return (
            <div
              key={boss.id}
              className="bg-gray-300 shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {boss.name}
                </h2>
                <span className="font-bold">
                  {formatTime(boss.remainingSeconds)}
                </span>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleStart(boss.id)}
                  className="px-3 py-1 bg-green-500 text-white text-sm
             rounded hover:bg-green-600 transition cursor-pointer"
                >
                  Start
                </button>
                <button
                  onClick={() => handleStop(boss.id)}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm
             rounded hover:bg-yellow-600 transition cursor-pointer"
                >
                  Stop
                </button>
                <button
                  onClick={() => {
                    handelDelete(boss.id);
                  }}
                  className="px-3 py-1 bg-red-500 text-white text-sm
             rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
