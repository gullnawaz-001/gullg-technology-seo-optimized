import React, { useState, useEffect } from 'react';
import { defaultServicesOptions } from '../data';
import { useThreads } from '../hooks/useThreads';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ClientCalculator() {
  const [services, setServices] = useState(defaultServicesOptions);
  
  useEffect(() => {
    const savedPricing = localStorage.getItem('gullg_services_pricing_v2');
    if (savedPricing) {
      try {
        setServices(JSON.parse(savedPricing));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const [selectedServices, setSelectedServices] = useState<string[]>(['dashboard-design', 'web-mobile-dev']);
  const [clientSuggestions, setClientSuggestions] = useState<Record<string, string>>({});
  const [clientName, setClientName] = useState(() => localStorage.getItem('gullg_client_name') || '');
  const [clientEmail, setClientEmail] = useState(() => localStorage.getItem('gullg_client_email') || '');
  const [proposalNotes, setProposalNotes] = useState('');
  const [clientMessageInput, setClientMessageInput] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { threads, updateThreads } = useThreads();
  const activeThread = threads[0]; // For simplicity, client always sees their single thread (or the latest one).

  const handleToggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSuggestionChange = (id: string, val: string) => {
    setClientSuggestions(prev => ({ ...prev, [id]: val }));
  };

  const totalOriginalPrice = selectedServices.reduce((sum, id) => {
    const s = services.find(item => item.id === id);
    return sum + (s ? s.basePrice : 0);
  }, 0);

  const totalProposedPrice = selectedServices.reduce((sum, id) => {
    const s = services.find(item => item.id === id);
    const suggested = parseInt(clientSuggestions[id]);
    return sum + (!isNaN(suggested) ? suggested : (s ? s.basePrice : 0));
  }, 0);

  const handleSendOfferToAdmin = (e: React.FormEvent) => {
    e.preventDefault();

    const proposalItems = selectedServices.map(id => {
      const s = services.find(item => item.id === id);
      const suggested = parseInt(clientSuggestions[id]);
      return {
        title: s?.title || id,
        original: s?.basePrice || 0,
        suggested: !isNaN(suggested) ? suggested : (s?.basePrice || 0)
      };
    });

    const newThread = {
      id: `THREAD-${Math.floor(100 + Math.random() * 900)}`,
      clientName: clientName || 'Demo Client',
      email: clientEmail || 'client@example.com',
      totalEstimatedCost: `$${totalOriginalPrice.toLocaleString()}`,
      clientProposedCost: `$${totalProposedPrice.toLocaleString()}`,
      proposalItems,
      messages: [
        {
          sender: 'client' as const,
          text: proposalNotes || `New offer submitted for ${selectedServices.length} expertise services. Proposed Total: $${totalProposedPrice}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      unreadByAdmin: true,
      unreadByClient: false
    };

    updateThreads([newThread, ...threads]);
    
    // Clear form and show popup
    setSelectedServices([]);
    setClientSuggestions({});
    setClientName(localStorage.getItem('gullg_client_name') || '');
    setShowSuccessPopup(true);
    
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const handleSendClientMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientMessageInput.trim()) return;
    if (!activeThread) return;

    const updatedThreads = threads.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          unreadByAdmin: true,
          messages: [
            ...t.messages,
            {
              sender: 'client' as const,
              text: clientMessageInput,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return t;
    });

    updateThreads(updatedThreads);
    setClientMessageInput('');
  };

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Client Portal
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-3">Services Cost Estimator & Direct Messenger</h2>
        </div>
      </div>

      <form onSubmit={handleSendOfferToAdmin} className="space-y-6">
        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider">
          1. Expertise Offer Table (Select Services & Enter Target Price Suggestions)
        </h3>

        <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold">Select</th>
                <th className="p-4 font-semibold">Expertise Service</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Original Price</th>
                <th className="p-4 font-semibold">Your Suggested Price ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((item) => {
                const isSelected = selectedServices.includes(item.id);
                return (
                  <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-slate-50/50' : ''}`}>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleService(item.id)}
                        className="w-4 h-4 text-slate-800 border-slate-300 rounded focus:ring-slate-800 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 font-bold text-slate-900">{item.title}</td>
                    <td className="p-4 text-slate-500">{item.category}</td>
                    <td className="p-4 font-mono font-bold text-slate-700">${item.basePrice}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        placeholder={`Original: $${item.basePrice}`}
                        disabled={!isSelected}
                        value={clientSuggestions[item.id] || ''}
                        onChange={(e) => handleSuggestionChange(item.id, e.target.value)}
                        className="w-40 p-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none disabled:opacity-40 transition-shadow"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 items-center">
          <div>
            <span className="block text-xs font-semibold uppercase text-slate-500 tracking-wide mb-1">Total Original Rate:</span>
            <span className="text-2xl font-bold text-slate-700">${totalOriginalPrice.toLocaleString()}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold uppercase text-slate-500 tracking-wide mb-1">Your Proposed Offer:</span>
            <span className="text-3xl font-black text-slate-900">${totalProposedPrice.toLocaleString()}</span>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              readOnly
              value={`Client Name: ${clientName || 'Demo Client'}`}
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-600 focus:outline-none shadow-sm cursor-not-allowed font-medium"
            />
            <button
              type="submit"
              disabled={selectedServices.length === 0}
              className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              🚀 Send Offer To Admin
            </button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 z-50"
          >
            <CheckCircle className="text-emerald-400" size={24} />
            <div>
              <h4 className="font-bold text-sm">Message sent successfully!</h4>
              <p className="text-xs text-slate-300">Your offer has been sent to the admin inbox.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-8 border-t border-slate-100 space-y-6">
        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider">
          2. Client Portal Live Messenger
        </h3>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="h-64 overflow-y-auto space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            {activeThread?.messages?.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'client' ? 'items-end' : 'items-start'}`}
              >
                <div className={`p-4 rounded-xl max-w-md text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'client'
                    ? 'bg-slate-800 text-white rounded-br-none'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                }`}>
                  <p>{msg.text}</p>
                  <span className={`block text-[10px] mt-2 text-right ${msg.sender === 'client' ? 'opacity-70 text-white' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendClientMessage} className="flex gap-3">
            <input
              type="text"
              placeholder="Type message to admin..."
              value={clientMessageInput}
              onChange={(e) => setClientMessageInput(e.target.value)}
              className="flex-1 p-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-slate-800 outline-none shadow-sm transition-shadow"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
