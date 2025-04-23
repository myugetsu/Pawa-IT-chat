"use client";

import { useState } from 'react';
import QueryForm from '@/components/QueryForm';
import Response from '@/components/Response';
import History from '@/components/History';
import { QueryResponse, HistoryItem } from '@/types';

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleSubmit = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/v1/qa/query', {
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
        throw new Error(`Error: ${response.status}`);
      }

      const data: QueryResponse = await response.json();
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

  const fetchHistory = async () => {
    if (!historyId) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/qa/history/${historyId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setHistory(data.history);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching history');
    } finally {
      setLoading(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory && historyId) {
      fetchHistory();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">
            Interactive Q&A System
          </h1>
          <p className="text-gray-600">
            Ask any question and get AI-powered answers
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <QueryForm onSubmit={handleSubmit} isLoading={loading} />

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {response && (
            <div className="mt-8">
              <Response content={response} isLoading={loading} />
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={toggleHistory}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>

            {showHistory && (
              <div className="mt-4">
                <History items={history} />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
