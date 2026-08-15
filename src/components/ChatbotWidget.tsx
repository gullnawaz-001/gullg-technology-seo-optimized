import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = { role: 'user' | 'bot'; text: string; isError?: boolean };

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi! 👋 How can I help you today? You can ask me about our services, pricing, portfolio, or anything else related to GullG Technology.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg }];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = newMessages.map(m => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory, context: 'gullg' })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch response: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'bot', text: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Sorry, I am having trouble connecting right now. Please try again in a moment.',
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] bg-white rounded-3xl shadow-2xl ring-1 ring-slate-200 overflow-hidden flex flex-col"
            style={{ height: '500px' }}
          >
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 ring-2 ring-white/20 shadow-inner">
                  <img src="/logo.png" alt="GullG Assistant Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">GullG Assistant</h3>
                  <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">AI Support</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close Assistant" className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-slate-700 text-white rounded-tr-sm' 
                      : msg.isError 
                        ? 'bg-red-50 text-red-700 ring-1 ring-red-200 rounded-tl-sm'
                        : 'bg-white text-slate-900 ring-1 ring-slate-200 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 ring-1 ring-slate-200 p-3.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-slate-400" />
                    <span className="text-xs font-medium">Assistant is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-200">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  disabled={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..." 
                  className="w-full pr-12 pl-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 text-sm text-slate-900 disabled:opacity-50 transition-all" 
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center bg-slate-700 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-700 transition-colors shadow-sm"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open GullG AI Assistant"
        className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform shadow-slate-900/40 ring-4 ring-white overflow-hidden p-1">
        {isOpen ? <X size={24} /> : <img src="/logo.png" alt="GullG Logo" className="w-full h-full object-cover rounded-full" />}
      </button>
    </div>
  );
}
