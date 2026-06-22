import React, { useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiGithub, FiDownload, FiArrowUpRight } from 'react-icons/fi';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const menuRef = useRef(null);
  const backdropRef = useRef(null);
  const drawerRef = useRef(null);
  const overlayLinksRef = useRef([]);
  const ctaRefs = useRef([]);
  const lineTopRef = useRef(null);
  const lineMidRef = useRef(null);
  const lineBotRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  // label shown in the UI -> route path it links to
  const navLinks = [
    { label: 'WORK', path: '/work' },
    { label: 'ABOUT', path: '/about' },
    { label: 'SERVICES', path: '/services' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const GITHUB_URL = 'https://github.com/RoronoaKarthi';
  const RESUME_PATH = '/KarthikeyanResume.pdf';

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Logo fade from left
    tl.fromTo(logoRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
    )
    // Links slide down
    .fromTo(linksRef.current,
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out' },
      '-=0.8'
    )
    // Hamburger fade from right
    .fromTo(menuRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'expo.out' },
      '-=0.8'
    );
  }, []);

  // Hamburger morph + slide-in drawer menu
  useGSAP(() => {
    if (isOpen) {
      // Bars squeeze to center, then snap into an X with a punchy bounce
      const barsTl = gsap.timeline();
      barsTl.to([lineTopRef.current, lineBotRef.current], {
        width: '32px',
        duration: 0.25,
        ease: 'power2.in',
      }, 0)
      .to(lineMidRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }, 0)
      .to(lineTopRef.current, {
        rotate: 45,
        y: 7,
        backgroundColor: '#ffffff',
        duration: 0.45,
        ease: 'back.out(2.5)',
      }, 0.15)
      .to(lineBotRef.current, {
        rotate: -45,
        y: -7,
        backgroundColor: '#ffffff',
        duration: 0.45,
        ease: 'back.out(2.5)',
      }, 0.15);

      // Backdrop fades in, drawer slides in from the right
      gsap.set([backdropRef.current, drawerRef.current], { display: 'block' });
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(drawerRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.65, ease: 'power4.out' }
      );

      // Links reveal: clipped text swipes up into place
      gsap.fromTo(overlayLinksRef.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, stagger: 0.08, ease: 'expo.out', delay: 0.25 }
      );
      gsap.fromTo(ctaRefs.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.6 }
      );
    } else {
      // Bars un-morph back to hamburger
      const barsTl = gsap.timeline();
      barsTl.to([lineTopRef.current, lineBotRef.current], {
        rotate: 0,
        y: 0,
        backgroundColor: '#ff2a2a',
        duration: 0.35,
        ease: 'power3.inOut',
      }, 0)
      .to(lineBotRef.current, {
        width: '20px',
        duration: 0.25,
        ease: 'power2.out',
      }, 0.2)
      .to(lineMidRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 0.25);

      // Drawer slides back out, backdrop fades
      gsap.to(drawerRef.current, {
        xPercent: 100,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => gsap.set(drawerRef.current, { display: 'none' }),
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => gsap.set(backdropRef.current, { display: 'none' }),
      });

      // Reset link/cta positions for next open
      gsap.set(overlayLinksRef.current, { yPercent: 110 });
      gsap.set(ctaRefs.current, { y: 24, opacity: 0 });
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full h-[80px] z-[100] flex items-center justify-between px-8 md:px-16 bg-transparent"
    >
      {/* LEFT: Logo */}
      <Link
        to="/"
        ref={logoRef}
        onClick={closeMenu}
        className="relative z-10 text-[#ff2a2a] font-bold text-[18px] tracking-[0.18em] cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
        style={{ fontFamily: '"Inter", "Outfit", sans-serif' }}
      >
        KARTHIK&deg;
      </Link>

      {/* RIGHT SIDE (Links + Hamburger) */}
      <div className="relative z-10 flex items-center">

        {/* CENTER/RIGHT: Navigation Links (desktop) — sliding underline on hover/active */}
        <div className="hidden md:flex items-center space-x-12 mr-16">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              ref={el => linksRef.current[index] = el}
              to={link.path}
              className={({ isActive }) =>
                `group relative pb-1 text-[12px] uppercase tracking-[2px] transition-colors duration-300 ease-in-out hover:text-[#ff2a2a] ${
                  isActive ? 'text-[#ff2a2a]' : 'text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-0 h-[1px] bg-[#ff2a2a] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* RIGHT: Hamburger Menu (mobile + desktop toggle) */}
        <button
          ref={menuRef}
          onClick={() => setIsOpen(prev => !prev)}
          className="group relative z-[210] flex flex-col justify-center items-end space-y-[6px] w-8 h-8 cursor-pointer"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          {/* Animated Hamburger Lines */}
          <span ref={lineTopRef} className="block w-8 h-[1px] bg-[#ff2a2a] transition-colors duration-400 ease-out group-hover:bg-white" style={{ transformOrigin: 'center' }} />
          <span ref={lineMidRef} className="block w-8 h-[1px] bg-[#ff2a2a] transition-colors duration-400 ease-out group-hover:bg-white" style={{ transformOrigin: 'center' }} />
          <span ref={lineBotRef} className="block w-5 h-[1px] bg-[#ff2a2a] transition-colors duration-400 ease-out group-hover:w-8 group-hover:bg-white" style={{ transformOrigin: 'center' }} />
        </button>
      </div>

      {/* BACKDROP */}
      <div
        ref={backdropRef}
        onClick={closeMenu}
        className="fixed inset-0 z-[150] hidden bg-black/70 backdrop-blur-sm"
      />

      {/* SLIDE-IN DRAWER MENU */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-[200] hidden w-full sm:w-[440px] h-screen bg-[#020202] border-l border-white/10 flex-col justify-center px-10 sm:px-14 overflow-hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Grid BG accent */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#ff2a2a]/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Main nav links — text swipes up into view */}
        <div className="relative flex flex-col space-y-2">
          {navLinks.map((link, index) => (
            <div key={link.path} className="overflow-hidden py-2">
              <NavLink
                ref={el => overlayLinksRef.current[index] = el}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `group flex items-center gap-4 text-4xl sm:text-5xl font-black uppercase tracking-tighter transition-colors duration-300 hover:text-[#ff2a2a] ${
                    isActive ? 'text-[#ff2a2a]' : 'text-white'
                  }`
                }
                style={{ display: 'inline-block' }}
              >
                <span className="text-[#ff2a2a]/30 text-base font-mono group-hover:text-[#ff2a2a] transition-colors">0{index + 1}</span>
                {link.label}
              </NavLink>
            </div>
          ))}
        </div>

        {/* CTA row: Get In Touch / See My Work / Download Resume */}
        <div className="relative flex flex-col items-stretch gap-3 mt-12">
          <NavLink
            ref={el => ctaRefs.current[0] = el}
            to="/contact"
            onClick={closeMenu}
            className="flex items-center justify-center gap-3 bg-[#ff2a2a] text-white font-bold text-[11px] uppercase tracking-[0.3em] px-7 py-4 hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-300 rounded-full shadow-lg shadow-red-900/20"
          >
            <span>Get In Touch</span>
            <FiArrowUpRight size={14} />
          </NavLink>

          <div className="flex gap-3">
            <a
              ref={el => ctaRefs.current[1] = el}
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex-1 flex items-center justify-center gap-3 border border-white/15 text-white font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-4 hover:border-[#ff2a2a] hover:text-[#ff2a2a] hover:-translate-y-0.5 transition-all duration-300 rounded-full"
            >
              <FiGithub size={14} />
              <span>See My Work</span>
            </a>

            <a
              ref={el => ctaRefs.current[2] = el}
              href={RESUME_PATH}
              download
              onClick={closeMenu}
              className="flex-1 flex items-center justify-center gap-3 border border-white/15 text-white font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-4 hover:border-[#ff2a2a] hover:text-[#ff2a2a] hover:-translate-y-0.5 transition-all duration-300 rounded-full"
            >
              <FiDownload size={14} />
              <span>Resume</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-10 sm:left-14 font-mono text-[10px] text-gray-600 tracking-[0.4em] uppercase">
          KARTHIK&deg; // 2026
        </div>
      </div>
    </nav>
  );
};

export default Navbar;