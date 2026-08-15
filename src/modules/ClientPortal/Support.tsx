import React from 'react';
import { useState } from 'react';
import { supportTicketsMock } from '../../data';
import { SupportTicket } from '../../types';
import { Send, User, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function Support() {
  const [tickets, setTickets] = useState<SupportTicket[]>(supportTicketsMock);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Technical Issue');
  const [description, setDescription] = useState('');
  
  const [replyText, setReplyText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!subject || !description) return;
    
    const newTicket: SupportTicket = {
      id: `tk-${Date.now()}`,
      subject,
      category,
      description,
      status: 'Open',
      createdAt: new Date().toISOString(),
      messages: [
        { sender: 'Client', text: description, timestamp: new Date().toISOString() }
      ]
    };
    
    setTickets([newTicket, ...tickets]);
    setSubject('');
    setDescription('');
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if(!replyText || !selectedTicket) return;
    
    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        const updated = {
          ...t,
          messages: [
            ...t.messages,
            { sender: 'Client' as const, text: replyText, timestamp: new Date().toISOString() }
          ]
        };
        setSelectedTicket(updated);
        return updated;
      }
      return t;
    });
    
    setTickets(updatedTickets);
    setReplyText('');
  };

  return (
    <div className="space-y-8">
      {!selectedTicket ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Open a Ticket</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Subject</label>
                  <input 
                    type="text" 
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                    placeholder="Brief description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Category</label>
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                  >
                    <option>Technical Issue</option>
                    <option>Billing Question</option>
                    <option>General Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                  <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm min-h-[120px]"
                    placeholder="Provide details..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Your Tickets</h3>
            {tickets.map(ticket => (
              <motion.div 
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{ticket.subject}</h4>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{ticket.category} • {new Date(ticket.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    ticket.status === 'Open' ? 'bg-amber-100 text-amber-700' :
                    ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{ticket.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-0 ring-1 ring-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <button onClick={() => setSelectedTicket(null)} className="text-sm font-semibold text-slate-500 hover:text-slate-900 mb-2 block">
                &larr; Back to Tickets
              </button>
              <h3 className="text-xl font-bold text-slate-900">{selectedTicket.subject}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Ticket ID: {selectedTicket.id} • {selectedTicket.status}</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {selectedTicket.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'Client' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'Client' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${msg.sender === 'Client' ? 'bg-slate-200 text-slate-600' : 'bg-slate-900 text-white'}`}>
                    {msg.sender === 'Client' ? <User size={14} /> : <ShieldAlert size={14} />}
                  </div>
                  <div className={`p-4 rounded-2xl ${msg.sender === 'Client' ? 'bg-slate-900 text-white' : 'bg-white ring-1 ring-slate-200 text-slate-700'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-2 font-medium ${msg.sender === 'Client' ? 'text-slate-400' : 'text-slate-400'}`}>
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedTicket.status !== 'Resolved' && (
            <div className="p-4 border-t border-slate-100 bg-white">
              <form onSubmit={handleReply} className="flex gap-2">
                <input 
                  type="text" 
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 text-sm"
                  placeholder="Type a reply..."
                />
                <button type="submit" className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800">
                  <Send size={18} />
                </button>
              </form>
              {/* BACKEND INTEGRATION NOTE: Wiring up email/WhatsApp notifications for support replies goes here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
