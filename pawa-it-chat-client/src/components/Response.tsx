// src/components/Response.tsx
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface ResponseProps {
  content: string;
  isLoading: boolean;
}

export default function Response({ content, isLoading }: ResponseProps) {
  return (
    <div className="bg-indigo-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-indigo-800 mb-4">Response</h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-700"></div>
        </div>
      ) : (
        <div className="prose prose-indigo max-w-none" style={{ color: '#000' }}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-indigo-800" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3 text-indigo-700" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 text-indigo-600" {...props} />,
              h4: ({ node, ...props }) => <h4 className="text-base font-bold mt-3 mb-2 text-indigo-600" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              a: ({ node, href, ...props }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-indigo-300 pl-4 italic my-4" {...props} />
              ),
              code: ({ node, inline, className, ...props }) => (
                inline ?
                <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600" {...props} /> :
                <pre className="bg-gray-100 p-4 rounded overflow-auto" {...props} />
              ),
              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
              em: ({ node, ...props }) => <em className="italic" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
