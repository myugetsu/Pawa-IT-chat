import { useState, useEffect } from 'react';

interface ResponseProps {
  content: string;
  isLoading: boolean;
}

export default function Response({ content, isLoading }: ResponseProps) {
  // This will enhance the markdown display in a real implementation
  const formattedContent = content.split('\n').map((line, i) => (
    <p key={i} className={line.startsWith('•') ? 'ml-4' : ''}>
      {line}
    </p>
  ));

  return (
    <div className="bg-indigo-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-indigo-800 mb-4">Response</h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-700"></div>
        </div>
      ) : (
        <div
          className="prose prose-indigo max-w-none"
          style={{ color: '#000' }}>
          {formattedContent}
        </div>
      )}
    </div>
  );
}
