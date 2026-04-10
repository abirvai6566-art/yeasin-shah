/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft,
  Cpu,
  Palette,
  Lightbulb,
  Code2,
  MessageSquare,
  Zap,
  User,
  Calendar,
  Award,
  Sparkles,
  Bot,
  PlayCircle,
  ArrowLeft
} from 'lucide-react';
import { COLORS, SKILLS, SERVICES } from './constants';

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
      style={{ color: COLORS.accent }}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '80px' }}
      viewport={{ once: true }}
      className="h-1.5 mx-auto mt-4 rounded-full"
      style={{ backgroundColor: COLORS.primary }}
    />
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const robotY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen font-sans selection:bg-[#FF6B01] selection:text-white" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter"
            style={{ color: COLORS.accent }}
          >
            YASIN<span style={{ color: COLORS.primary }}>SHAH</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8 font-medium">
            {['Home', 'About', 'Skills', 'Services', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-[#FF6B01] transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="https://wa.me/8801889552451" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full text-white font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#FF6B01]/20"
              style={{ backgroundColor: COLORS.primary }}
            >
              Hire Me
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-6 h-0.5 bg-black mb-1.5" />
            <div className="w-6 h-0.5 bg-black mb-1.5" />
            <div className="w-6 h-0.5 bg-black" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-3xl font-bold">
              {['Home', 'About', 'Skills', 'Services', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-[#FF6B01] transition-colors"
                >
                  {item}
                </a>
              ))}
              <a 
                href="https://wa.me/8801889552451" 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-4 rounded-2xl text-white text-center font-bold"
                style={{ backgroundColor: COLORS.primary }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Robot Animation */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 cursor-pointer"
        style={{ y: robotY }}
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative group">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="absolute -top-20 right-0 bg-[#353535] text-white text-xs px-5 py-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl border border-white/10 font-bold"
          >
            Need AI Automation? I'm here!
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#353535] transform rotate-45 border-b border-r border-white/10"></div>
          </motion.div>
          <div className="w-20 h-20 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(255,107,1,0.3)] flex items-center justify-center border-4 border-[#FF6B01] overflow-hidden relative group-hover:border-[#353535] transition-colors duration-500">
            <Bot size={40} style={{ color: COLORS.primary }} className="relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B01]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-[2rem] bg-[#FF6B01]/20 animate-ping -z-10" />
        </div>
      </motion.div>

      {/* Global Animated Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#FFFFFF]">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FF6B01]"
            style={{
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              opacity: Math.random() * 0.2 + 0.1,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * -300 - 150],
              x: [0, (Math.random() - 0.5) * 150],
              opacity: [0, Math.random() * 0.3 + 0.1, 0],
              scale: [1, Math.random() + 1, 1]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 100, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
            style={{ backgroundColor: COLORS.primary }}
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
              x: [0, -100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
            style={{ backgroundColor: COLORS.accent }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-8 border border-[#FF6B01]/20 bg-white/50 backdrop-blur-sm"
              style={{ color: COLORS.primary }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B01] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B01]"></span>
              </span>
              Available for New Projects
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter" style={{ color: COLORS.accent }}>
              <motion.span className="block">
                <TypingText text="CRAFTING" delay={0.4} />
              </motion.span>
              <motion.span className="block text-[#FF6B01]">
                <TypingText text="INTELLIGENT" delay={1.2} />
              </motion.span>
              <motion.span className="block">
                <TypingText text="VISIONS" delay={2.0} />
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
              className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed bg-white/50 backdrop-blur-sm p-4 rounded-2xl"
            >
              I am <span className="font-bold text-[#353535]">Yasin Shah</span>, a specialized AI Automation Expert, Prompt Engineer, and Graphic Designer. I transform complex ideas into stunning digital realities with "Vibe Coding" precision.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#services" className="px-8 py-4 rounded-full text-white font-bold text-lg flex items-center gap-2 transition-all hover:shadow-2xl hover:shadow-[#FF6B01]/40 hover:-translate-y-1" style={{ backgroundColor: COLORS.primary }}>
                Explore My Services <ChevronRight size={20} />
              </a>
              <div className="flex items-center gap-4 px-4">
                <a href="#" className="p-3 rounded-full border border-gray-200 hover:border-[#FF6B01] hover:text-[#FF6B01] transition-all hover:-translate-y-1 bg-white/50 backdrop-blur-sm"><Github size={20} /></a>
                <a href="#" className="p-3 rounded-full border border-gray-200 hover:border-[#FF6B01] hover:text-[#FF6B01] transition-all hover:-translate-y-1 bg-white/50 backdrop-blur-sm"><Linkedin size={20} /></a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.div 
              style={{ scale }}
              className="aspect-square rounded-3xl overflow-hidden bg-gray-100 relative z-10 shadow-2xl border-4 border-white/50"
            >
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop" 
                alt="AI Robotics Concept" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-sm font-bold uppercase tracking-widest mb-2 text-[#FF6B01]">Expertise</p>
                  <h3 className="text-2xl font-bold">AI & Creative Design</h3>
                </div>
              </div>
            </motion.div>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ backgroundColor: COLORS.primary }} />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ backgroundColor: COLORS.accent }} />
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 relative overflow-hidden bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Get to know the mind behind the intelligent visions.">
            ABOUT ME
          </SectionHeading>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/50 relative"
            >
              <div className="absolute -top-8 -right-8 md:top-8 md:-right-12 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-gray-100 max-w-[200px] z-10 hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B01]/10 flex items-center justify-center">
                    <Award style={{ color: COLORS.primary }} />
                  </div>
                  <div>
                    <p className="text-2xl font-black" style={{ color: COLORS.accent }}>3+</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Years Exp.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: COLORS.accent }}>
                I am <span style={{ color: COLORS.primary }}>Yasin Shah</span>, a Creative Visionary.
              </h3>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                With over 3 years of professional experience, I have mastered the art of blending human creativity with artificial intelligence. My journey started with a passion for design and evolved into an obsession with AI automation and prompt engineering.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-10">
                <div className="flex items-start gap-4">
                  <div className="mt-1"><User size={20} style={{ color: COLORS.primary }} /></div>
                  <div>
                    <h4 className="font-bold" style={{ color: COLORS.accent }}>Name</h4>
                    <p className="text-gray-500">Yasin Shah</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1"><Calendar size={20} style={{ color: COLORS.primary }} /></div>
                  <div>
                    <h4 className="font-bold" style={{ color: COLORS.accent }}>Experience</h4>
                    <p className="text-gray-500">3 Years Professional</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1"><Sparkles size={20} style={{ color: COLORS.primary }} /></div>
                  <div>
                    <h4 className="font-bold" style={{ color: COLORS.accent }}>Specialty</h4>
                    <p className="text-gray-500">AI & Vibe Coding</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1"><MessageSquare size={20} style={{ color: COLORS.primary }} /></div>
                  <div>
                    <h4 className="font-bold" style={{ color: COLORS.accent }}>Language</h4>
                    <p className="text-gray-500">English, Bengali</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm">
                <p className="italic text-gray-600">
                  "My goal is to push the boundaries of what's possible in the digital space, creating experiences that aren't just functional, but truly memorable."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section - Graph Structure */}
      <section id="skills" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="A neural network of my capabilities and technical expertise.">
            AI CREATIVE DESIGN
          </SectionHeading>

          <div className="relative max-w-6xl mx-auto mt-20">
            <div className="grid lg:grid-cols-3 gap-12 items-center relative z-10">
              {/* Left Column */}
              <div className="space-y-8">
                {SKILLS.slice(0, 3).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative group"
                  >
                    {/* Connecting Line to Center */}
                    <div className="hidden lg:block absolute top-1/2 -right-12 w-12 h-[2px] bg-gradient-to-r from-[#FF6B01] to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#FF6B01]/20 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_30px_rgba(255,107,1,0.2)] transition-all relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6B01]" />
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#FF6B01]/10 flex items-center justify-center">
                          {index === 0 && <Code2 style={{ color: COLORS.primary }} />}
                          {index === 1 && <Cpu style={{ color: COLORS.primary }} />}
                          {index === 2 && <Zap style={{ color: COLORS.primary }} />}
                        </div>
                        <h3 className="text-lg font-bold" style={{ color: COLORS.accent }}>{skill.name}</h3>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: COLORS.primary }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Center Computer Image */}
              <div className="hidden lg:flex justify-center relative">
                <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-64 h-64"
                >
                  <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#FF6B01] shadow-[0_0_50px_rgba(255,107,1,0.4)] relative z-10 bg-black">
                    <img 
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                      alt="AI Computer Brain" 
                      className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Orbiting rings */}
                  <div className="absolute inset-[-20%] border border-dashed border-[#FF6B01]/40 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-[-40%] border border-[#FF6B01]/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                  
                  {/* Pulsing Core */}
                  <div className="absolute inset-0 rounded-full bg-[#FF6B01]/20 animate-ping" />
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {SKILLS.slice(3, 6).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative group"
                  >
                    {/* Connecting Line to Center */}
                    <div className="hidden lg:block absolute top-1/2 -left-12 w-12 h-[2px] bg-gradient-to-l from-[#FF6B01] to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#FF6B01]/20 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_30px_rgba(255,107,1,0.2)] transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-1 h-full bg-[#FF6B01]" />
                      <div className="flex items-center gap-4 mb-4 flex-row-reverse">
                        <div className="w-12 h-12 rounded-xl bg-[#FF6B01]/10 flex items-center justify-center">
                          {index === 0 && <Palette style={{ color: COLORS.primary }} />}
                          {index === 1 && <Lightbulb style={{ color: COLORS.primary }} />}
                          {index === 2 && <MessageSquare style={{ color: COLORS.primary }} />}
                        </div>
                        <h3 className="text-lg font-bold text-right" style={{ color: COLORS.accent }}>{skill.name}</h3>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: COLORS.primary }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid Section */}
      <section id="services" className="py-24 relative overflow-hidden bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Innovative solutions powered by AI and creative excellence.">
            PREMIUM SERVICES
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[240px]">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group relative rounded-[2.5rem] p-10 overflow-hidden border border-gray-100 shadow-xl transition-all duration-500 ${
                  service.size === 'large' ? 'md:col-span-4 md:row-span-2 lg:col-span-4' : 
                  service.size === 'medium' ? 'md:col-span-2 md:row-span-2 lg:col-span-3' : 
                  'md:col-span-2 md:row-span-1 lg:col-span-2'
                }`}
                style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#353535' }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B01]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${index % 2 === 0 ? 'bg-[#FF6B01]/10' : 'bg-white/10'}`}>
                    {service.icon === 'Cpu' && <Cpu size={32} style={{ color: index % 2 === 0 ? COLORS.primary : '#FFFFFF' }} />}
                    {service.icon === 'MessageSquare' && <MessageSquare size={32} style={{ color: index % 2 === 0 ? COLORS.primary : '#FFFFFF' }} />}
                    {service.icon === 'Palette' && <Palette size={32} style={{ color: index % 2 === 0 ? COLORS.primary : '#FFFFFF' }} />}
                    {service.icon === 'Code2' && <Code2 size={32} style={{ color: index % 2 === 0 ? COLORS.primary : '#FFFFFF' }} />}
                    {service.icon === 'Lightbulb' && <Lightbulb size={32} style={{ color: index % 2 === 0 ? COLORS.primary : '#FFFFFF' }} />}
                  </div>
                  
                  <h3 className={`text-3xl font-black mb-4 tracking-tighter ${index % 2 === 0 ? 'text-[#353535]' : 'text-white'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-lg leading-relaxed max-w-md ${index % 2 === 0 ? 'text-gray-500' : 'text-gray-400'}`}>
                    {service.description}
                  </p>
                  
                  <div className="mt-auto pt-8">
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className={`inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest cursor-pointer ${index % 2 === 0 ? 'text-[#FF6B01]' : 'text-white'}`}
                    >
                      Learn More <ChevronRight size={16} />
                    </motion.div>
                  </div>
                </div>

                {/* Animated Overlay */}
                <div className="absolute inset-0 bg-[#FF6B01] opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#353535] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF6B01]/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-black mb-8 leading-tight tracking-tighter"
              >
                READY TO <br />
                START YOUR <br />
                <span style={{ color: COLORS.primary }}>NEXT PROJECT?</span>
              </motion.h2>
              <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
                Whether you need a custom AI solution or a stunning graphic design, I'm here to help you bring your vision to life.
              </p>

              <div className="space-y-8">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#FF6B01] transition-all duration-500">
                    <Phone size={28} className="group-hover:text-white" style={{ color: COLORS.primary }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                    <a href="https://wa.me/8801889552451" className="text-2xl font-bold hover:text-[#FF6B01] transition-colors">+880 1889-552451</a>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#FF6B01] transition-all duration-500">
                    <Mail size={28} className="group-hover:text-white" style={{ color: COLORS.primary }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:yeasint959592@gmail.com" className="text-2xl font-bold hover:text-[#FF6B01] transition-colors">yeasint959592@gmail.com</a>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-sm shadow-2xl"
            >
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#FF6B01] focus:bg-white/10 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#FF6B01] focus:bg-white/10 transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#FF6B01] focus:bg-white/10 transition-all" placeholder="Tell me about your amazing project..." />
                </div>
                <button className="w-full py-6 rounded-2xl text-white font-bold text-xl transition-all hover:shadow-2xl hover:shadow-[#FF6B01]/30 hover:-translate-y-1 active:scale-95" style={{ backgroundColor: COLORS.primary }}>
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-2xl font-black tracking-tighter" style={{ color: COLORS.accent }}>
            YASIN<span style={{ color: COLORS.primary }}>SHAH</span>
          </div>
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} Yasin Shah. Built with passion and AI precision.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 hover:text-[#FF6B01] transition-colors font-bold text-sm uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-[#FF6B01] transition-colors font-bold text-sm uppercase tracking-widest">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
