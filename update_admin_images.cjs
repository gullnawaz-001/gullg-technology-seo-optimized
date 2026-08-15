const fs = require('fs');
let code = fs.readFileSync('src/modules/CheelaCafeShowcase.tsx', 'utf8');

const replacement = `              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">`;

code = code.replace(/<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\s*\{\[\s*\{ name: 'Quinoa Power Bowl',.*?<div className="flex justify-between items-center pt-3 border-t border-slate-100">/s, replacement);

fs.writeFileSync('src/modules/CheelaCafeShowcase.tsx', code);
