import React, { useState } from 'react';
import { Send, Phone, Video, MoreVertical, Smile, Paperclip } from 'lucide-react';
import { Chat, User, Message } from '../types/chat';

interface ChatViewProps {
  chat?: Chat;
  currentUser: User;
  onSendMessage: (content: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  chat,
  currentUser,
  onSendMessage,
}) => {
  const [message, setMessage] = useState('');

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-600">Welcome to WhatsApp</h3>
          <p className="text-gray-500 mt-2">Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  const otherParticipant = chat.participants.find(
    (p) => p.id !== currentUser.id
  )!;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-16 bg-gray-100 flex items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src={otherParticipant.avatar}
            alt={otherParticipant.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <div className="font-medium">{otherParticipant.name}</div>
            <div className="text-xs text-gray-500">
              {otherParticipant.status === 'online'
                ? 'online'
                : otherParticipant.lastSeen
                ? `last seen ${new Date(otherParticipant.lastSeen).toLocaleTimeString()}`
                : ''}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#efeae2]">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[65%] rounded-lg px-4 py-2 ${
                message.senderId === currentUser.id
                  ? 'bg-[#d9fdd3]'
                  : 'bg-white'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className="flex items-center justify-end mt-1">
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-gray-100">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <Smile className="w-6 h-6 text-gray-600" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <Paperclip className="w-6 h-6 text-gray-600" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 py-2 px-4 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 hover:bg-gray-200 rounded-full disabled:opacity-50"
          >
            <Send className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </form>
    </div>
  );
};