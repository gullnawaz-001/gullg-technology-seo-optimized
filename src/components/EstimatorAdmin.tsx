import React, { useState } from 'react';
import { useThreads } from '../hooks/useThreads';

export function EstimatorAdmin() {
  const { threads, updateThreads } = useThreads();
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || '');
  const [adminReplyInput, setAdminReplyInput] = useState('');
  const [selectedThreadIds, setSelectedThreadIds] = useState<string[]>([]);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyInput.trim() || !activeThreadId) return;

    const updatedThreads = threads.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          unreadByAdmin: false,
          unreadByClient: true,
          messages: [
            ...t.messages,
            {
              sender: 'admin' as const,
              text: adminReplyInput,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return t;
    });

    updateThreads(updatedThreads);
    setAdminReplyInput('');
  };

  const markThreadAsRead = (id: string) => {
    setActiveThreadId(id);
    const updated = threads.map(item => item.id === id ? { ...item, unreadByAdmin: false } : item);
    updateThreads(updated);
  };

  const toggleThreadSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedThreadIds(prev => 
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedThreadIds.length === threads.length && threads.length > 0) {
      setSelectedThreadIds([]);
    } else {
      setSelectedThreadIds(threads.map(t => t.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedThreadIds.length === 0) return;
    const updatedThreads = threads.filter(t => !selectedThreadIds.includes(t.id));
    updateThreads(updatedThreads);
    setSelectedThreadIds([]);
    if (activeThreadId && selectedThreadIds.includes(activeThreadId)) {
      setActiveThreadId('');
    }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 w-full">
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-800 px-3 py-1 rounded-full border border-slate-200">
            Admin Panel Control Center
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-3">📥 Offers & Client Inbox</h2>
        </div>
        <span className="text-xs font-mono bg-slate-800 text-white px-3 py-1 rounded-full font-bold shadow-sm">
          {threads.filter(t => t.unreadByAdmin).length} New Messages
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={threads.length > 0 && selectedThreadIds.length === threads.length}
                onChange={handleSelectAll}
                className="w-3.5 h-3.5 text-slate-800 rounded border-slate-300 cursor-pointer"
              />
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Inbox Threads</h4>
            </div>
            {selectedThreadIds.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded hover:bg-red-100 transition-colors"
              >
                Delete Selected
              </button>
            )}
          </div>
          {threads.map((t) => (
            <div
              key={t.id}
              onClick={() => markThreadAsRead(t.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeThreadId === t.id
                  ? 'bg-slate-50 border-slate-400 shadow-sm'
                  : t.unreadByAdmin
                  ? 'bg-white border-slate-300 shadow-sm'
                  : 'bg-slate-50/50 border-slate-100 opacity-80'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedThreadIds.includes(t.id)}
                    onChange={(e) => toggleThreadSelection(t.id, e as unknown as React.MouseEvent)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-3.5 h-3.5 text-slate-800 rounded border-slate-300 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{t.id}</span>
                </div>
                {t.unreadByAdmin && (
                  <span className="text-[9px] bg-slate-800 text-white px-1.5 py-0.5 rounded font-bold uppercase shadow-sm">
                    New Message
                  </span>
                )}
              </div>
              <h5 className="text-sm font-bold text-slate-900 mt-1">{t.clientName}</h5>
              <div className="flex justify-between items-center mt-2 text-xs">
                <span className="text-slate-500">Est: {t.totalEstimatedCost}</span>
                <span className="font-bold text-slate-900">Offer: {t.clientProposedCost}</span>
              </div>
            </div>
          ))}
          {threads.length === 0 && (
            <div className="text-slate-400 text-sm italic">No messages found.</div>
          )}
        </div>

        <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6 h-[600px]">
          {activeThread ? (
            <>
              <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{activeThread.clientName}</h4>
                  <p className="text-xs text-slate-500">{activeThread.email}</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-slate-500">Proposed Total</span>
                  <span className="text-xl font-black text-slate-900">{activeThread.clientProposedCost}</span>
                </div>
              </div>

              {activeThread.proposalItems && activeThread.proposalItems.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Selected Services & Suggestions:</span>
                  <div className="space-y-2 mt-3">
                    {activeThread.proposalItems.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs text-slate-700">
                        <span className="font-medium">• {item.title}</span>
                        <span className="font-mono text-slate-900 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          Original: ${item.original} → Suggested: ${item.suggested}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-xl border border-slate-200 shadow-inner">
                {activeThread.messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'admin' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`p-4 rounded-xl max-w-md text-sm leading-relaxed shadow-sm ${
                      m.sender === 'admin'
                        ? 'bg-slate-800 text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}>
                      <p>{m.text}</p>
                      <span className={`block text-[10px] mt-2 text-right ${m.sender === 'admin' ? 'opacity-70 text-white' : 'text-slate-500'}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendAdminReply} className="flex gap-3 pt-2">
                <input
                  type="text"
                  placeholder="Type admin reply message to send to Client Portal..."
                  value={adminReplyInput}
                  onChange={(e) => setAdminReplyInput(e.target.value)}
                  className="flex-1 p-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-slate-800 outline-none shadow-sm transition-shadow"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
                >
                  Send Reply
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm italic">
              Select a message thread from the inbox list to view details.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
