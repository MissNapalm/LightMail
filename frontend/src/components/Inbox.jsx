import { Mail, Star, Clock, Tag } from 'lucide-react';

const Inbox = ({ emails, setSelectedEmail, currentFolder }) => {
  const getFolderIcon = () => {
    switch(currentFolder) {
      case 'inbox': return '📥';
      case 'sent': return '📤';
      case 'drafts': return '📝';
      case 'archive': return '🗄️';
      default: return '📥';
    }
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{getFolderIcon()}</span>
          <h2 className="text-3xl font-bold capitalize bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {currentFolder}
          </h2>
        </div>
        <div className="text-sm text-gray-500">
          {emails?.length} messages
        </div>
      </div>

      <div className="space-y-4">
        {emails && emails.length > 0 ? (
          emails.map((email, index) => (
            <div
              key={email.id}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: `translateY(${index * 10}px)`,
              }}
              className={`
                p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg cursor-pointer
                transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300
                ${email.unread ? 'border-l-4 border-blue-500' : 'border-l-4 border-transparent'}
                animate-fade-in-up
              `}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className={`w-4 h-4 ${email.unread ? 'text-blue-500' : 'text-gray-400'}`} />
                    <h3 className={`text-lg ${email.unread ? 'font-bold' : 'font-medium'}`}>
                      {email.subject}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{email.from}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{email.time}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {email.unread && (
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"/>
                  )}
                  {email.labels?.map((label, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                {email.content}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-16 transform transition-all duration-300">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-4xl animate-bounce">
              📭
            </div>
            <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
              No emails in {currentFolder}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              When you receive emails, they'll show up here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;