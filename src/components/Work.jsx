import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { TiltCard, MagneticButton, SignalDot } from '../hooks/useInteractive';

gsap.registerPlugin(ScrollTrigger);

const punch = (el) => {
  if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  gsap.fromTo(el, { scale: 0.94 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
};

const projects = [
  {
    number: '01',
    title: 'Real-Time Weather Forecasting App',
    date: 'Apr 2024',
    description: 'Developed a dynamic weather forecasting application using API-based real-time data retrieval. Designed an intuitive user interface for displaying live weather conditions and forecasts.',
    tags: ['API Integration', 'Data Visualization', 'UI Design', 'Forecasting'],
    link: 'https://github.com/RoronoaKarthi',
    image: 'Weather.png',
    imageLabel: 'WEATHER_SYS_01',
  },
  {
    number: '02',
    title: 'Stolen Vehicle Detection using YOLO',
    date: 'June 2025',
    description: 'Built a computer vision system to detect and track vehicles using YOLO and OpenCV. Integrated license plate recognition using EasyOCR/Tesseract. Implemented real-time database matching with alert generation and evidence logging.',
    tags: ['YOLO', 'OpenCV', 'EasyOCR', 'Python', 'Computer Vision'],
    link: 'https://github.com/RoronoaKarthi',
    image: 'stolen vehicle.png',
    imageLabel: 'VISION_SYS_02',
  },
  {
    number: '03',
    title: 'Interactive Websites',
    date: 'June 2025',
    description: 'Developed modern interactive websites with responsive design, engaging animations, and optimized user experiences using HTML, CSS, JavaScript, and React..',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design', 'UI/UX'],
    link: 'https://github.com/RoronoaKarthi',
    image: 'Web.png',
    imageLabel: 'VISION_SYS_02',
  },
];

const certs = [
  { name: 'Network Essentials', org: 'Cisco', date: 'Jun 2024' },
  { name: 'AI Fundamentals', org: 'IBM Skillbuild', date: 'Mar 2024' },
  { name: 'Cyber Security Fundamentals', org: 'IBM Skillbuild', date: 'Nov 2023' },
  { name: 'Cyber Security', org: 'Coincent', date: 'Oct 2022' },
  { name: 'Cloud Completion', org: 'IBM Skillbuild', date: 'Sep 2022' },
  { name: 'MongoDB Node.js Developer', org: 'MongoDB Inc', date: 'Sep 2024' },
];

export default function Work() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-eyebrow',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: '.work-header', start: 'top 85%' }
        }
      );
      // Title — clip-path swipe reveal, line by line
      gsap.fromTo('.work-title-line',
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: '.work-header', start: 'top 85%' }
        }
      );
      gsap.fromTo('.work-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, delay: 0.3, ease: 'power3.inOut', transformOrigin: 'left center',
          scrollTrigger: { trigger: '.work-header', start: 'top 85%' }
        }
      );
      projects.forEach((_, i) => {
        gsap.fromTo(`.project-card-${i}`,
          { opacity: 0, y: 50, scale: 0.92, rotate: i % 2 === 0 ? -1.5 : 1.5 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: `.project-card-${i}`, start: 'top 85%' }
          }
        );
      });
      gsap.fromTo('.cert-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.cert-grid', start: 'top 85%' }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="relative min-h-screen w-full px-6 md:px-12 lg:px-24 pt-36 pb-24 overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img src="/src/assets/backgrounds/dark-cloth-bg.png" alt="" className="w-full h-full object-cover" style={{ transform: 'scale(1.05)' }} />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-[#ff2a2a]/5 blur-[120px] rounded-full pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="work-header mb-20">
          <div className="inline-block px-3 py-1 border border-[#ff2a2a]/30 bg-[#ff2a2a]/5 mb-4 work-eyebrow">
            <p className="text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em]">SELECTED WORK</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            <span className="work-title-line block">Projects &</span>
            <span className="work-title-line block text-[#ff2a2a]">Achievements.</span>
          </h2>
          <div className="work-divider w-24 h-[1px] bg-[#ff2a2a]/40 mt-6" />
        </div>

        {/* Projects — grid cards with image, title, tags, icon links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`project-card-${i} group relative flex flex-col p-5 border border-white/[0.06] hover:border-[#ff2a2a]/30 bg-[#0a0a0a]/80 rounded-2xl transition-all duration-500 overflow-hidden`}
            >
              <div
                className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff2a2a]/10 rounded-full blur-3xl pointer-events-none animate-pulse"
                style={{ animationDuration: `${3.5 + i * 0.5}s` }}
              />
              <SignalDot className="absolute top-4 right-4 z-20" />
              {/* Image */}
              <TiltCard
                as="div"
                maxTilt={4}
                glow={false}
                className="relative h-56 overflow-hidden rounded-xl mb-6 z-10"
              >
                <div className="absolute inset-0 bg-[#ff2a2a]/5 z-10 mix-blend-overlay" />
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
              </TiltCard>

              {/* Title */}
              <h3 className="relative z-10 text-white text-[20px] md:text-[22px] font-black uppercase tracking-tight group-hover:text-[#ff2a2a] transition-colors duration-300 mb-4 leading-tight">
                {p.title}
              </h3>

              {/* Tags */}
              <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-gray-400 text-[10px] uppercase tracking-[1px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-mono group-hover:border-[#ff2a2a]/30 transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Icon links */}
              <div className="relative z-10 flex gap-3 mt-auto">
                <MagneticButton
                  as="a"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.25}
                  onClick={(e) => punch(e.currentTarget)}
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white rounded-xl hover:border-[#ff2a2a]/40 hover:text-[#ff2a2a] transition-all duration-300"
                  aria-label="View source code"
                >
                  <FiGithub size={18} />
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.25}
                  onClick={(e) => punch(e.currentTarget)}
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white rounded-xl hover:border-[#ff2a2a]/40 hover:text-[#ff2a2a] transition-all duration-300"
                  aria-label="View live project"
                >
                  <FiArrowUpRight size={18} />
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[1px] bg-[#ff2a2a]" />
            <span className="text-[#ff2a2a] text-[11px] uppercase tracking-[4px] font-mono">Certifications</span>
          </div>
          <div className="cert-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map((cert, i) => (
              <TiltCard
                key={cert.name}
                maxTilt={8}
                className="cert-card relative border border-white/5 p-5 hover:border-[#ff2a2a]/40 transition-all duration-300 group bg-black/40 overflow-hidden"
              >
                <div
                  className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#ff2a2a]/10 rounded-full blur-2xl pointer-events-none animate-pulse"
                  style={{ animationDuration: `${3 + i * 0.25}s` }}
                />
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#ff2a2a]/30 group-hover:border-[#ff2a2a]/80 transition-all" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#ff2a2a]/30 group-hover:border-[#ff2a2a]/80 transition-all" />
                <SignalDot className="absolute top-3 right-3 z-10" />
                <p className="relative text-white text-[13px] font-medium mb-1">{cert.name}</p>
                <p className="relative text-gray-500 text-[11px]">{cert.org}</p>
                <p className="relative text-[#ff2a2a] text-[10px] uppercase tracking-[2px] mt-3 font-mono">{cert.date}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}