import { useState } from 'react';

interface QueryFormProps {
  onSubmit: (query: string) => void; // Function to handle form submission
  isLoading: boolean; // Indicates if the form is in a loading state
}

/**
 * QueryForm Component
 * A form for submitting user queries with a loading state and validation.
 */
export default function QueryForm({ onSubmit, isLoading }: QueryFormProps) {
  const [query, setQuery] = useState(''); // State to track the user's input

  /**
   * Handles form submission.
   * Prevents default form behavior and triggers the onSubmit callback if the query is valid.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      try {
        onSubmit(query); // Trigger the parent-provided onSubmit function
      } catch (error) {
        console.error('Error submitting query:', error); // Log any unexpected errors
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Input Section */}
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
          disabled={isLoading} // Disable input while loading
          style={{ color: '#000' }}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !query.trim()} // Disable button if loading or query is empty
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
