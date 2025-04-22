import { useEffect, useState } from 'react';
import { getUserTimerApi } from '../../api/timer/timer';
import TimerCreate from '../../components/timer/TimerCreate';
import TimerList from '../../components/timer/TimerList';

export default function Timer() {
  const [bossTimer, setBossTimer] = useState([]);
  const token = localStorage.getItem('token');
  const getTimerData = async () => {
    try {
      getUserTimerApi(token).then((res) => {
        setBossTimer(res);
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getTimerData();
  }, []);
  console.log(bossTimer);
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
      <TimerList bossTimer={bossTimer} setBossTimer={setBossTimer} />
      <TimerCreate getTimerData={getTimerData} />
    </div>
  );
}
