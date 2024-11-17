import React from 'react';
import { X, Reply, Trash2 } from 'lucide-react';

const EmailViewer = ({ email, onBack, onDelete, onReply }) => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">{email.subject}</h2>
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">From: {email.from}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">To: {email.to}</p>
          <p className="text-sm text-gray-500">{email.time}</p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onReply}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <Reply size={16} />
              <span>Reply</span>
            </span>
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="prose dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap">
            {email.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailViewer;