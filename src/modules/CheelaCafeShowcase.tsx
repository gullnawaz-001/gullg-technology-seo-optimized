import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  ArrowLeft, Rocket, MonitorPlay, CheckCircle2, LayoutDashboard, 
  ShoppingBag, Users, UtensilsCrossed, Settings, Search, Bell, 
  ChevronDown, X, Coffee, ChevronRight, Minus, Plus, CreditCard,
  MapPin, Clock, Star, Trash2
} from 'lucide-react';

// Main Showcase Component
export function CheelaCafeShowcase({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [showDemo, setShowDemo] = useState(false);
  
  if (showDemo) {
    return <CheelaCafeLiveDemo onBack={() => setShowDemo(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-500/30">
      {/* Portfolio Landing Page Content */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('portfolio')}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
          <div className="font-bold text-slate-900">GullG Technology <span className="text-slate-400 font-normal">| Case Study</span></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6 shadow-sm">
            <MonitorPlay size={16} /> Live Demo Available
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Cheela Cafe Web Ordering Application
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            A mobile-first restaurant ordering application featuring interactive menus, real-time cart state, and a robust admin dashboard.
          </p>
          <button 
            onClick={() => setShowDemo(true)}
            className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-orange-500/20"
          >
            <Rocket size={20} /> View Live Interactive Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Project Overview</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Cheela Cafe needed a modern, responsive web application to handle online orders, manage their digital menu, and streamline kitchen operations. This solution provides a seamless ordering experience for customers and powerful management tools for staff.
            </p>
            <ul className="space-y-3">
              {[
                "Interactive Digital Menu",
                "Real-time Cart State Management",
                "Customer Order Tracking",
                "Kitchen Admin Order View"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="text-[#EA580C] shrink-0 mt-0.5" size={20} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm border border-slate-800">
            <h3 className="text-2xl font-bold mb-4">Technical Stack</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Built with a modern component-based architecture for high performance, smooth interactions, and scalable backend integration.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'Context API', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'WebSockets', 'Stripe API'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Live Demo Viewer Chrome
function CheelaCafeLiveDemo({ onBack }: { onBack: () => void }) {
  const [viewMode, setViewMode] = useState<'customer' | 'admin' | 'video'>('customer');

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8FAFC] font-sans overflow-hidden">
      {/* Demo Viewer Chrome (Sticky Top Bar) */}
      <div className="bg-slate-900 text-white h-14 flex items-center justify-between px-4 shrink-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Exit Demo
          </button>
          <div className="h-6 w-px bg-slate-700"></div>
          <span className="font-bold text-slate-300 hidden sm:inline-block">Cheela Cafe App Demo</span>
        </div>
        <div className="flex items-center bg-slate-800 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('customer')}
            className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'customer' ? 'bg-[#EA580C] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <span className="hidden sm:inline">📱</span> Customer App
          </button>
          <button 
            onClick={() => setViewMode('admin')}
            className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'admin' ? 'bg-[#EA580C] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <span className="hidden sm:inline">💻</span> Admin Panel
          </button>
          <button 
            onClick={() => setViewMode('video')}
            className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'video' ? 'bg-[#EA580C] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <span className="hidden sm:inline">🎬</span> Commercial Video
          </button>
        </div>
      </div>

      {/* Demo Container */}
      <div className="flex-1 overflow-hidden relative flex items-center justify-center bg-slate-200">
        {viewMode === 'video' ? (
          <div className="w-full max-w-5xl h-full max-h-[850px] bg-[#0A1325] sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col my-4 mx-4 border border-slate-800">
            <video 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            >
              <source src="/cheela-commercial.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : viewMode === 'customer' ? (
          // Mobile App Frame for Customer View
          <div className="w-full max-w-[414px] h-full max-h-[896px] bg-white sm:rounded-[3rem] sm:border-[12px] border-slate-800 overflow-hidden shadow-2xl relative flex flex-col my-4">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-3xl w-40 mx-auto z-50 hidden sm:block"></div>
            <CustomerApp />
          </div>
        ) : (
          // Desktop Browser Frame for Admin View
          <div className="w-full max-w-6xl h-full max-h-[900px] bg-white sm:rounded-xl overflow-hidden shadow-2xl flex flex-col my-4 mx-4 border border-slate-300">
            {/* Browser Chrome */}
            <div className="h-10 bg-slate-100 border-b border-slate-300 flex items-center px-4 gap-2 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="flex-1 ml-4 bg-white border border-slate-300 rounded text-xs px-3 py-1.5 text-slate-500 font-mono text-center truncate">
                admin.cheelacafe.com/dashboard
              </div>
            </div>
            <AdminDashboard />
          </div>
        )}
      </div>
    </div>
  );
}

// ================= CUSTOMER APP =================

function CustomerApp() {
  const [activeTab, setActiveTab] = useState('menu');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{id: string, name: string, price: number, qty: number}[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const addToCart = (item: {id: string, name: string, price: number}) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCart([]);
      setCheckoutSuccess(false);
      setCartOpen(false);
      setActiveTab('orders');
    }, 2500);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-slate-800 relative overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm z-10 shrink-0 sticky top-0">
        <div className="flex items-center justify-between mb-4">
          <div className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EA580C] flex items-center justify-center text-white overflow-hidden">
              <img src="/logo.png" alt="Cheela Cafe Brand Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
              <Coffee size={20} className="hidden" />
            </div>
            Cheela Cafe
          </div>
          <button 
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        
        {/* Delivery Toggle */}
        <div className="bg-slate-100 p-1 rounded-full flex text-sm font-semibold">
          <button className="flex-1 bg-white text-slate-900 shadow-sm rounded-full py-1.5 transition-all duration-300">Delivery</button>
          <button className="flex-1 text-slate-500 rounded-full py-1.5 transition-all duration-300">Pickup</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-24 relative">
        
        {activeTab === 'menu' && (
          <div className="animate-in fade-in duration-300">
            {/* Categories */}
            <div className="px-4 py-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Categories</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory hide-scrollbar">
                {[
                  { name: 'Signature Bowls', active: true },
                  { name: 'Artisan Coffee', active: false },
                  { name: 'Fresh Wraps', active: false },
                  { name: 'Smoothies', active: false },
                  { name: 'Pastries', active: false }
                ].map((cat, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 snap-center shrink-0 cursor-pointer">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${cat.active ? 'bg-[#EA580C] text-white' : 'bg-white text-[#EA580C]'}`}>
                      <UtensilsCrossed size={28} />
                    </div>
                    <span className={`text-xs font-semibold ${cat.active ? 'text-slate-900' : 'text-slate-500'}`}>{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Items */}
            <div className="px-4 pb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Popular Items</h2>
              <div className="space-y-4">
                <MenuItemCard 
                  id="m1"
                  name="Quinoa Power Bowl"
                  desc="Roasted sweet potato, kale, avocado, tahini dressing"
                  price={12.50}
                  image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80"
                  onAdd={() => addToCart({ id: 'm1', name: 'Quinoa Power Bowl', price: 12.50 })}
                />
                <MenuItemCard 
                  id="m2"
                  name="Spicy Chicken Wrap"
                  desc="Grilled chicken, pepper jack, chipotle aioli"
                  price={10.99}
                  image="https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80"
                  onAdd={() => addToCart({ id: 'm2', name: 'Spicy Chicken Wrap', price: 10.99 })}
                />
                <MenuItemCard 
                  id="m3"
                  name="Cold Brew Iced Coffee"
                  desc="Steeped for 18 hours, smooth and bold"
                  price={4.50}
                  image="https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80"
                  onAdd={() => addToCart({ id: 'm3', name: 'Cold Brew Iced Coffee', price: 4.50 })}
                />
                <MenuItemCard 
                  id="m4"
                  name="Avocado Toast"
                  desc="Sourdough, cherry tomatoes, microgreens, sea salt"
                  price={8.50}
                  image="https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&q=80"
                  onAdd={() => addToCart({ id: 'm4', name: 'Avocado Toast', price: 8.50 })}
                />
              </div>
            </div>
            
            <div className="text-center pb-8 pt-4">
              <span className="text-[10px] text-slate-400 font-medium">copyright@gullgtech.com</span>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="p-4 animate-in fade-in duration-300">
            <div className="relative mb-6 mt-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" placeholder="Search menu..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#EA580C] outline-none shadow-sm" autoFocus />
            </div>
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="font-medium text-slate-500">Find your favorite cravings</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-4 animate-in fade-in duration-300">
            <h2 className="text-lg font-bold text-slate-900 mb-4 mt-2">Active Orders</h2>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#EA580C]"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900">Order #ORD-1025</h3>
                  <p className="text-xs text-slate-500">Placed today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider rounded">Preparing</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">1x Quinoa Power Bowl</span>
                  <span className="font-medium">$12.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">1x Cold Brew Iced Coffee</span>
                  <span className="font-medium">$4.50</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Est. Prep Time: 12 min</span>
                <span className="font-bold text-slate-900">$17.00</span>
              </div>
            </div>
            
            <h2 className="text-lg font-bold text-slate-900 mb-4 mt-8">Past Orders</h2>
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm opacity-70">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900">Order #ORD-0982</h3>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded">Completed</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">Yesterday</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">2 Items</span>
                  <button className="text-xs font-bold text-[#EA580C]">Reorder</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center mb-6 mt-2">
              <div className="w-20 h-20 bg-[#EA580C] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md">
                SJ
              </div>
              <h2 className="text-xl font-bold text-slate-900">Sarah Jenkins</h2>
              <p className="text-sm text-slate-500 mb-4">sarah.j@example.com</p>
              <div className="flex gap-4 w-full">
                <div className="flex-1 bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                  <div className="text-lg font-extrabold text-[#EA580C]">12</div>
                  <div className="text-xs font-medium text-slate-500">Orders</div>
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                  <div className="text-lg font-extrabold text-[#EA580C]">340</div>
                  <div className="text-xs font-medium text-slate-500">Points</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left">
                <span className="font-medium text-slate-700">Payment Methods</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left">
                <span className="font-medium text-slate-700">Saved Addresses</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left">
                <span className="font-medium text-slate-700">Notifications</span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center px-4 pb-2 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <NavButton icon={UtensilsCrossed} label="Menu" active={activeTab === 'menu'} onClick={() => setActiveTab('menu')} />
        <NavButton icon={Search} label="Search" active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
        <NavButton icon={Clock} label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
        <NavButton icon={Users} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </div>

      {/* Cart Drawer Overlay */}
      {cartOpen && (
        <div className="absolute inset-0 bg-slate-900/40 z-50 flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white h-[85%] rounded-t-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-full duration-300">
            {checkoutSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Order Confirmed!</h2>
                <p className="text-slate-500 mb-8">Your order has been sent to the kitchen. We'll notify you when it's ready.</p>
                <div className="w-full max-w-xs h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-1/2 animate-pulse"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                  <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <ShoppingBag size={20} className="text-[#EA580C]" /> Your Cart
                  </h2>
                  <button onClick={() => setCartOpen(false)} className="p-2 bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <ShoppingBag size={64} className="mb-4 opacity-20" />
                      <p className="font-medium text-slate-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <div>
                            <h4 className="font-bold text-slate-900">{item.name}</h4>
                            <p className="text-[#EA580C] font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                            <button onClick={() => updateQty(item.id, -1)} className="text-slate-400 hover:text-slate-900 p-1 transition-colors">
                              {item.qty === 1 ? <Trash2 size={16} className="text-red-500" /> : <Minus size={16} />}
                            </button>
                            <span className="font-bold w-4 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="text-[#EA580C] p-1 transition-colors">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {cart.length > 0 && (
                  <div className="p-6 bg-white border-t border-slate-100 pb-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between text-sm text-slate-500 mb-2">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500 mb-4">
                      <span>Delivery Fee</span>
                      <span>$3.99</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-xl text-slate-900 mb-6">
                      <span>Total</span>
                      <span>${(cartTotal + 3.99).toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/30"
                    >
                      <CreditCard size={20} /> Checkout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItemCard({ name, desc, price, image, onAdd }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 transition-all duration-300 hover:shadow-md">
      <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <UtensilsCrossed size={32} className="text-slate-300" />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-bold text-slate-900 leading-tight mb-1">{name}</h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{desc}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-extrabold text-[#EA580C]">${price.toFixed(2)}</span>
          <button 
            onClick={onAdd}
            className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#EA580C] transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 ${active ? 'text-[#EA580C]' : 'text-slate-400'}`}>
      <Icon size={24} className={active ? 'fill-orange-50/50' : ''} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

// ================= ADMIN DASHBOARD =================

function AdminDashboard() {
  const [activePage, setActivePage] = useState('Orders');

  return (
    <div className="flex h-full w-full bg-[#F8FAFC] text-slate-800">
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="font-extrabold text-lg text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#EA580C] flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Cheela Cafe Admin Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
              <Coffee size={18} className="text-white hidden" />
            </div>
            Cheela Admin
          </div>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-1">
          <AdminNavItem icon={LayoutDashboard} label="Dashboard Overview" active={activePage === 'Dashboard'} onClick={() => setActivePage('Dashboard')} />
          <AdminNavItem icon={ShoppingBag} label="Live Orders" badge="4 New" active={activePage === 'Orders'} onClick={() => setActivePage('Orders')} />
          <AdminNavItem icon={UtensilsCrossed} label="Menu Management" active={activePage === 'Menu'} onClick={() => setActivePage('Menu')} />
          <AdminNavItem icon={Users} label="Customers" active={activePage === 'Customers'} onClick={() => setActivePage('Customers')} />
          <AdminNavItem icon={Settings} label="System Settings" active={activePage === 'Settings'} onClick={() => setActivePage('Settings')} />
        </div>
        
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2 py-2 bg-slate-800 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">AM</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Admin Manager</p>
              <p className="text-xs text-slate-400 truncate">Kitchen Terminal</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="text-[10px] text-slate-500 font-medium">copyright@gullgtech.com</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-bold text-slate-900">{activePage}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none w-64" />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activePage === 'Orders' ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-4 gap-4">
                <AdminStatCard title="Total Revenue (Today)" value="$1,245.00" trend="+12.5%" trendUp />
                <AdminStatCard title="Total Orders" value="48" trend="+4.2%" trendUp />
                <AdminStatCard title="Pending Orders" value="4" alert />
                <AdminStatCard title="Avg. Prep Time" value="14 min" trend="-2 min" trendUp />
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900">Recent Orders</h3>
                  <div className="flex gap-2">
                    <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 font-medium outline-none">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Preparing</option>
                      <option>Ready</option>
                    </select>
                  </div>
                </div>
                
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Order ID</th>
                      <th className="px-6 py-4 font-semibold">Customer</th>
                      <th className="px-6 py-4 font-semibold">Items</th>
                      <th className="px-6 py-4 font-semibold">Total</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <OrderTableRow 
                      id="#ORD-1024" customer="Sarah Jenkins" items="2 items" total="$28.50" 
                      status="PENDING" statusColor="bg-amber-100 text-amber-700" 
                    />
                    <OrderTableRow 
                      id="#ORD-1023" customer="Michael Chang" items="1 item" total="$14.00" 
                      status="PREPARING" statusColor="bg-orange-100 text-orange-700" 
                    />
                    <OrderTableRow 
                      id="#ORD-1022" customer="Emma Watson" items="4 items" total="$65.20" 
                      status="READY" statusColor="bg-emerald-100 text-emerald-700" 
                    />
                  </tbody>
                </table>
              </div>

            </div>
          ) : activePage === 'Dashboard' ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center h-80">
                  <h3 className="font-bold text-slate-900 mb-6">Revenue Over Time (Mock)</h3>
                  <div className="flex-1 border-b-2 border-l-2 border-slate-100 relative">
                     {/* Decorative graph bars */}
                     <div className="absolute bottom-0 left-[10%] w-[10%] h-[40%] bg-orange-200 rounded-t-sm"></div>
                     <div className="absolute bottom-0 left-[30%] w-[10%] h-[60%] bg-orange-300 rounded-t-sm"></div>
                     <div className="absolute bottom-0 left-[50%] w-[10%] h-[35%] bg-orange-200 rounded-t-sm"></div>
                     <div className="absolute bottom-0 left-[70%] w-[10%] h-[80%] bg-[#EA580C] rounded-t-sm"></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-80">
                  <h3 className="font-bold text-slate-900 mb-6">Top Items</h3>
                  <ul className="space-y-4 text-sm text-slate-700">
                    <li className="flex justify-between items-center"><span className="font-medium">1. Quinoa Power Bowl</span><span className="font-bold text-[#EA580C]">142</span></li>
                    <li className="flex justify-between items-center"><span className="font-medium">2. Cold Brew Iced Coffee</span><span className="font-bold text-[#EA580C]">128</span></li>
                    <li className="flex justify-between items-center"><span className="font-medium">3. Spicy Chicken Wrap</span><span className="font-bold text-[#EA580C]">96</span></li>
                    <li className="flex justify-between items-center"><span className="font-medium">4. Avocado Toast</span><span className="font-bold text-[#EA580C]">84</span></li>
                  </ul>
                </div>
              </div>
            </div>
          ) : activePage === 'Menu' ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Menu Items</h2>
                <button className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                  + Add New Item
                </button>
              </div>
              
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Quinoa Power Bowl', price: '$12.50', category: 'Signature Bowls', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
                  { name: 'Spicy Chicken Wrap', price: '$10.99', category: 'Fresh Wraps', stock: 'Low Stock', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80' },
                  { name: 'Cold Brew Iced Coffee', price: '$4.50', category: 'Artisan Coffee', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80' },
                  { name: 'Avocado Toast', price: '$8.50', category: 'Breakfast', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&q=80' },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="flex gap-4 mb-3">
                      <div className="w-16 h-16 rounded-lg bg-slate-100 shrink-0 overflow-hidden">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={`${item.name} - Cheela Cafe Item`} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <UtensilsCrossed size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-slate-900 leading-tight">{item.name}</h3>
                          <span className="font-extrabold text-[#EA580C] ml-2">{item.price}</span>
                        </div>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.stock === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.stock}
                      </span>
                      <div className="flex gap-2">
                        <button className="text-sm font-semibold text-slate-500 hover:text-[#EA580C]">Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activePage === 'Customers' ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900">Customer Database</h3>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Orders</th>
                      <th className="px-6 py-4 font-semibold">Lifetime Value</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">Sarah Jenkins</td>
                      <td className="px-6 py-4 text-sm text-slate-500">sarah.j@example.com</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">12</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">$342.50</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-700">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">Michael Chang</td>
                      <td className="px-6 py-4 text-sm text-slate-500">m.chang@example.com</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">4</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">$84.00</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-700">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">Emma Watson</td>
                      <td className="px-6 py-4 text-sm text-slate-500">emma.w@example.com</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">28</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">$895.20</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-purple-100 text-purple-700">VIP</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : activePage === 'Settings' ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm max-w-2xl">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900">General Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Restaurant Name</label>
                    <input type="text" defaultValue="Cheela Cafe" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Support Email</label>
                    <input type="email" defaultValue="hello@cheelacafe.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]" />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Accepting Orders</h4>
                      <p className="text-xs text-slate-500">Temporarily pause new incoming orders.</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Settings size={48} className="text-slate-300 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-2">{activePage} Module</h2>
              <p className="text-slate-500 max-w-sm">This module is currently in development. Navigate to the Orders tab for the active dashboard.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function AdminNavItem({ icon: Icon, label, active, badge, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-[#EA580C] text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={active ? 'text-white' : 'text-slate-500'} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {badge && (
        <span className="bg-[#EF4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

function AdminStatCard({ title, value, trend, trendUp, alert }: any) {
  return (
    <div className={`p-6 rounded-xl border shadow-sm flex flex-col justify-between ${alert ? 'bg-red-50 border-red-100' : 'bg-white border-slate-200'}`}>
      <h4 className={`text-sm font-medium mb-2 ${alert ? 'text-red-600' : 'text-slate-500'}`}>{title}</h4>
      <div className="flex items-end justify-between">
        <span className={`text-2xl font-extrabold ${alert ? 'text-red-700' : 'text-slate-900'}`}>{value}</span>
        {trend && (
          <span className={`text-xs font-bold ${trendUp ? 'text-emerald-600' : 'text-slate-500'}`}>{trend}</span>
        )}
      </div>
    </div>
  );
}

function OrderTableRow({ id, customer, items, total, status, statusColor }: any) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 font-mono text-sm font-bold text-slate-900">{id}</td>
      <td className="px-6 py-4 text-sm font-medium text-slate-700">{customer}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{items}</td>
      <td className="px-6 py-4 text-sm font-bold text-slate-900">{total}</td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ${statusColor}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-sm font-bold text-[#EA580C] hover:text-[#C2410C]">Manage</button>
      </td>
    </tr>
  );
}

export default CheelaCafeShowcase;
