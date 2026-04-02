import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Star, Check, ChevronRight, ChevronDown, Plus, Minus, ArrowRight, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ShieldCheck, Leaf, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { PRODUCT } from '@/src/constants';

// --- Navbar Component ---
export const Navbar = ({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3 text-text-main" : "bg-transparent text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-medium"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="text-2xl font-serif font-bold tracking-widest">
          Beautipi
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest">
          <Link to="/" className={cn("hover:text-primary transition-colors", location.pathname === '/' && "text-primary")}>Home</Link>
          <Link to="/product" className={cn("hover:text-primary transition-colors", location.pathname === '/product' && "text-primary")}>Shop</Link>
          <a href="#benefits" className="hover:text-primary transition-colors">Benefits</a>
          <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
        </div>

        <button 
          onClick={onOpenCart}
          className="relative p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 bg-white z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif font-bold tracking-widest">Beautipi</span>
              <button onClick={() => setIsMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="flex flex-col space-y-8 text-xl font-serif">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/product" onClick={() => setIsMenuOpen(false)}>Shop Now</Link>
              <a href="#benefits" onClick={() => setIsMenuOpen(false)}>Benefits</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)}>Reviews</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Footer Component ---
export const Footer = () => (
  <footer className="bg-accent pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="space-y-6">
        <h3 className="text-2xl font-serif font-bold tracking-widest">Beautipi</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          Premium skincare solutions for the modern woman. Our mission is to provide high-potency, clean beauty products that deliver real results.
        </p>
        <div className="flex space-x-4">
          <Instagram className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          <Facebook className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          <Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
        </div>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
        <ul className="space-y-4 text-sm text-text-muted">
          <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li><Link to="/product" className="hover:text-primary transition-colors">Shop Now</Link></li>
          <li><a href="#benefits" className="hover:text-primary transition-colors">Benefits</a></li>
          <li><a href="#reviews" className="hover:text-primary transition-colors">Reviews</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
        <ul className="space-y-4 text-sm text-text-muted">
          <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
          <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
        <p className="text-sm text-text-muted mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-white border-none px-4 py-2 text-sm w-full focus:ring-1 focus:ring-primary outline-none"
          />
          <button className="bg-primary text-white px-4 py-2 hover:bg-opacity-90 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-8 border-t border-secondary flex flex-col md:flex-row justify-between items-center text-xs text-text-muted space-y-4 md:space-y-0">
      <p>© 2026 Beautipi SKINCARE. ALL RIGHTS RESERVED.</p>
      <div className="flex space-x-6">
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// --- Cart Drawer Component ---
export const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove }: { 
  isOpen: boolean; 
  onClose: () => void; 
  cartItems: any[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-secondary flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-secondary" />
                  <p className="text-text-muted">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-text-muted hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-text-muted">${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 border border-secondary rounded hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 border border-secondary rounded hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-secondary space-y-4 bg-accent/30">
                <div className="flex justify-between text-lg font-bold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-text-muted text-center italic">Shipping and taxes calculated at checkout</p>
                <button className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
