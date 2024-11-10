export const addStudySession = async (startTime: string, endTime: string, authToken: string | null) => {
  const response = await fetch('http://localhost:5000/study/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
    body: JSON.stringify({ start_time: startTime, end_time: endTime }),
  });
  return response;
};
