"use client";

import { useState } from 'react';
import QueryForm from '@/components/QueryForm';
import Response from '@/components/Response';
import History from '@/components/History';
import { useQA } from '@/hooks/useQA';

export default function Home() {
  const {
    response,
    loading,
    error,
    history,
    submitQuery,
    fetchHistory
  } = useQA();

  const [showHistory, setShowHistory] = useState<boolean>(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
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
          <QueryForm onSubmit={submitQuery} isLoading={loading} />

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
