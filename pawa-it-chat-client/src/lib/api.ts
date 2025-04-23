import { QueryResponse } from '@/types';

const API_BASE_URL = 'http://localhost:8000/api/v1/qa';

export async function submitQuery(query: string, historyId: string | null = null): Promise<QueryResponse> {
  const response = await fetch(`${API_BASE_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      history_id: historyId
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }

  return await response.json();
}

export async function fetchQueryHistory(historyId: string) {
  const response = await fetch(`${API_BASE_URL}/history/${historyId}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }

  return await response.json();
}
