import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, MicOff, Send, Volume2, VolumeX, ShoppingBag, Loader2, Bot, User, HelpCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbotShowcase({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am Ali, your E-Commerce Customer Support Assistant. How can I help you with your order or our products today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Initialize Web Speech API
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text: string) => {
    if (isMuted || !window.speechSynthesis) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.name.includes('Google US English') || v.lang === 'en-US');
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert('Speech recognition is not supported in this browser.');
      }
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send chat history to our server
      const chatHistory = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content
      })).concat({ role: 'user', content: text });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch response: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error("Non-JSON response body:", text.substring(0, 200));
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      speak(data.message);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error connecting to my server. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('portfolio')}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <ShoppingBag size={20} />
              </div>
              {isSpeaking && (
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </div>
            <div>
              <span className="font-bold text-slate-900 leading-tight block">Ali Store Assistant</span>
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {isSpeaking ? 'Speaking...' : 'Online'}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setIsMuted(!isMuted);
              if (!isMuted) window.speechSynthesis.cancel();
            }}
            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 rounded-full"
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
            aria-label={isMuted ? "Unmute Voice" : "Mute Voice"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </nav>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          
          {/* Chat History */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="text-center pb-4">
              <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-wide mb-3 border border-indigo-100">
                E-COMMERCE AI SUPPORT
              </span>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Ali Store AI Customer Support Assistant</h1>
              <p className="text-sm text-slate-500">
                Ask about shipping, returns, order status, or product recommendations.
              </p>
            </div>
            
            <AnimatePresence initial={false}>
              {messages.map(msg => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-slate-200'
                  }`}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={20} />}
                  </div>
                  
                  <div className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm' 
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-sm'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 text-indigo-400">
                    <Bot size={20} />
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-2 text-indigo-400">
                    <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className={`flex items-end gap-3 bg-slate-50 border rounded-3xl p-2 transition-all shadow-sm focus-within:shadow-md focus-within:bg-white ${
              isListening ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/30' : 'border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100'
            }`}>
              <button 
                onClick={toggleListen}
                className={`p-3.5 rounded-full shrink-0 transition-all ${
                  isListening 
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-200 hover:bg-rose-600 animate-pulse' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:text-indigo-600 hover:border-indigo-200 shadow-sm'
                }`}
                title={isListening ? "Stop listening" : "Use Voice Input"}
              >
                {isListening ? (
                  <div className="relative">
                    <Activity size={20} className="animate-ping absolute inset-0 opacity-50" />
                    <Mic size={20} className="relative z-10" />
                  </div>
                ) : (
                  <Mic size={20} />
                )}
              </button>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "Listening..." : "Type your message or use voice..."}
                className="flex-1 max-h-32 min-h-[50px] bg-transparent border-0 focus:ring-0 resize-none py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                rows={1}
              />
              
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-3.5 rounded-full shrink-0 bg-indigo-600 text-white shadow-sm shadow-indigo-200 disabled:opacity-50 disabled:shadow-none hover:bg-indigo-700 hover:scale-105 transition-all"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
            
            <div className="flex justify-center gap-4 mt-5 text-xs font-semibold text-slate-400">
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors" 
                onClick={() => setInput("Where is my order?")}
              >
                <HelpCircle size={14}/> Where is my order?
              </button>
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors" 
                onClick={() => setInput("Do you ship internationally?")}
              >
                <HelpCircle size={14}/> Do you ship internationally?
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
