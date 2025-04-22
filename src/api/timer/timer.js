export async function timerCreateApi(data, token) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/timers`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return new Error('타이머 생성 실패');
  }
  const result = await res.json();
  return result;
}

export async function getUserTimerApi(token) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/timers`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return new Error('타이머 가져오기 실패');
  }
  const result = await res.json();
  return result;
}

export async function deleteTimerApi(timerId, token) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/timers/${timerId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(timerId),
    }
  );

  if (!res.ok) {
    return new Error('타이머 삭제 실패');
  }
  const result = await res.json();
  return result;
}

export async function updateTimerApi(timerId, data, token) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/timers/${timerId}/status`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // { isRunning: true, remainingSeconds: 129 }
    }
  );

  if (!res.ok) {
    throw new Error('타이머 상태 업데이트 실패');
  }

  const result = await res.json();
  return result;
}
