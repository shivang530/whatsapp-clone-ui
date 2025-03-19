import React from 'react';
import { Search, Settings, MessageSquare, Users, Phone, MoreVertical } from 'lucide-react';
import { User, Chat } from '../types/chat';

interface SidebarProps {
  chats: Chat[];
  currentUser: User;
  onChatSelect: (chatId: string) => void;
  selectedChatId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentUser,
  onChatSelect,
  selectedChatId,
}) => {
  return (
    <div className="w-[350px] h-full flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="h-16 bg-gray-100 flex items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Users className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <MessageSquare className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg text-sm"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => {
          const otherParticipant = chat.participants.find(
            (p) => p.id !== currentUser.id
          )!;
          
          return (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`w-full flex items-center p-3 hover:bg-gray-100 ${
                selectedChatId === chat.id ? 'bg-gray-100' : ''
              }`}
            >
              <img
                src={otherParticipant.avatar}
                alt={otherParticipant.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{otherParticipant.name}</span>
                  {chat.lastMessage && (
                    <span className="text-xs text-gray-500">
                      {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 truncate max-w-[200px]">
                    {chat.lastMessage?.content}
                  </span>
                  {chat.unreadCount > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};