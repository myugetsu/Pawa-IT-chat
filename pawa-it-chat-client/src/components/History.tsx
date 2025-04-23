import { HistoryItem } from '@/types';
import ReactMarkdown from 'react-markdown';

interface HistoryProps {
  items: HistoryItem[];
}

export default function History({ items }: HistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-indigo-800 mb-4">Your Questions History</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No history available yet</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-indigo-700">{item.query}</h3>
                <span className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="text-gray-700 text-sm pl-2 border-l-2 border-indigo-200">
                <div className="prose prose-sm prose-indigo max-w-none" style={{ color: '#000' }}>
                  <ReactMarkdown>
                    {item.response}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
