const Sidebar = ({ view, setView, setShowCompose }) => {
    const folders = [
      { name: 'Inbox', value: 'inbox', icon: '📥' },
      { name: 'Sent', value: 'sent', icon: '📤' },
      { name: 'Drafts', value: 'drafts', icon: '📝' },
      { name: 'Archive', value: 'archive', icon: '🗄️' }
    ];
  
    return (
      <div className="h-full min-h-screen bg-white dark:bg-gray-800 w-64 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300 shrink-0">
        <div className="p-4 sticky top-0">
          <button
            onClick={() => setShowCompose(true)}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg 
              hover:shadow-lg hover:scale-105 transition-all duration-300 transform mb-6 flex items-center justify-center space-x-2"
          >
            <span>✏️</span>
            <span className="font-semibold">Compose</span>
          </button>
          
          <nav className="space-y-2">
            {folders.map(folder => (
              <button
                key={folder.value}
                onClick={() => setView(folder.value)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                  ${view === folder.value 
                    ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className="text-xl">{folder.icon}</span>
                <span className="font-medium">{folder.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    );
  };
  
  export default Sidebar;