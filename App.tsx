
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  ArrowUpRight,
  Plus,
  Minus,
  Circle,
  ArrowUp,
  Download,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { profileData } from './data';
// import ChatBot from './components/ChatBot';
import ContactForm from './components/ContactForm';

const App: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [activeSection, setActiveSection] = useState('about');
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll handler with offset for the fixed header
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Intersection Observer to highlight active nav link
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['about', 'work', 'experience', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left"
        style={{ scaleX } as any}
      />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            {...({
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.8 },
              onClick: scrollToTop,
              whileHover: { scale: 1.1 }
            } as any)}
            className="fixed bottom-8 right-4 md:bottom-32 md:right-12 z-[90] w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl mix-blend-difference"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modern Top Header */}
      <header className="fixed top-0 left-0 w-full z-[90] flex justify-between items-center px-4 md:px-12 py-4 md:py-8 mix-blend-difference">
        <div className="flex flex-col cursor-pointer" onClick={scrollToTop}>
          <span className="heading-font text-xl md:text-2xl font-bold tracking-tighter uppercase">{profileData.name.split(' ')[0]}</span>
        </div>

        <nav className="hidden md:flex gap-12 text-[11px] font-medium uppercase tracking-[0.2em] mono-font">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className={`transition-all duration-300 ${activeSection === 'about' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white'}`}
          >
            About
          </a>
          <a
            href="#work"
            onClick={(e) => handleNavClick(e, 'work')}
            className={`transition-all duration-300 ${activeSection === 'work' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white'}`}
          >
            Work
          </a>
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden md:inline mono-font text-[11px] font-medium uppercase border-b border-white/40 pb-1 hover:border-white transition-all cursor-pointer"
          >
            Connect
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            {...({
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 }
            } as any)}
            className="fixed inset-0 z-[85] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['about', 'work', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  handleNavClick(e, section);
                  setMobileMenuOpen(false);
                }}
                className="heading-font text-4xl font-bold uppercase tracking-tight text-white/80 hover:text-white transition-colors"
              >
                {section}
              </a>
            ))}
            <a
              href="images/Purushothamreddy_Tiyyagura.pdf"
              download="Purushotham_Resume.pdf"
              className="mt-4 inline-flex items-center gap-2 px-5 py-3 bg-white text-black font-medium rounded-full"
            >
              <Download size={16} />
              <span className="mono-font text-xs uppercase tracking-wider">Download Resume</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Ultra-Minimal Hero */}
        <section id="about" className="min-h-screen flex flex-col justify-center px-4 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12 relative">
          <div className="max-w-[1400px] mx-auto w-full">
            <motion.div
              {...({
                initial: { y: 60, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
              } as any)}
            >
              <h1 className="heading-font text-[13vw] sm:text-[15vw] lg:text-[12vw] leading-[0.85] font-bold uppercase tracking-tighter mb-6 md:mb-12">
                Learning,<br />
                <span className="text-transparent border-text" style={{ WebkitTextStroke: '1px white' }}>Building,</span> <br />
                Learning....
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end">
              <motion.div
                {...({
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.6, duration: 1 }
                } as any)}
                className="md:col-span-5 flex flex-col gap-6"
              >
                <a
                  href="images/Purushothamreddy_Tiyyagura.pdf"
                  download="Purushotham_Resume.pdf"
                  className="inline-flex items-center gap-2 px-3 py-2 w-fit bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 group"
                >
                  <Download size={16} className="group-hover:animate-bounce" />
                  <span className="mono-font text-xs uppercase tracking-wider">Download Resume</span>
                </a>

              </motion.div>

              <motion.div
                {...({
                  initial: { scale: 0.8, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { delay: 0.8, duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                } as any)}
                className="md:col-span-7 flex justify-end"
              >
                <div className="relative group cursor-none">
                  <div className="w-full h-[280px] sm:h-[350px] md:w-[600px] md:h-[400px] overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <img src="/images/profile.png" className="w-full h-full object-cover" alt="Hero" />
                  </div>
                  <div className="absolute top-6 left-6 mix-blend-difference pointer-events-none">
                    <span className="mono-font text-[12px] uppercase">Based in GUNTUR</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/*<div className="absolute bottom-12 left-12 hidden md:block">
            <div className="flex items-center gap-4 opacity-40">
              <span className="mono-font text-[10px] uppercase">Scroll to explore</span>
              <div className="w-px h-12 bg-white"></div>
            </div>
          </div>*/}
        </section>

        {/* Education Section */}
        <section className="py-16 md:py-40 bg-white text-black rounded-[1.5rem] md:rounded-[5rem]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="mb-10 md:mb-20">
              <h2 className="heading-font text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Edu<span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>cation.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {profileData.education.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  {...({
                    initial: { y: 40, opacity: 0 },
                    whileInView: { y: 0, opacity: 1 },
                    viewport: { once: true },
                    transition: { duration: 0.8, delay: idx * 0.1 }
                  } as any)}
                  className="group p-5 md:p-8 border border-black/10 rounded-2xl hover:bg-black hover:text-white transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <span className="mono-font text-2xl md:text-4xl font-bold text-black/20 group-hover:text-white/20 transition-colors">0{idx + 1}</span>
                    <div className="flex-1">
                      <p className="mono-font text-xs uppercase tracking-wider text-black/50 group-hover:text-white/50 mb-2">{edu.period}</p>
                      <h3 className="heading-font text-xl md:text-2xl font-bold uppercase mb-2">{edu.degree}</h3>
                      <p className="text-black/70 group-hover:text-white/70 mb-4">{edu.institution}</p>
                      {edu.grade && (
                        <span className="inline-block px-3 py-1 bg-black/5 group-hover:bg-white/10 rounded-full mono-font text-xs font-bold">
                          {edu.grade}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Projects */}
        <section id="work" className="py-16 md:py-40 relative">
          <div className="max-w-[1400px] mx-auto px-4 md:px-12">
            <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="heading-font text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Selected <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Works.</span>
              </h2>
              <p className="mono-font text-[11px] uppercase tracking-[0.2em] text-white/30 pb-2">
                {profileData.projects.length} Projects
              </p>
            </div>

            <div className="space-y-6 md:space-y-10">
              {profileData.projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  {...({
                    initial: { y: 60, opacity: 0 },
                    whileInView: { y: 0, opacity: 1 },
                    viewport: { once: true },
                    transition: { duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }
                  } as any)}
                  className="group relative"
                >
                  <div className={`grid grid-cols-1 ${idx % 2 === 0 ? 'md:grid-cols-[1.2fr_1fr]' : 'md:grid-cols-[1fr_1.2fr]'} gap-0 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-700 bg-zinc-900/80 backdrop-blur-sm`}>
                    {/* Image Side */}
                    <div className={`relative aspect-[16/10] md:aspect-auto md:min-h-[420px] overflow-hidden ${idx % 2 !== 0 ? 'md:order-2' : ''} min-h-[200px]`}>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[70%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                      />
                      <div className={`absolute inset-0 ${idx % 2 === 0 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-zinc-900/60 via-transparent to-transparent`}></div>
                      {/* Floating number badge */}
                      <div className="absolute top-6 left-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-black/30">
                        <span className="mono-font text-sm font-bold text-white/80">0{idx + 1}</span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className={`flex flex-col justify-between p-5 md:p-12 ${idx % 2 !== 0 ? 'md:order-1' : ''}`}>
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                          <span className="mono-font text-[10px] uppercase tracking-[0.3em] text-white/40">Project 0{idx + 1}</span>
                        </div>

                        <h3 className="heading-font text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-3 md:mb-4 group-hover:translate-x-2 transition-transform duration-500">
                          {project.title}
                        </h3>

                        <p className="text-white/50 text-sm md:text-base leading-relaxed mb-4 md:mb-8 max-w-md">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
                          {project.tags.map(tag => (
                            <span key={tag} className="mono-font text-[10px] uppercase font-bold px-3 py-1.5 border border-white/15 text-white/60 rounded-full hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/20 text-white/70 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
                          >
                            <Github size={16} />
                            <span className="mono-font text-[11px] uppercase tracking-wider">Source</span>
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white text-black hover:bg-indigo-500 hover:text-white transition-all duration-300"
                          >
                            <span className="mono-font text-[11px] uppercase tracking-wider font-bold">Live Demo</span>
                            <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Decorative gradient line at bottom */}
                  <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-all duration-1000 mt-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Skills Section */}
        <section className="py-16 md:py-40 relative">
          <div className="max-w-[1400px] mx-auto px-4 md:px-12">
            <div className="mb-10 md:mb-20">
              <h2 className="heading-font text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Ski<span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>lls</span> <br />

              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
              {/* Programming Languages */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0 }
                } as any)}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                  <span className="mono-font text-xs uppercase tracking-[0.2em] text-white/60">Programming Languages</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.filter(s => s.category === 'Programming Languages').map(skill => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Frontend */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0.05 }
                } as any)}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="mono-font text-xs uppercase tracking-[0.2em] text-white/60">Frontend</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.filter(s => s.category === 'Frontend').map(skill => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Backend */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0.1 }
                } as any)}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="mono-font text-xs uppercase tracking-[0.2em] text-white/60">Backend</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.filter(s => s.category === 'Backend').map(skill => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Databases */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0.15 }
                } as any)}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="mono-font text-xs uppercase tracking-[0.2em] text-white/60">Databases</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.filter(s => s.category === 'Databases').map(skill => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Machine Learning */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0.2 }
                } as any)}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                  <span className="mono-font text-xs uppercase tracking-[0.2em] text-white/60">Machine Learning</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.filter(s => s.category === 'Machine Learning').map(skill => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0.25 }
                } as any)}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="mono-font text-xs uppercase tracking-[0.2em] text-white/60">Tools</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.filter(s => s.category === 'Tools').map(skill => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Computer Fundamentals */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0.3 }
                } as any)}
                className="space-y-6 md:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                  <span className="mono-font text-xs uppercase tracking-[0.2em] text-white/60">Computer Fundamentals</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.filter(s => s.category === 'Computer Fundamentals').map(skill => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 md:py-40 bg-white text-black rounded-[1.5rem] md:rounded-[5rem]">
          <div className="max-w-[1400px] mx-auto px-4 md:px-12">
            <div className="mb-10 md:mb-20">
              <h2 className="heading-font text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Key <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>Achievements.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Achievement 1 */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0 }
                } as any)}
                className="group p-5 md:p-8 border border-black/10 rounded-2xl hover:bg-black hover:text-white transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="mono-font text-2xl md:text-4xl font-bold text-black/20 group-hover:text-white/20 transition-colors">01</span>
                  <div className="flex-1">
                    <h3 className="heading-font text-xl md:text-2xl font-bold uppercase mb-4">Best Oral Paper Award</h3>
                    <p className="mono-font text-xs uppercase tracking-wider text-black/50 group-hover:text-white/50 mb-4">International Conference, Singapore</p>
                    <p className="text-black/70 group-hover:text-white/70 leading-relaxed">
                      Presented a machine-learning–based research paper and received the award for technical depth and future adoption potential.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Achievement 2 */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0.1 }
                } as any)}
                className="group p-5 md:p-8 border border-black/10 rounded-2xl hover:bg-black hover:text-white transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="mono-font text-2xl md:text-4xl font-bold text-black/20 group-hover:text-white/20 transition-colors">02</span>
                  <div className="flex-1">
                    <h3 className="heading-font text-xl md:text-2xl font-bold uppercase mb-4">Runner-Up – Incubate</h3>
                    <p className="mono-font text-xs uppercase tracking-wider text-black/50 group-hover:text-white/50 mb-4">The Idea Pitching Challenge</p>
                    <p className="text-black/70 group-hover:text-white/70 leading-relaxed">
                      Developed and pitched a technology-driven solution evaluated by industry experts; ranked 2nd among 100 teams.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Achievement 3 */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0.2 }
                } as any)}
                className="group p-5 md:p-8 border border-black/10 rounded-2xl hover:bg-black hover:text-white transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="mono-font text-2xl md:text-4xl font-bold text-black/20 group-hover:text-white/20 transition-colors">03</span>
                  <div className="flex-1">
                    <h3 className="heading-font text-xl md:text-2xl font-bold uppercase mb-4">TATA Crucible Cluster Finalist</h3>
                    <p className="mono-font text-xs uppercase tracking-wider text-black/50 group-hover:text-white/50 mb-4">Business Quiz Competition</p>
                    <p className="text-black/70 group-hover:text-white/70 leading-relaxed">
                      Advanced to the cluster finals by clearing 4 all-India rounds focused on business strategy and General Knowledge.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Achievement 4 */}
              <motion.div
                {...({
                  initial: { y: 40, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, delay: 0.3 }
                } as any)}
                className="group p-5 md:p-8 border border-black/10 rounded-2xl hover:bg-black hover:text-white transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="mono-font text-2xl md:text-4xl font-bold text-black/20 group-hover:text-white/20 transition-colors">04</span>
                  <div className="flex-1">
                    <h3 className="heading-font text-xl md:text-2xl font-bold uppercase mb-4">Special Mention Award</h3>
                    <p className="mono-font text-xs uppercase tracking-wider text-black/50 group-hover:text-white/50 mb-4">SRM University</p>
                    <p className="text-black/70 group-hover:text-white/70 leading-relaxed">
                      Recognized for innovative approach and execution in a university-level technical competition.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 md:py-40 relative">
          <div className="max-w-[1400px] mx-auto px-4 md:px-12">
            <div className="mb-10 md:mb-20">
              <h2 className="heading-font text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Certifi<span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>cations.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profileData.certificates.map((certificate, idx) => (
                <motion.div
                  key={certificate.id}
                  {...({
                    initial: { y: 40, opacity: 0 },
                    whileInView: { y: 0, opacity: 1 },
                    viewport: { once: true },
                    transition: { duration: 0.8, delay: idx * 0.1 }
                  } as any)}
                  className="group overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 bg-zinc-900"
                >
                  {/* Certificate Image */}
                  <div className="aspect-[16/10] bg-zinc-800 overflow-hidden">
                    <img
                      src={certificate.imageUrl}
                      alt={certificate.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  {/* Certificate Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="mono-font text-xs font-bold text-white/40">0{idx + 1}</span>
                      <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    <h3 className="heading-font text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight text-white">{certificate.title}</h3>
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs border-b-2 border-white pb-1 hover:gap-4 transition-all"
                    >
                      Verify <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Experience Section 
        <section id="experience" className="py-40 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-24 flex items-end gap-12">
              <h2 className="heading-font text-5xl md:text-8xl font-bold uppercase tracking-tighter">The Journey.</h2>
              <p className="mono-font text-[11px] uppercase text-secondary pb-4 hidden sm:block">Timeline / Experience</p>
            </div>

            <div className="border-t border-white/10">
              {profileData.experience.map((exp) => (
                <div 
                  key={exp.id} 
                  onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
                  className="group border-b border-white/10 py-12 md:py-20 hover:bg-white/[0.02] transition-colors cursor-pointer relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-8 relative z-10">
                    <div className="md:col-span-2 mono-font text-xs text-secondary mt-1">{exp.period}</div>
                    <div className="md:col-span-5 flex flex-col">
                      <h3 className="heading-font text-2xl md:text-4xl font-bold uppercase group-hover:translate-x-4 transition-transform duration-500">{exp.position}</h3>
                      <span className="mono-font text-[11px] font-bold text-indigo-400 uppercase mt-2">{exp.company}</span>
                    </div>
                    <div className="md:col-span-5 flex flex-col gap-6">
                      <p className="text-secondary text-sm leading-relaxed max-w-sm">
                        {exp.description[0]}
                      </p>
                      
                      <AnimatePresence>
                        {expandedExp === exp.id && (
                          <motion.div
                            {...({
                              initial: { height: 0, opacity: 0 },
                              animate: { height: 'auto', opacity: 1 },
                              exit: { height: 0, opacity: 0 },
                              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                            } as any)}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-4 pt-4 border-t border-white/10">
                              {exp.description.slice(1).map((bullet, i) => (
                                <li key={i} className="text-secondary text-sm leading-relaxed flex gap-3">
                                  <span className="text-white/20">—</span> {bullet}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map(s => (
                          <span key={s} className="text-[10px] font-bold text-slate-500 border border-slate-800 px-2 py-1 rounded-md">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 right-12 -translate-y-1/2 transition-all duration-500 hidden md:block">
                    {expandedExp === exp.id ? (
                      <Minus className="text-indigo-500" size={40} />
                    ) : (
                      <Plus className="text-white/20 group-hover:text-white group-hover:rotate-90 transition-all duration-500" size={40} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        */}
        {/* Technical Matrix */}

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-40 bg-zinc-900 rounded-t-[1.5rem] md:rounded-t-[5rem] relative overflow-hidden">
          {/* Background decorative text */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] flex items-center justify-center">
            <span className="heading-font text-[40vw] font-bold uppercase tracking-tighter select-none">Contact</span>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
              <div className="flex flex-col justify-between">
                <div>
                  <p className="mono-font text-xs uppercase tracking-widest text-white/40 mb-6">Get in touch</p>
                  <h2 className="heading-font text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-6 md:mb-8">
                    Let's <br />
                    <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Talk.</span>
                  </h2>
                  <p className="text-white/60 text-base md:text-lg max-w-md leading-relaxed mb-8 md:mb-12">
                    Have a project in mind or just want to connect? Feel free to reach out!
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Email */}
                  <a
                    href={`mailto:${profileData.email}`}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                      <Mail size={20} className="group-hover:text-white" />
                    </div>
                    <div>
                      <span className="mono-font text-[10px] uppercase text-white/40 block">Email</span>
                      <span className="text-white group-hover:text-indigo-400 transition-colors">{profileData.email}</span>
                    </div>
                  </a>

                  {/* Social Links */}
                  <div className="flex gap-4">
                    <a
                      href={profileData.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white transition-all duration-300"
                    >
                      <Github size={22} className="text-white group-hover:text-black transition-colors" />
                    </a>
                    <a
                      href={profileData.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white transition-all duration-300"
                    >
                      <Linkedin size={22} className="text-white group-hover:text-black transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form - Commented out for now (needs backend service like Web3Forms/Formspree to actually send emails)
              <div className="glass-panel p-8 md:p-12 rounded-[2rem]">
                <ContactForm recipientEmail={profileData.email} />
              </div>
              */}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 py-8 md:py-12 px-4 md:px-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="heading-font text-xl font-bold tracking-tighter uppercase">{profileData.name.split(' ')[0]}</span>
            <span className="text-white/20">|</span>
            <span className="mono-font text-[10px] uppercase tracking-widest text-white/40">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Github size={18} />
            </a>
            <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${profileData.email}`} className="text-white/40 hover:text-white transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* <ChatBot />*/}
    </div>
  );
};

export default App;
