'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

type Message = { text: string; isUser: boolean };

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: "Howdy! Welcome to pickMe! Need help finding chords or learning fingerstyle techniques? I'm here to help you rock on!", isUser: false }]);
    }
  }, [isOpen, messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const userMessage: Message = { text: inputMessage, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.reply, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: 'Sorry, an error occurred.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-400 w-96 mb-4"
          >
            <div className="h-[calc(100vh-8rem)] max-h-[32rem] flex flex-col text-sm">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl ${
                        msg.isUser
                          ? 'bg-yellow-400 text-black'
                          : 'bg-gray-100 text-black'
                      }`}
                    >
                      {msg.isUser ? (
                        msg.text
                      ) : (
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] p-3 rounded-2xl text-black">
                      Just a sec, our AI buddy is brainstorming...
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="bg-gray-50 p-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border-2 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                    disabled={isLoading}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-400 text-black w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 overflow-hidden"
        whileHover={{ scale: 1.1, rotate: 360, transition: { duration: 0.5 } }}
        whileTap={{ scale: 0.9 }}
        animate={{
          backgroundColor: isOpen ? ['#FBBF24', '#FCD34D', '#FBBF24'] : '#FBBF24',
          transition: { duration: 2, repeat: Infinity }
        }}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? [1, 1.2, 1] : 1,
            transition: { duration: 0.5 }
          }}
        >
          {isOpen ? (
            <FaChevronDown className="text-2xl" />
          ) : (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
            </motion.svg>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default Chat;
