import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiCode, FiBookOpen, FiAward, FiDownload } from 'react-icons/fi';
import { SiPython, SiReact, SiFigma, SiOpencv, SiGit } from 'react-icons/si';
import { TiltCard, MagneticButton, SignalDot } from '../hooks/useInteractive';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  const cards = [
    { icon: <FiCode size={20} />, title: 'Languages', desc: 'Python, HTML, CSS, React, JS' },
    { icon: <FiBookOpen size={20} />, title: 'Education', desc: 'B.Tech AI & Data Science' },
    { icon: <FiAward size={20} />, title: 'Projects', desc: '2+ Real-World AI Projects' },
  ];

  const tools = [
    { icon: <SiPython size={24} />, title: 'Python' },
    { icon: <SiReact size={24} />, title: 'React' },
    { icon: <SiFigma size={24} />, title: 'Figma' },
    { icon: <SiOpencv size={24} />, title: 'OpenCV' },
    { icon: <SiGit size={24} />, title: 'Git' },
  ];

  const eyebrowText = 'SYSTEM INFO';
  const titleWords = ['About', 'Me'];

  useGSAP(() => {
    // Eyebrow — letter-by-letter reveal
    gsap.fromTo('.about-eyebrow-char',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
    // Title — word-by-word swipe-up reveal (clipped)
    gsap.fromTo('.about-title-word',
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, stagger: 0.12, ease: 'expo.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
    // Bio — clip-path swipe reveal left to right
    gsap.fromTo('.about-bio',
      { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1, delay: 0.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
    // Cards — pop in with slight rotation
    gsap.fromTo('.about-card',
      { opacity: 0, y: 32, rotate: -2, scale: 0.95 },
      { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.about-card-grid', start: 'top 85%' } }
    );
    // Tools — bouncy scale-in
    gsap.fromTo('.about-tool',
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.45, stagger: 0.07, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.about-tool-row', start: 'top 90%' } }
    );
    // Education rows — slide in with skew settle
    gsap.fromTo('.about-edu',
      { opacity: 0, x: -24, skewX: 4 },
      { opacity: 1, x: 0, skewX: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-edu-grid', start: 'top 88%' } }
    );
    gsap.fromTo('.about-cta',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-cta', start: 'top 92%' } }
    );
  }, { scope: containerRef });

  return (
    <div id="about" ref={containerRef} className="relative w-full min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide py-20 px-6 md:px-12">

      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img src="/src/assets/backgrounds/dark-cloth-bg.png" alt="" className="w-full h-full object-cover" style={{ transform: 'scale(1.05)' }} />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(circle at 75% 50%, transparent 20%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Left image */}
      <div className="absolute inset-y-0 left-0 w-[45%] z-10 pointer-events-none overflow-hidden hidden lg:block" style={{ WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)' }}>
        <img src="/src/assets/hero-video/ezgif-frame-240.jpg" alt="About" className="w-full h-full object-cover" />
      </div>

      {/* Pulsing red blob */}
      <div className="absolute top-1/3 left-[30%] w-[300px] h-[300px] bg-[#ff2a2a]/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />

      {/* Content */}
      <div className="relative z-[50] w-full lg:w-[80%] flex flex-col md:flex-row items-center justify-end">
        <div className="hidden lg:block w-[35%]" />

        <div className="w-full lg:w-[65%] flex flex-col space-y-10 bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/5 rounded-2xl">

          {/* Header */}
          <div className="space-y-2">
            <p className="about-eyebrow text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em] flex">
              {eyebrowText.split('').map((ch, i) => (
                <span key={i} className="about-eyebrow-char inline-block" style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}>{ch}</span>
              ))}
            </p>
            <h2 className="about-title text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase flex flex-wrap gap-x-4">
              {titleWords.map((word, i) => (
                <span key={i} className="overflow-hidden inline-block pb-1">
                  <span className="about-title-word inline-block">{word}{i === titleWords.length - 1 && <span className="text-[#ff2a2a]">.</span>}</span>
                </span>
              ))}
            </h2>
          </div>

          {/* Bio */}
          <p className="about-bio text-gray-400 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-2xl">
            I am a passionate <span className="text-white font-medium">Software Developer</span> specializing in AI & Data Science. B.Tech (2025) graduate from Panimalar Institute of Technology, Chennai with a GPA of 8.14. Experienced in machine learning, computer vision, and building user-centric web applications.
          </p>

          {/* Cards — tilt + spotlight on hover + idle breathing glow */}
          <div className="about-card-grid grid grid-cols-1 sm:grid-cols-3 gap-6">
            {cards.map((item, i) => (
              <TiltCard
                key={item.title}
                maxTilt={8}
                className="about-card group relative p-6 bg-white/5 border border-white/10 hover:border-[#ff2a2a]/40 transition-all duration-300 rounded-xl overflow-hidden"
              >
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 bg-[#ff2a2a]/10 rounded-full blur-2xl pointer-events-none animate-pulse"
                  style={{ animationDuration: `${3 + i * 0.4}s` }}
                />
                <SignalDot className="absolute top-3 right-3 z-10" />
                <div className="relative text-[#ff2a2a] mb-4 opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                <h4 className="relative text-white text-xs font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                <p className="relative text-gray-500 text-[11px] leading-relaxed">{item.desc}</p>
              </TiltCard>
            ))}
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">Core Tech Stack</h4>
            <div className="about-tool-row flex flex-wrap gap-5">
              {tools.map((tool) => (
                <div key={tool.title} className="about-tool group relative p-4 bg-black/50 border border-white/5 hover:border-[#ff2a2a]/50 hover:scale-110 hover:-translate-y-1 transition-all rounded-xl flex items-center justify-center cursor-help">
                  <SignalDot className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-gray-500 group-hover:text-[#ff2a2a] transition-colors">{tool.icon}</div>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#ff2a2a] text-white text-[9px] font-mono py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all pointer-events-none z-[70] whitespace-nowrap shadow-xl">
                    {tool.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Internship */}
          <div className="about-edu-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="about-edu border-l-2 border-[#ff2a2a] pl-5 relative"><SignalDot className="absolute -top-1 -left-[5px]" />
              <p className="text-[#ff2a2a] text-[10px] uppercase tracking-[3px] mb-1">2021 — 2025</p>
              <p className="text-white text-[14px] font-semibold">B.Tech — AI & Data Science</p>
              <p className="text-gray-500 text-[12px]">Panimalar Institute of Technology</p>
              <p className="text-gray-600 text-[11px] mt-1">GPA: 8.14</p>
            </div>
            <div className="about-edu border-l-2 border-[rgba(255,42,42,0.3)] pl-5 relative"><SignalDot className="absolute -top-1 -left-[5px] opacity-40" />
              <p className="text-[#ff2a2a] text-[10px] uppercase tracking-[3px] mb-1">Jul — Aug 2023</p>
              <p className="text-white text-[14px] font-semibold">Web Development Intern</p>
              <p className="text-gray-500 text-[12px]">Trios Technologies</p>
              <p className="text-gray-600 text-[11px] mt-1">HTML · CSS · Git · UI Optimization</p>
            </div>
          </div>

          {/* CTA */}
          <div className="about-cta pt-2">
            <MagneticButton
              as="a"
              href="/KarthikeyanResume.pdf"
              download
              strength={0.3}
              className="inline-flex items-center gap-4 px-10 py-4 bg-[#ff2a2a] text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all duration-300 rounded-full shadow-lg shadow-red-900/20"
            >
              <span>Download Resume</span>
              <FiDownload size={16} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}