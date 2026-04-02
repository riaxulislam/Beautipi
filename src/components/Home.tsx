import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Check, ChevronRight, ChevronDown, Plus, Minus, ArrowRight, ShieldCheck, Leaf, FlaskConical, Quote, Droplets, Sparkles, Sun, Moon, RotateCcw, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { PRODUCT } from '@/src/constants';

const CTA_BUTTON_CLASS = "bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-2 group w-full sm:w-auto";

const BeforeAfterSlider = ({ before, after, label }: { before: string, after: string, label: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div className="space-y-8">
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] md:aspect-video min-h-[350px] overflow-hidden rounded-[2.5rem] shadow-2xl cursor-ew-resize select-none bg-accent/20 border border-secondary/30"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* After Image (Background) - The "Result" */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={after} 
            alt="After" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
        </div>
        
        {/* Before Image (Clipped) - The "Original" */}
        <div 
          className="absolute inset-0 w-full h-full z-10 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img 
            src={before} 
            alt="Before" 
            className="absolute inset-0 w-full h-full object-cover" 
            style={{ width: `${100 / (Math.max(sliderPos, 1) / 100)}%`, maxWidth: 'none' }}
            referrerPolicy="no-referrer" 
          />
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-primary/20">
            <div className="flex space-x-0.5">
              <ChevronLeft className="w-3 h-3 text-primary" />
              <ChevronRight className="w-3 h-3 text-primary" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-6 left-6 z-30 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border border-secondary/20">Before</div>
        <div className="absolute top-6 right-6 z-30 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">After</div>
      </div>
      <p className="text-center font-serif text-2xl font-bold italic text-text-muted">{label}</p>
    </div>
  );
};

export const Home = ({ onAddToCart }: { onAddToCart: () => void }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full border border-secondary shadow-sm">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-xs font-bold tracking-widest uppercase">Best Seller 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold leading-tight text-white drop-shadow-2xl">
              Reveal Your Most <br />
              <span className="text-primary italic">Radiant</span> Skin
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {PRODUCT.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <Link 
                to="/product"
                className="bg-white text-primary px-12 py-5 rounded-full font-bold text-xl hover:bg-opacity-90 transition-all shadow-2xl hover:shadow-white/20 hover:-translate-y-1 flex items-center justify-center space-x-2 group w-full sm:w-auto"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <div className="text-left text-white">
                  <div className="flex items-center text-primary">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-primary" />)}
                  </div>
                  <p className="text-sm font-bold">10k+ Happy Customers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 lg:py-48 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">Our Commitment</h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
              We believe that beauty should be as kind as it is effective. That's why we hold ourselves to the highest standards of quality and ethics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            {[
              { icon: <ShieldCheck className="w-10 h-10" />, title: "Clean Beauty", desc: "Zero parabens, sulfates, or phthalates. Only the good stuff." },
              { icon: <Leaf className="w-10 h-10" />, title: "Eco-Conscious", desc: "100% recyclable glass packaging and ethically sourced ingredients." },
              { icon: <Sparkles className="w-10 h-10" />, title: "Clinically Proven", desc: "Dermatologist-tested formulas that deliver visible results in 28 days." },
              { icon: <RotateCcw className="w-10 h-10" />, title: "Our Guarantee", desc: "Not in love? Return it within 30 days for a full, no-questions-asked refund." }
            ].map((item, i) => (
              <div key={i} className="space-y-6 group">
                <div className="bg-accent/40 w-20 h-20 rounded-full flex items-center justify-center text-primary mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-text-main">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed px-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-32 lg:py-48 px-6 bg-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">Why You'll Love It</h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Our Glow Serum is more than just a skincare product. It's a daily ritual that transforms your skin from the inside out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {[
              { icon: <Star className="w-8 h-8" />, title: "Instant Glow", desc: "Light-reflecting particles and Vitamin C provide an immediate boost to skin radiance." },
              { icon: <FlaskConical className="w-8 h-8" />, title: "Deep Hydration", desc: "Multi-weight Hyaluronic Acid molecules penetrate deep to lock in moisture for 24 hours." },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Skin Protection", desc: "Powerful antioxidants shield your skin from environmental pollutants and free radicals." }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="p-12 bg-white rounded-[3rem] space-y-8 border border-secondary/50 hover:border-primary/30 transition-all shadow-sm hover:shadow-2xl"
              >
                <div className="bg-accent w-20 h-20 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold">{benefit.title}</h3>
                <p className="text-text-muted text-lg leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-32 lg:py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-16">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">The Ritual</h2>
              <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Simple steps for maximum results. Incorporate Beautipi into your daily routine for a consistent, healthy glow.
              </p>
            </div>
            
            <div className="space-y-12">
              {[
                { step: "01", icon: <Droplets className="w-6 h-6" />, title: "Cleanse", desc: "Start with a clean, dry face to ensure maximum absorption of the active ingredients." },
                { step: "02", icon: <Sparkles className="w-6 h-6" />, title: "Apply", desc: "Apply 3-5 drops of serum to your fingertips and gently press into skin using upward motions." },
                { step: "03", icon: <Sun className="w-6 h-6" />, title: "Protect", desc: "Follow with moisturizer and SPF in the morning to lock in hydration and protect your glow." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-8 group">
                  <div className="text-5xl font-serif font-bold text-primary/20 group-hover:text-primary transition-colors duration-500">{item.step}</div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold uppercase tracking-widest flex items-center space-x-4">
                      <span className="text-primary bg-accent/50 p-2 rounded-lg">{item.icon}</span>
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-text-muted text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/20 rounded-[4rem] rotate-6 scale-105 blur-sm" />
            <img 
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800" 
              alt="Skincare Product" 
              className="relative w-full rounded-[4rem] shadow-2xl z-10 transform hover:scale-[1.02] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Product Highlights / Ingredients */}
      <section className="py-32 lg:py-40 px-6 bg-secondary/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] -rotate-2" />
            <img 
              src={PRODUCT.images[1]} 
              alt="Ingredients" 
              className="relative w-full rounded-[3rem] shadow-2xl z-10"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-12 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">The Science of Glow</h2>
              <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                We believe in transparency. Every ingredient in our serum is carefully selected for its proven effectiveness and safety.
              </p>
            </div>
            
            <div className="space-y-8 text-left">
              {PRODUCT.ingredients.map((ing, i) => (
                <div key={i} className="flex items-start space-x-5 group">
                  <div className="mt-1 bg-primary/20 p-1.5 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{ing.name}</h4>
                    <p className="text-text-muted text-sm md:text-base">{ing.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              to="/product"
              className="inline-flex items-center space-x-3 text-primary font-bold uppercase tracking-widest text-sm hover:translate-x-3 transition-transform"
            >
              <span>View Full Ingredient List</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-32 lg:py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">Real Results, Real People</h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              See the difference 4 weeks of consistent use can make. No filters, just glowing skin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <BeforeAfterSlider 
              before="https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&q=80&w=800"
              after="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
              label="Dark Spots & Texture"
            />
            <BeforeAfterSlider 
              before="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800"
              after="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
              label="Radiance & Hydration"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-32 lg:py-40 px-6 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">What Our Community Says</h2>
            <div className="flex items-center justify-center space-x-3 text-primary">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-6 h-6 fill-primary" />)}
              </div>
              <span className="text-text-main font-bold text-lg ml-2">4.9/5 Based on 1,248 Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {PRODUCT.testimonials.map((test, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-secondary/50 space-y-8 relative hover:shadow-2xl transition-shadow duration-500"
              >
                <Quote className="absolute top-8 right-10 w-16 h-16 text-secondary/20" />
                <div className="flex items-center space-x-1 text-primary">
                  {[...Array(test.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="text-text-main text-lg leading-relaxed italic">"{test.text}"</p>
                <div className="flex items-center space-x-5 pt-6 border-t border-secondary/30">
                  <img src={test.avatar} alt={test.name} className="w-14 h-14 rounded-full shadow-sm" referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-bold tracking-widest uppercase text-xs">{test.name}</p>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 lg:py-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {PRODUCT.faqs.map((faq, i) => (
              <div key={i} className="border border-secondary rounded-[2rem] overflow-hidden transition-all duration-300 hover:border-primary/50">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-10 py-8 flex justify-between items-center text-left hover:bg-accent/10 transition-colors"
                >
                  <span className="font-bold text-xl md:text-2xl">{faq.question}</span>
                  <div className={cn("bg-accent p-2 rounded-full transition-transform duration-300", openFaq === i && "rotate-180 bg-primary text-white")}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-10 pb-8 text-text-muted text-lg leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 lg:py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-[4rem] p-16 md:p-32 text-center text-white space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            
            <div className="space-y-6 relative z-10">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight">Start Your Glow Journey Today</h2>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join 10,000+ women who have transformed their skin with Beautipi. Get 15% off your first order with code <span className="font-bold underline decoration-2 underline-offset-8">GLOW15</span>.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
              <Link 
                to="/product"
                className="bg-white text-primary px-16 py-6 rounded-full font-bold text-2xl hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Buy Now - $48.00
              </Link>
              <div className="flex items-center space-x-6 text-sm font-bold uppercase tracking-widest opacity-80">
                <span className="flex items-center space-x-2"><Check className="w-4 h-4" /> <span>Free Shipping</span></span>
                <span className="flex items-center space-x-2"><Check className="w-4 h-4" /> <span>Secure Payment</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
