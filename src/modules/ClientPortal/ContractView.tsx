import React from 'react';
import { useState } from 'react';
import { Contract } from '../../types';
import { FileSignature, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function ContractView({ contract, onSign }: { contract: Contract, onSign: (name: string) => void }) {
  const [signature, setSignature] = useState('');
  
  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if(signature.trim()) {
      onSign(signature);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 shadow-sm max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
          <FileSignature size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{contract.title}</h2>
          <p className="text-sm font-medium text-slate-500">Agreement Reference: {contract.id}</p>
        </div>
      </div>
      
      <div className="prose prose-slate max-w-none mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-200">
        {contract.content.split('\\n\\n').map((para, i) => (
          <p key={i} className="mb-4 text-slate-700 leading-relaxed whitespace-pre-wrap">{para}</p>
        ))}
      </div>
      
      {contract.signed ? (
        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex items-start gap-4">
          <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={24} />
          <div>
            <h4 className="font-bold text-emerald-900 text-lg mb-1">Agreement Signed</h4>
            <div className="text-sm text-emerald-700 space-y-1">
              <p>Signed by: <strong>{contract.signedBy}</strong></p>
              <p>Timestamp: <strong>{new Date(contract.signedAt!).toLocaleString()}</strong></p>
              <p>IP Address: <strong>{contract.ipAddress || 'Recorded in logs'}</strong></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <ShieldCheck size={20} className="text-slate-600" />
            Electronic Signature
          </h4>
          <p className="text-sm text-slate-600 mb-6">By typing your name below and clicking 'Sign Agreement', you electronically sign and agree to the terms outlined above.</p>
          
          <form onSubmit={handleSign} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text"
              value={signature}
              onChange={e => setSignature(e.target.value)}
              placeholder="Type your full name to sign"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900"
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              Sign Agreement
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
