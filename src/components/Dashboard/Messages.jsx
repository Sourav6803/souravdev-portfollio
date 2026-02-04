import { useState } from 'react';
import { FiSearch, FiSend, FiPaperclip, FiMoreVertical, FiChevronLeft } from 'react-icons/fi';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'The designs look great! Let me share some feedback...',
      time: '10:30 AM',
      unread: 2,
      messages: [
        { id: 1, sender: 'them', text: 'Hi there! Do you have time to discuss the project?', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Yes, absolutely. What would you like to discuss?', time: '10:05 AM' },
        { id: 3, sender: 'them', text: 'The designs look great! Let me share some feedback...', time: '10:30 AM' },
      ],
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: 'The final payment has been processed.',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', text: 'Just wanted to let you know the final payment has been processed.', time: 'Yesterday' },
      ],
    },
    {
      id: 3,
      name: 'Design Team',
      avatar: 'https://randomuser.me/api/portraits/lego/6.jpg',
      lastMessage: 'Emma: We need your approval on the mockups',
      time: '2 days ago',
      unread: 5,
      messages: [
        { id: 1, sender: 'them', text: 'Alex: The client requested some changes to the homepage', time: '3 days ago' },
        { id: 2, sender: 'me', text: 'I see. What kind of changes?', time: '2 days ago' },
        { id: 3, sender: 'them', text: 'Emma: We need your approval on the mockups before we proceed', time: '2 days ago' },
      ],
    },
    {
      id: 4,
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      lastMessage: 'Looking forward to our meeting tomorrow',
      time: '1 week ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', text: 'Looking forward to our meeting tomorrow!', time: '1 week ago' },
        { id: 2, sender: 'me', text: 'Same here. I have some exciting ideas to share.', time: '1 week ago' },
      ],
    },
  ];

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === activeChat.id) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: conv.messages.length + 1,
                sender: 'me',
                text: newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ],
            lastMessage: newMessage,
            time: 'Just now'
          };
        }
        return conv;
      });
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-7xl mt-10 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white ">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Messages
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-6 ">
          {/* Conversations sidebar */}
          <div className={`bg-gray-900 rounded-xl shadow-lg border border-gray-800 ${activeChat ? 'hidden lg:block lg:w-1/3' : 'w-full lg:w-1/3'}`}>
            {/* Search bar */}
            <div className="p-4 border-b border-gray-800">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Conversation list */}
            <div className="divide-y divide-gray-800 max-h-[calc(100vh-200px)] overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 hover:bg-gray-800 cursor-pointer transition-colors ${activeChat?.id === conversation.id ? 'bg-gray-800' : ''}`}
                  onClick={() => setActiveChat(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.unread > 0 && (
                        <div className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-400">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat area */}
          {activeChat ? (
            <div className="flex-1 bg-gray-900 rounded-xl shadow-lg border border-gray-800 flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button 
                    className="lg:hidden text-gray-400 hover:text-white"
                    onClick={() => setActiveChat(null)}
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{activeChat.name}</h3>
                    <p className="text-xs text-gray-400">Online</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <FiMoreVertical />
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {activeChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'me' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-800'}`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs text-gray-300 text-right mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-white p-2">
                    <FiPaperclip />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                    onClick={handleSendMessage}
                  >
                    <FiSend />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex flex-1 bg-gray-900 rounded-xl shadow-lg border border-gray-800 items-center justify-center">
              <div className="text-center p-8">
                <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <FiSend size={32} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-300 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose an existing conversation or start a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;