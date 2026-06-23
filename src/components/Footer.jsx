import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiGithub, FiTwitter, FiLinkedin, FiCpu, FiShield, FiActivity, FiArrowUpRight } from 'react-icons/fi';
import { MagneticButton } from '../hooks/useInteractive';

gsap.registerPlugin(ScrollTrigger);

const punch = (el) => {
  if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  gsap.fromTo(el, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
};

export default function Footer() {
  const [systemTime, setSystemTime] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.footer-col',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );
    gsap.fromTo('.footer-bottom',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%' } }
    );
  }, { scope: containerRef });

  const socials = [
    { icon: <FiGithub />, label: 'GITHUB', url: 'https://github.com/RoronoaKarthi' },
    { icon: <FiTwitter />, label: 'TWITTER', url: '#' },
    { icon: <FiLinkedin />, label: 'LINKEDIN', url: 'https://www.linkedin.com/in/karthikeyan-prakash' },
  ];

  const navLinks = ['About', 'Work', 'Services', 'Contact'];

  return (
    <footer ref={containerRef} className="relative w-full bg-[#050505] overflow-hidden pt-20 pb-10 font-sans">

      {/* Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#ff2a2a]/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ff2a2a]/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />

      {/* Animated top beam */}
      <div className="relative w-full h-[1px] bg-white/5 mb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-transparent via-[#ff2a2a] to-transparent shadow-[0_0_15px_rgba(255,42,42,0.5)] animate-[beam_4s_linear_infinite]" />
      </div>
      <style>{`
        @keyframes beam {
          from { transform: translateX(-100%); }
          to { transform: translateX(700%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand */}
          <div className="footer-col space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-[#ff2a2a]/10 border border-[#ff2a2a]/20 flex items-center justify-center group-hover:bg-[#ff2a2a] transition-all duration-500">
                <FiCpu className="text-[#ff2a2a] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase">
                KARTHIK<span className="text-[#ff2a2a]">°</span>
              </h3>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed uppercase tracking-widest font-light">
              Building bold ideas that inspire action through AI, code, and design.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">System Status: Online</span>
            </div>
          </div>

          {/* Nav */}
          <div className="footer-col space-y-6">
            <h4 className="text-[11px] font-mono font-bold text-[#ff2a2a]/80 tracking-[0.4em] uppercase">Control_Center</h4>
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} onClick={(e) => punch(e.currentTarget)} className="group flex items-center text-xs text-gray-500 hover:text-white transition-all tracking-widest">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#ff2a2a] mr-0 group-hover:mr-3 transition-all duration-300" />
                    {item.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="footer-col space-y-6">
            <h4 className="text-[11px] font-mono font-bold text-[#ff2a2a]/80 tracking-[0.4em] uppercase">Built_With</h4>
            <div className="flex flex-wrap gap-2">
              {['Vite', 'React', 'GSAP', 'Tailwind', 'Python'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] text-gray-500 tracking-widest hover:border-[#ff2a2a]/30 hover:text-[#ff2a2a] hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 cursor-default inline-block">
                  {tech.toUpperCase()}
                </span>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2 text-[9px] text-gray-600 tracking-widest uppercase">
                <FiShield className="text-[#ff2a2a]/40" />
                <span>karthickprakash2004@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-gray-600 tracking-widest uppercase">
                <FiActivity className="text-[#ff2a2a]/40" />
                <span>+91 9361939941</span>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="footer-col space-y-6">
            <h4 className="text-[11px] font-mono font-bold text-[#ff2a2a]/80 tracking-[0.4em] uppercase">Broadcast_Link</h4>
            <div className="flex gap-4">
              {socials.map((s) => (
                <MagneticButton
                  key={s.label}
                  as="a"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.4}
                  maxOffset={12}
                  onClick={(e) => punch(e.currentTarget)}
                  className="group relative w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-xl text-gray-400 hover:text-[#ff2a2a] hover:border-[#ff2a2a]/40 transition-all duration-300"
                >
                  {s.icon}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#ff2a2a] text-white text-[8px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest font-bold whitespace-nowrap">
                    {s.label}
                  </span>
                </MagneticButton>
              ))}
            </div>
            <MagneticButton
              as="a"
              href="#contact"
              strength={0.2}
              onClick={(e) => punch(e.currentTarget)}
              className="w-full py-4 bg-[#ff2a2a] text-white font-black text-[10px] uppercase tracking-[0.5em] flex items-center justify-center gap-3 group hover:bg-red-700 transition-all duration-300 shadow-[0_10px_30px_rgba(255,42,42,0.2)]"
            >
              <span>Get In Touch</span>
              <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="text-[10px] text-gray-600 tracking-[0.3em] font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff2a2a] rounded-full" />
              KARTHIKEYAN PRAKASH // 2026
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-gray-500 tracking-[0.4em] font-mono uppercase mb-1">
              Local_Time: {systemTime}
            </div>
            <p className="text-[9px] text-gray-700 tracking-[0.2em] font-mono uppercase">
              © 2026 KARTHIK.WEB. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />
    </footer>
  );
}