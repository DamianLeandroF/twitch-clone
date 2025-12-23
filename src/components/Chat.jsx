import { useState, useEffect, useRef } from "react";
import { initialMessages, mockNewMessages } from "../data/chatMessages";
import { MessageCircle, Send } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [messagesIndex, setMessagesIndex] = useState(0);
  const chatEndRef = useRef(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (messagesIndex < mockNewMessages.length) {
        const newMessage = {
          ...mockNewMessages[messagesIndex],
          id: messages.length + 1,
          time: getCurrentTime(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessagesIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [messagesIndex, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-800 flex flex-col h-full rounded-lg p-4">
      <h3 className="text-white p-3 border-b border-gray-700 font-semibold flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-cyan-400" />
        Chat
      </h3>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <span className="text-gray-400 text-xs mr-2">{msg.time}</span>
            <span className={`font-bold ${msg.color}`}>{msg.user}</span>
            <span className="text-gray-200 ml-1">{msg.text}</span>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="p-3 border-t border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="w-full p-2 pr-10 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
