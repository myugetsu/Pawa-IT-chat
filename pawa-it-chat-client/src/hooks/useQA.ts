import { useState } from 'react';
import { HistoryItem } from '@/types';
import { submitQuery, fetchQueryHistory } from '@/lib/api';

export function useQA() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSubmitQuery = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await submitQuery(query, historyId);
      setResponse(data.response);
      setHistoryId(data.history_id);

      // Add to local history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        query,
        response: data.response,
        timestamp: new Date().toISOString()
      };

      setHistory(prev => [...prev, newHistoryItem]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchHistory = async () => {
    if (!historyId) return;

    setLoading(true);
    try {
      const data = await fetchQueryHistory(historyId);
      setHistory(data.history);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching history');
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    loading,
    error,
    historyId,
    history,
    submitQuery: handleSubmitQuery,
    fetchHistory: handleFetchHistory
  };
}
