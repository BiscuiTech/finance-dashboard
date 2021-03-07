
export async function api(method: 'GET' | 'POST', endpoint: string, data: Record<string, unknown>) {
  const response=  await fetch(endpoint, {
      method,
      body:JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const json = await response.json();
    return json
}