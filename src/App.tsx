import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { Chat, User, Message } from './types/chat';

// Mock data
const currentUser: User = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  status: 'online',
};

const initialChats: Chat[] = [
  {
    id: '1',
    participants: [
      currentUser,
      {
        id: '2',
        name: 'Alice Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        status: 'online',
      },
    ],
    messages: [
      {
        id: '1',
        senderId: '2',
        content: 'Hey, how are you?',
        timestamp: new Date(Date.now() - 3600000),
        status: 'read',
      },
    ],
    unreadCount: 0,
  },
  {
    id: '2',
    participants: [
      currentUser,
      {
        id: '3',
        name: 'Bob Johnson',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
        status: 'offline',
        lastSeen: new Date(Date.now() - 1800000),
      },
    ],
    messages: [
      {
        id: '2',
        senderId: '1',
        content: 'Let me know when youre free',
        timestamp: new Date(Date.now() - 7200000),
        status: 'delivered',
      },
    ],
    unreadCount: 1,
  },
];

function App() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string>();

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleSendMessage = (content: string) => {
    if (!selectedChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      status: 'sent',
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage,
            }
          : chat
      )
    );
  };

  return (
    <div className="h-screen flex bg-white">
      <Sidebar
        chats={chats}
        currentUser={currentUser}
        onChatSelect={setSelectedChatId}
        selectedChatId={selectedChatId}
      />
      <ChatView
        chat={selectedChat}
        currentUser={currentUser}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;