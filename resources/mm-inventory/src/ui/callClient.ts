export default (method: string, params: any = {}) => 
  fetch(`https://mm-inventory/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(params),
  })
  .then(resp => resp.json());