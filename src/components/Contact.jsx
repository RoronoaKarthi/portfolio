import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiSend, FiActivity, FiShield, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { CursorAura, MagneticButton, TiltCard, SignalDot } from '../hooks/useInteractive';

gsap.registerPlugin(ScrollTrigger);

const punch = (el) => {
  if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  gsap.fromTo(el, { scale: 0.94 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
};

export default function Contact() {
  const formRef = useRef();
  const containerRef = useRef(null);
  const successRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
      formRef.current.reset();
    }, 1500);
  };

  // Animate the transmission-complete banner in with a quick scale + glow pop
  useEffect(() => {
    if (sent && successRef.current && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(successRef.current,
        { opacity: 0, scale: 0.92, y: -8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2.5)' }
      );
    }
  }, [sent]);

  useGSAP(() => {
    gsap.fromTo('.comm-eyebrow, .comm-protocol',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
    // Title — glitchy jitter-in per character
    gsap.fromTo('.comm-title-char',
      { opacity: 0, y: () => gsap.utils.random(-30, 30), x: () => gsap.utils.random(-15, 15), rotate: () => gsap.utils.random(-25, 25) },
      { opacity: 1, y: 0, x: 0, rotate: 0, duration: 0.5, stagger: 0.04, ease: 'power4.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
    gsap.fromTo('.comm-form-panel',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.comm-form-panel', start: 'top 85%' } }
    );
    gsap.fromTo('.comm-info-block',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.comm-info-block', start: 'top 88%' } }
    );
    gsap.fromTo('.comm-row',
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.comm-info-block', start: 'top 85%' } }
    );
  }, { scope: containerRef });

  const socials = [
    { name: 'GitHub', url: 'https://github.com/RoronoaKarthi', handle: '@RoronoaKarthi' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/karthikeyan-prakash', handle: 'karthikeyan-prakash' },
    { name: 'Credly', url: 'https://www.credly.com/users/karthikeyan-prakash.59976f77', handle: 'karthikeyan-prakash' },
  ];

  const titleChars = 'COMM.LINK'.split('');

  return (
    <section id="contact" ref={containerRef} className="relative w-full min-h-screen bg-[#020202] overflow-hidden font-mono pt-36 pb-24 px-6 md:px-12 lg:px-24">

      {/* Cursor-follow ambient glow */}
      <CursorAura size={460} color="rgba(255,42,42,0.07)" />

      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img src="/src/assets/backgrounds/dark-cloth-bg.png" alt="" className="w-full h-full object-cover" style={{ transform: 'scale(1.05)' }} />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff2a2a]/5 blur-[150px] rounded-full pointer-events-none z-[1]" />

      {/* HUD corners */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-[#ff2a2a]/20 pointer-events-none" />
      <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-[#ff2a2a]/20 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-[#ff2a2a]/20 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-[#ff2a2a]/20 pointer-events-none" />

      {/* Top HUD */}
      <div className="absolute top-12 left-16 flex items-center gap-2 pointer-events-none">
        <FiActivity className="text-[#ff2a2a] text-xs animate-pulse" />
      </div>
      <div className="absolute top-12 right-16 flex items-center gap-2 pointer-events-none">
        <FiShield className="text-[#ff2a2a]/40 text-xs animate-pulse" style={{ animationDuration: '2.6s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="comm-eyebrow text-[#ff2a2a] text-[10px] uppercase tracking-[0.5em] mb-4">ESTABLISH CONNECTION</p>
          <h2 className="comm-title text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none">
            {titleChars.map((ch, i) => (
              <span key={i} className={`comm-title-char inline-block ${i >= 4 ? 'text-[#ff2a2a]' : ''}`}>{ch}</span>
            ))}
          </h2>
          <div className="comm-protocol flex items-center justify-center gap-2 text-[#ff2a2a]/50 text-[9px] tracking-[0.6em] uppercase mt-4">
            <FiShield size={10} />
            <span>Protocol: Neural_Gate</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Form */}
          <div className="comm-form-panel bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 md:p-12 relative group overflow-hidden transition-all duration-300 hover:scale-[1.015] active:scale-[0.99]" style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <div className="absolute -top-16 -left-16 w-56 h-56 bg-[#ff2a2a]/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
            <SignalDot className="absolute top-4 right-4 z-10" />
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#ff2a2a]/40" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#ff2a2a]/40" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#ff2a2a]/40" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#ff2a2a]/40" />

            {sent && (
              <div ref={successRef} className="relative z-10 mb-6 border border-[#ff2a2a]/40 bg-[#ff2a2a]/5 p-4 text-center">
                <p className="text-[#ff2a2a] text-[11px] uppercase tracking-[0.4em]">TRANSMISSION_COMPLETE 🚀</p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group/field">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#ff2a2a]/50 block transition-all duration-300 group-focus-within/field:text-[#ff2a2a] group-focus-within/field:tracking-[0.45em]">IDENT_SIGNATURE</label>
                  <input name="name" type="text" placeholder="ENTER_NAME" required
                    className="w-full bg-white/5 border-b border-white/10 py-4 px-4 text-white text-[11px] outline-none focus:border-[#ff2a2a] focus:bg-white/[0.07] transition-all placeholder:text-gray-700 font-mono" />
                </div>
                <div className="space-y-2 group/field">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#ff2a2a]/50 block transition-all duration-300 group-focus-within/field:text-[#ff2a2a] group-focus-within/field:tracking-[0.45em]">COMM_PATH_ADDR</label>
                  <input name="email" type="email" placeholder="ENTER_EMAIL" required
                    className="w-full bg-white/5 border-b border-white/10 py-4 px-4 text-white text-[11px] outline-none focus:border-[#ff2a2a] focus:bg-white/[0.07] transition-all placeholder:text-gray-700 font-mono" />
                </div>
              </div>
              <div className="space-y-2 group/field">
                <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-[#ff2a2a]/50 block transition-all duration-300 group-focus-within/field:text-[#ff2a2a] group-focus-within/field:tracking-[0.45em]">DATA_PAYLOAD</label>
                <textarea name="message" placeholder="INPUT_TRANSMISSION..." required
                  className="w-full bg-white/5 border-b border-white/10 py-4 px-4 text-white text-[11px] outline-none focus:border-[#ff2a2a] focus:bg-white/[0.07] transition-all min-h-[140px] resize-none placeholder:text-gray-700 font-mono" />
              </div>
              <div className="flex justify-end">
                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={sending}
                  strength={0.25}
                  onClick={(e) => punch(e.currentTarget)}
                  className="flex items-center gap-4 bg-[#ff2a2a] text-white font-black text-[11px] uppercase tracking-[0.5em] px-12 py-5 hover:bg-red-700 transition-all duration-300 shadow-[0_0_30px_rgba(255,42,42,0.2)] disabled:opacity-50"
                >
                  <span>{sending ? 'TRANSMITTING...' : 'TRANSMIT'}</span>
                  <FiSend className={sending ? 'animate-pulse' : ''} />
                </MagneticButton>
              </div>
            </form>
          </div>

          {/* Right Info */}
          <div className="space-y-10">

            {/* Direct Contact */}
            <div className="comm-info-block space-y-6">
              <p className="text-[#ff2a2a] text-[10px] uppercase tracking-[0.5em] font-mono">Direct Contact</p>
              {[
                { icon: <FiMail />, label: 'Email', value: 'karthickprakash2004@gmail.com', href: 'mailto:karthickprakash2004@gmail.com' },
                { icon: <FiPhone />, label: 'Phone', value: '+91 9361939941', href: 'tel:9361939941' },
                { icon: <FiMapPin />, label: 'Location', value: 'Tiruvannamalai, India', href: null },
              ].map((item) => (
                <MagneticButton
                  key={item.label}
                  as="div"
                  strength={item.href ? 0.15 : 0}
                  className="comm-row group relative flex items-center gap-5 border-b border-white/5 pb-5 hover:border-[#ff2a2a]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <SignalDot className="absolute -top-1 right-0 z-10 scale-75" />
                  <span className="text-[#ff2a2a] text-lg">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-gray-600 text-[9px] uppercase tracking-[2px] mb-1">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="text-white text-[13px] hover:text-[#ff2a2a] transition-colors">{item.value}</a>
                      : <p className="text-white text-[13px]">{item.value}</p>
                    }
                  </div>
                  {item.href && <span className="text-gray-700 group-hover:text-[#ff2a2a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">↗</span>}
                </MagneticButton>
              ))}
            </div>

            {/* Socials */}
            <div className="comm-info-block space-y-5">
              <p className="text-[#ff2a2a] text-[10px] uppercase tracking-[0.5em] font-mono">Find Me Online</p>
              {socials.map((s) => (
                <MagneticButton
                  key={s.name}
                  as="a"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.2}
                  onClick={(e) => punch(e.currentTarget)}
                  className="comm-row group relative flex items-center justify-between border-b border-white/5 pb-5 hover:border-[#ff2a2a]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <SignalDot className="absolute -top-1 right-0 z-10 scale-75" />
                  <div>
                    <p className="text-gray-600 text-[9px] uppercase tracking-[2px] mb-1">{s.name}</p>
                    <p className="text-white text-[13px] group-hover:text-[#ff2a2a] transition-colors">{s.handle}</p>
                  </div>
                  <span className="text-gray-700 group-hover:text-[#ff2a2a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-lg">↗</span>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
