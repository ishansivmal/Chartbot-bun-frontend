import { useState, useRef, useEffect } from "react";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";
import axios from "axios";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const API_URL = import.meta.env.VITE_API_URL;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! How can I help you?", sender: "bot" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/chat`, {
        message: userMsg.text,
      });

      const botMsg: Message = {
        id: Date.now() + 1,
        text: data.answer || data.reply || data.message || "No response.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: Date.now() + 1,
        text: "Sorry, failed to get a response. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ✅ CHANGE 1 - Added this new function to fix line breaks
  const renderText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg shadow-indigo-200 transition-all hover:scale-110 active:scale-95 cursor-pointer z-50"
      >
        <IoChatbubbleEllipsesOutline size={28} />
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden border border-slate-200 h-100">
      {/* Header */}
      <div className="bg-indigo-600 text-white px-5 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-base">💬 ChatBot</h3>
          <p className="text-xs text-indigo-200">Ask me anything</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-indigo-700 p-1.5 rounded-xl transition-colors cursor-pointer"
        >
          <IoClose size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id != null ? msg.id : `msg-${messages.indexOf(msg)}`}
            className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              msg.sender === "user"
                ? "bg-indigo-600 text-white ml-auto rounded-br-sm shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm shadow-sm"
            }`}
          >
            {/* ✅ CHANGE 2 - Changed {msg.text} to renderText(msg.text) to fix line breaks */}
            {renderText(msg.text)}
          </div>
        ))}
        {loading && (
          <div className="max-w-[80%] px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-bl-sm shadow-sm">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={loading}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-100 transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white p-2.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm shadow-indigo-200"
        >
          <IoSend size={18} />
        </button>
      </div>
    </div>
  );
}