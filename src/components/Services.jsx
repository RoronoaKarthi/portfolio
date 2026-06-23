import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiLayout, FiZap, FiCloud, FiCpu, FiPenTool, FiBox, FiArrowRight } from 'react-icons/fi';
import { TiltCard, MagneticButton, SignalDot } from '../hooks/useInteractive';

gsap.registerPlugin(ScrollTrigger);

const punch = (el) => {
  if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  gsap.fromTo(el, { scale: 0.94 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
};

export default function Services() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const sidebarRef = useRef(null);

  const services = [
    { icon: <FiLayout size={24} />, title: 'Web Development', desc: 'Building responsive, modern web applications with clean UI and optimized performance using React and Tailwind CSS.' },
    { icon: <FiCpu size={24} />, title: 'AI & Machine Learning', desc: 'Developing intelligent solutions using computer vision, predictive analytics and ML fundamentals for real-world problems.' },
    { icon: <FiZap size={24} />, title: 'Prompt Engineering', desc: 'Crafting precise prompts for AI models to generate optimal outputs for business and creative applications.' },
    { icon: <FiPenTool size={24} />, title: 'UI/UX Design', desc: 'Designing intuitive and visually compelling interfaces using Figma — from wireframes to polished prototypes.' },
    { icon: <FiCloud size={24} />, title: 'Cloud Services', desc: 'Deploying and managing scalable cloud-based solutions with best practices for reliable production environments.' },
    { icon: <FiBox size={24} />, title: '3D & Creative', desc: 'Creating 3D models and visual assets using Blender for digital projects and creative storytelling.' },
  ];

  const titleChars = 'My Services'.split('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-eyebrow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );
      // Title — character-by-character reveal with slight rotation settle
      gsap.fromTo('.svc-title-char',
        { opacity: 0, y: 24, rotateX: -60 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.02, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );
      // Divider line — wipe in from center
      gsap.fromTo('.svc-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, delay: 0.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo('.svc-subtext',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );
      // Cards — flip-in on Y axis
      gsap.fromTo('.svc-card',
        { opacity: 0, y: 40, rotateY: -15, scale: 0.9 },
        { opacity: 1, y: 0, rotateY: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-grid', start: 'top 80%' }
        }
      );
      gsap.fromTo(sidebarRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sidebarRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo('.corner-line',
        { scale: 0 },
        { scale: 1, duration: 0.3, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: sidebarRef.current, start: 'top 80%' }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative pt-36 pb-24 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img src="/src/assets/backgrounds/dark-cloth-bg.png" alt="" className="w-full h-full object-cover" style={{ transform: 'scale(1.05)' }} />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-[#ff2a2a]/5 blur-[120px] rounded-full pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20" style={{ perspective: '800px' }}>
          <div className="svc-eyebrow inline-block px-3 py-1 border border-[#ff2a2a]/30 bg-[#ff2a2a]/5 mb-4">
            <p className="text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em]">SERVICES MODULE</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            {titleChars.map((ch, i) => (
              <span key={i} className="svc-title-char inline-block" style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}>{ch}</span>
            ))}
            <span className="svc-title-char text-[#ff2a2a] inline-block">.</span>
          </h2>
          <div className="svc-divider w-24 h-[1px] bg-[#ff2a2a]/40 mx-auto mb-8" />
          <p className="svc-subtext max-w-2xl mx-auto text-gray-500 font-light text-base leading-relaxed">
            From AI-powered solutions to sleek UI design — building scalable, user-centric digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Services Grid */}
          <div className="svc-grid lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
            {services.map((s, i) => (
              <TiltCard
                key={s.title}
                maxTilt={6}
                className="svc-card group relative p-8 bg-[#0a0a0a] border border-white/[0.05] hover:border-[#ff2a2a]/30 hover:shadow-[0_0_30px_rgba(255,42,42,0.05)] transition-all duration-300 cursor-default flex flex-col overflow-hidden hover:scale-[1.04] active:scale-[0.97]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <div
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#ff2a2a]/10 rounded-full blur-2xl pointer-events-none animate-pulse"
                  style={{ animationDuration: `${3.5 + i * 0.3}s` }}
                />
                <SignalDot className="absolute top-3 right-3 z-10" />
                <div className="relative mb-6 p-4 bg-white/5 border border-white/10 w-fit rounded-sm text-gray-400 group-hover:text-[#ff2a2a] group-hover:border-[#ff2a2a]/20 transition-all">
                  {s.icon}
                </div>
                <h3 className="relative text-lg font-bold text-white mb-3 tracking-tight uppercase">{s.title}</h3>
                <p className="relative text-gray-500 font-light text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
                <button
                  onClick={(e) => punch(e.currentTarget)}
                  className="relative flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600 hover:text-[#ff2a2a] group/btn transition-colors w-fit"
                >
                  <span>Learn More</span>
                  <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </TiltCard>
            ))}
          </div>

          {/* Sidebar */}
          <div ref={sidebarRef} className="lg:col-span-4">
            <div className="sticky top-32 p-10 bg-[#0c0c0c] border border-white/[0.06] relative overflow-hidden group transition-all duration-300 hover:scale-[1.015] active:scale-[0.99]" style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>

              {/* Corner Lines */}
              <div className="corner-line absolute top-2 left-2 w-4 h-4 border-t border-l border-[#ff2a2a]/50" />
              <div className="corner-line absolute top-2 right-2 w-4 h-4 border-t border-r border-[#ff2a2a]/50" />
              <div className="corner-line absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#ff2a2a]/50" />
              <div className="corner-line absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#ff2a2a]/50" />

              <SignalDot className="absolute top-4 right-4 z-10" />

              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ff2a2a]/5 blur-[80px] group-hover:bg-[#ff2a2a]/10 transition-all duration-1000 animate-pulse" style={{ animationDuration: '4s' }} />

              <div className="relative z-10 space-y-8">
                <div>
                  <p className="text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em] mb-3">INTERNSHIP</p>
                  <h3 className="text-white text-xl font-black uppercase tracking-tight">Trios Technologies</h3>
                  <p className="text-gray-600 text-[11px] font-mono tracking-widest mt-1">Jul 2023 — Aug 2023</p>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  Developed and maintained responsive web pages, collaborated on frontend features, debugged UI issues, and followed best practices for clean code and version control.
                </p>

                <div className="space-y-3">
                  {['HTML & CSS', 'Responsive Design', 'Git & Version Control', 'UI Optimization', 'Frontend Dev'].map((skill) => (
                    <div key={skill} className="flex items-center gap-3 text-[11px] text-gray-500 font-mono uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 bg-[#ff2a2a] rounded-full" />
                      {skill}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-[#ff2a2a] text-[10px] font-mono uppercase tracking-[0.5em] mb-2">GPA</p>
                  <p className="text-white text-4xl font-black">8.14</p>
                  <p className="text-gray-600 text-[11px] font-mono tracking-widest">Panimalar Institute of Technology</p>
                </div>

                <MagneticButton
                  as="a"
                  href="/KarthikeyanResume.pdf"
                  download
                  strength={0.25}
                  onClick={(e) => punch(e.currentTarget)}
                  className="block w-full py-4 border border-[#ff2a2a]/30 text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-[#ff2a2a] hover:text-white hover:border-[#ff2a2a] transition-all duration-300 text-center"
                >
                  Download Resume
                </MagneticButton>
              </div>
            </div>
            <div className="mt-4 flex justify-between font-mono text-[9px] text-gray-700 tracking-[0.2em] px-2 opacity-50">
              <span>&gt; MODULE ACTIVE</span>
              <span>0x034FB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.03]" />
    </section>
  );
}
