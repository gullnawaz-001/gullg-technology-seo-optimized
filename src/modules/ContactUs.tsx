import { useSearchParams } from "react-router";
import { Mail, MapPin, Phone, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';


const Linkedin = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const Twitter = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Facebook = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;

export function ContactUs() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    projectType: preselectedService || ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '', projectType: preselectedService || '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Contact Us</h1>
          <p className="text-lg text-slate-600">Get in touch with the GullG Technology team for inquiries, support, or strategic partnerships.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm ring-1 ring-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
            {preselectedService && (
              <div className="mb-6 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
                Great — tell us more about your {preselectedService} project.
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-400 outline-none transition-all" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-400 outline-none transition-all" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-400 outline-none transition-all" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Project Type</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-400 outline-none transition-all"
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  required
                >
                  <option value="" disabled>Select a project type...</option>
                  <option value="Discovery & Consultation">Discovery & Consultation</option>
                  <option value="Full Project Build">Full Project Build</option>
                  <option value="Ongoing / Retainer">Ongoing / Retainer</option>
                  <option value="Custom Dashboards & Platforms">Custom Dashboards & Platforms</option>
                  <option value="AI Integration">AI Integration</option>
                  <option value="Brand & Creative Design">Brand & Creative Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-slate-400 outline-none transition-all resize-none" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="w-full py-4 rounded-xl bg-slate-700 text-white font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'loading' ? (
                  'Sending...'
                ) : status === 'success' ? (
                  'Message Sent Successfully!'
                ) : status === 'error' ? (
                  'Error Sending Message'
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center space-y-10"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email</h4>
                    <p className="text-slate-600">info@gullgtech.online</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Phone</h4>
                    <p className="text-slate-600">+92 336 5656 071</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">WhatsApp</h4>
                    <p className="text-slate-600">+92 336 5656 071</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Headquarters</h4>
                    <p className="text-slate-600">123 Innovation Drive, Suite 400<br/>San Francisco, CA 94105</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Pakistan Office</h4>
                    <p className="text-slate-600">71-A D-12/2, Islamabad</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 :bg-slate-800 hover:text-slate-900 :text-white transition-all shadow-sm">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 :bg-slate-800 hover:text-slate-900 :text-white transition-all shadow-sm">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 :bg-slate-800 hover:text-slate-900 :text-white transition-all shadow-sm">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
