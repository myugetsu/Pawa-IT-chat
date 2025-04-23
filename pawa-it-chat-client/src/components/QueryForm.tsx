import { useState } from 'react';

interface QueryFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export default function QueryForm({ onSubmit, isLoading }: QueryFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label
          htmlFor="query"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          What would you like to know?
        </label>
        <textarea
          id="query"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="E.g., What documents do I need to travel from Kenya to Ireland?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          style={{ color: '#000' }}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`px-6 py-2 rounded-lg text-white font-medium
            ${isLoading || !query.trim()
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
          {isLoading ? 'Thinking...' : 'Submit Question'}
        </button>
      </div>
    </form>
  );
}
