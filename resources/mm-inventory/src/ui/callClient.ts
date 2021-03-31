export default async <T>(method: string, params: any = {}): Promise<T> => {
  const res = await fetch(`https://mm-inventory/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(params),
  });
  return await res.json();
};
