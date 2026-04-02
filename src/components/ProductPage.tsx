import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Check, ChevronRight, ChevronDown, Plus, Minus, ArrowRight, ShieldCheck, Leaf, FlaskConical, Quote, Heart, Share2, Truck, RotateCcw, Lock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PRODUCT } from '@/src/constants';

const CTA_BUTTON_CLASS = "bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-2 group";

export const ProductPage = ({ onAddToCart }: { onAddToCart: (qty: number) => void }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const addToCartBtn = document.getElementById('main-add-to-cart');
      if (addToCartBtn) {
        const rect = addToCartBtn.getBoundingClientRect();
        setIsStickyVisible(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-32 pb-32 lg:pb-40 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-text-muted mb-12">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-main">Shop</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-main">{PRODUCT.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image Gallery */}
          <div className="space-y-8">
            <motion.div 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square overflow-hidden rounded-[2.5rem] bg-accent/20 shadow-xl"
            >
              <img 
                src={PRODUCT.images[activeImage]} 
                alt={PRODUCT.name} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-6">
              {PRODUCT.images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300",
                    activeImage === i ? "border-primary shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`${PRODUCT.name} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-primary">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
                </div>
                <span className="text-sm font-bold text-text-main underline decoration-primary underline-offset-8 decoration-2">{PRODUCT.reviewCount} Reviews</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-main leading-tight">{PRODUCT.name}</h1>
              <div className="flex items-center space-x-6">
                <span className="text-4xl font-bold text-primary">${PRODUCT.price.toFixed(2)}</span>
                <span className="text-2xl text-text-muted line-through opacity-50">${PRODUCT.originalPrice.toFixed(2)}</span>
                <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Save 25%</span>
              </div>
              <p className="text-text-muted text-lg md:text-xl leading-relaxed">{PRODUCT.description}</p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 py-10 border-y border-secondary/50">
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="bg-accent p-4 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300"><Leaf className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">100% Natural</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="bg-accent p-4 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300"><ShieldCheck className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Dermatologist Tested</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="bg-accent p-4 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300"><FlaskConical className="w-6 h-6" /></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Cruelty Free</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center justify-between border border-secondary rounded-full px-8 py-4 space-x-8">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-primary transition-colors"><Minus className="w-5 h-5" /></button>
                  <span className="font-bold text-xl w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="hover:text-primary transition-colors"><Plus className="w-5 h-5" /></button>
                </div>
                <button 
                  id="main-add-to-cart"
                  onClick={() => onAddToCart(quantity)}
                  className={cn(CTA_BUTTON_CLASS, "flex-1")}
                >
                  <span>Add to Cart</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-center space-x-8 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                <div className="flex items-center space-x-2"><Truck className="w-4 h-4" /> <span>Free Shipping</span></div>
                <div className="flex items-center space-x-2"><RotateCcw className="w-4 h-4" /> <span>30-Day Returns</span></div>
                <div className="flex items-center space-x-2"><Lock className="w-4 h-4" /> <span>Secure Checkout</span></div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="space-y-12 pt-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-serif font-bold">The Benefits</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PRODUCT.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center space-x-4 text-text-muted">
                      <div className="bg-primary/20 p-1.5 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                      <span className="text-base font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-serif font-bold">Key Ingredients</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {PRODUCT.ingredients.slice(0, 4).map((ing, i) => (
                    <div key={i} className="p-6 bg-accent/20 rounded-3xl border border-secondary/50 hover:border-primary/30 transition-all">
                      <h4 className="font-bold text-sm uppercase tracking-widest mb-2 text-primary">{ing.name}</h4>
                      <p className="text-sm text-text-muted leading-relaxed">{ing.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-40 pt-32 border-t border-secondary">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 space-y-8 md:space-y-0">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Customer Reviews</h2>
              <div className="flex items-center space-x-3 text-primary">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-6 h-6 fill-primary" />)}
                </div>
                <span className="text-text-main font-bold text-lg">4.9 out of 5 stars</span>
              </div>
            </div>
            <button className="bg-text-main text-white px-10 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg">
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {PRODUCT.testimonials.map((test, i) => (
              <div key={i} className="p-10 bg-accent/10 rounded-[2.5rem] space-y-8 border border-secondary/30 hover:shadow-xl transition-shadow duration-500">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-5">
                    <img src={test.avatar} alt={test.name} className="w-14 h-14 rounded-full shadow-sm" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold tracking-widest uppercase text-xs">{test.name}</p>
                      <div className="flex text-primary mt-1">
                        {[...Array(test.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary" />)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">Verified Buyer</span>
                </div>
                <p className="text-text-main text-lg leading-relaxed italic">"{test.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Add To Cart */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-secondary p-5 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="hidden md:flex items-center space-x-6">
                <img src={PRODUCT.images[0]} alt={PRODUCT.name} className="w-14 h-14 rounded-xl object-cover shadow-sm" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-base">{PRODUCT.name}</h4>
                  <p className="text-primary font-bold text-base">${PRODUCT.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex-1 md:flex-none flex items-center space-x-6">
                <div className="hidden sm:flex items-center border border-secondary rounded-full px-6 py-3 space-x-6">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="w-4 h-4" /></button>
                  <span className="font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}><Plus className="w-4 h-4" /></button>
                </div>
                <button 
                  onClick={() => onAddToCart(quantity)}
                  className="flex-1 md:w-72 bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center space-x-3 shadow-lg"
                >
                  <span>Add to Cart</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
