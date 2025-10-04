import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Global Setup (Required for Canvas Environment) ---
// These are included to satisfy the environment requirements,
// but actual Firestore logic is skipped as per the prompt's request for "no backend"
// and usage of localStorage for dummy data.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
// --- End Global Setup ---

// --- Utility Components & Functions ---

// Simple Icons (simulating lucide-react or similar) using SVG
const Icon = ({ name, className = 'w-5 h-5' }) => {
  const getIcon = () => {
    switch (name) {
      case 'user': return (<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>);
      case 'mail': return (<><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.83 1.83 0 0 1-2.06 0L2 7" /></>);
      case 'lock': return (<><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>);
      case 'instagram': return (<><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 11.37 16 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.5" y1="6.5" y2="6.5" /></>);
      case 'whatsapp': return (<><path d="M21 12.5H3" /><path d="M12.5 3v18" /></>); // Placeholder for WhatsApp
      case 'linkedin': return (<><path d="M16 8a4 4 0 0 1 4 4v7H4v-7a4 4 0 0 1 4-4z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>);
      case 'globe': return (<><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></>);
      case 'briefcase': return (<><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>);
      case 'menu': return (<><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></>);
      case 'x': return (<><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></>);
      case 'check': return (<><path d="M20 6 9 17l-5-5" /></>);
      case 'plus': return (<><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></>);
      case 'minus': return (<><line x1="5" x2="19" y1="12" y2="12" /></>);
      case 'move': return (<><polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" /><polyline points="15 19 12 22 9 19" /><polyline points="19 15 22 12 19 9" /><line x1="2" x2="22" y1="12" y2="12" /><line x1="12" x2="12" y1="2" y2="22" /></>);
      case 'qrcode': return (<><rect width="4" height="4" x="3" y="3" rx="1" /><rect width="4" height="4" x="17" y="3" rx="1" /><rect width="4" height="4" x="3" y="17" rx="1" /><rect width="4" height="4" x="17" y="17" rx="1" /><line x1="11" x2="13" y1="11" y2="13" /></>);
      case 'tap': return (<><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" /><path d="M21 12c0-2.22-1.2-4.14-3-5.18l-1.42-3.08A2 2 0 0 0 14.37 3H9.63a2 2 0 0 0-1.21.74L7 7.82C5.2 8.86 4 10.78 4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6Z" /></>);
      case 'settings': return (<><path d="M12.22 2h-.44a2 2 0 0 0-2 1.76L9.5 7.15A2 2 0 0 1 7.87 8.1l-4.13.9a2 2 0 0 0-1.16 2.45L3.4 15.3A2 2 0 0 0 4.8 17l4.13.9a2 2 0 0 1 1.63.94l.27 1.4A2 2 0 0 0 12 22h.44a2 2 0 0 0 2-1.76l.33-1.4a2 2 0 0 1 1.63-.94l4.13-.9a2 2 0 0 0 1.4-1.7l-.07-2.73A2 2 0 0 0 20.1 8.1l-4.13-.9A2 2 0 0 1 14.5 7.15l-.28-1.4A2 2 0 0 0 12.22 2z" /><circle cx="12" cy="12" r="3" /></>);
      default: return (<circle cx="12" cy="12" r="10" />);
    }
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {getIcon()}
    </svg>
  );
};

const SOCIAL_LINKS = [
  { id: 'website', name: 'Website', icon: 'globe', placeholder: 'https://yourwebsite.com' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', placeholder: 'https://linkedin.com/in/yourprofile' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram', placeholder: 'https://instagram.com/yourhandle' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', placeholder: '+1 555 123 4567' },
];

const THEMES = {
  minimal: { name: 'Minimal', icon: 'check', preview: 'bg-white text-gray-800' },
  glass: { name: 'Glass', icon: 'user', preview: 'bg-indigo-200/50 backdrop-blur-md text-white' },
  gradient: { name: 'Gradient', icon: 'briefcase', preview: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' },
};

// Default profile data
const defaultProfile = {
  name: "Jane Doe",
  jobTitle: "NFC Innovation Manager",
  bio: "Connecting the world, one tap at a time. Let's exchange details seamlessly.",
  profileImageUrl: 'https://placehold.co/150x150/4f46e5/ffffff?text=JD',
  links: [
    { id: 'website', type: 'website', value: 'https://connectech.com', isActive: true },
    { id: 'linkedin', type: 'linkedin', value: 'https://linkedin.com/in/janedoe', isActive: true },
  ],
  theme: 'gradient',
  username: 'janedoe',
  taps: 1450,
};

// --- Local Storage Auth/Data Functions ---
const storageKey = (key) => `nfc_app_${key}_${appId}`;
const LS_USERS = storageKey('users');
const LS_SESSION = storageKey('session');
const LS_PROFILES = storageKey('profiles');

const getStoredUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem(LS_USERS));
    return users || { 'test@example.com': { password: 'password', username: 'testuser', id: '123' } };
  } catch (e) {
    console.error("Error loading users from localStorage", e);
    return { 'test@example.com': { password: 'password', username: 'testuser', id: '123' } };
  }
};

const getStoredProfiles = () => {
  try {
    const profiles = JSON.parse(localStorage.getItem(LS_PROFILES));
    return profiles || { 'testuser': { ...defaultProfile, username: 'testuser' }, 'janedoe': defaultProfile };
  } catch (e) {
    console.error("Error loading profiles from localStorage", e);
    return { 'testuser': { ...defaultProfile, username: 'testuser' }, 'janedoe': defaultProfile };
  }
};

const setStoredProfiles = (profiles) => {
  try {
    localStorage.setItem(LS_PROFILES, JSON.stringify(profiles));
  } catch (e) {
    console.error("Error saving profiles to localStorage", e);
  }
};

const setStoredUsers = (users) => {
  try {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving users to localStorage", e);
  }
};

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_SESSION));
  } catch (e) {
    return null;
  }
};

const setSession = (session) => {
  try {
    localStorage.setItem(LS_SESSION, JSON.stringify(session));
  } catch (e) {
    console.error("Error saving session to localStorage", e);
  }
};

// --- Theme Components (Reusable for Dashboard Preview and Public Page) ---

const CardButton = ({ icon, label, href, bgColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center w-full py-3 px-6 text-white font-semibold rounded-xl transition-transform duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] ${bgColor}`}
  >
    <Icon name={icon} className="w-5 h-5 mr-3" />
    <span>{label}</span>
  </a>
);

const BaseProfileCard = ({ profile, className, children }) => (
  <div className={`p-6 sm:p-8 w-full max-w-sm mx-auto shadow-2xl rounded-3xl text-center transition-all duration-300 ${className}`}>
    <img
      src={profile.profileImageUrl}
      alt={`${profile.name} profile`}
      className="w-28 h-28 object-cover rounded-full mx-auto mb-4 border-4 border-white/50 shadow-lg"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/374151/ffffff?text=No+Img'; }}
    />
    <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
    <h2 className="text-md font-medium opacity-80 mb-3">{profile.jobTitle}</h2>
    <p className="text-sm opacity-90 mb-6 italic">{profile.bio}</p>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const MinimalTheme = ({ profile }) => {
  const bgColor = 'bg-white';
  const textColor = 'text-gray-800';
  const buttonColor = 'bg-indigo-600 hover:bg-indigo-700';
  const links = profile.links.filter(l => l.isActive);

  return (
    <BaseProfileCard profile={profile} className={`${bgColor} ${textColor} border border-gray-100`}>
      {links.map(link => {
        const social = SOCIAL_LINKS.find(s => s.id === link.type);
        if (!social) return null;
        return (
          <CardButton
            key={link.id}
            icon={social.icon}
            label={social.name}
            href={link.value}
            bgColor={buttonColor}
          />
        );
      })}
    </BaseProfileCard>
  );
};

const GlassTheme = ({ profile }) => {
  const bgColor = 'bg-white/10 backdrop-blur-xl';
  const textColor = 'text-white';
  const buttonColor = 'bg-white/20 hover:bg-white/30 border border-white/30 shadow-none';
  const links = profile.links.filter(l => l.isActive);

  return (
    <div className="p-4 sm:p-8 bg-black/50 min-h-screen flex items-center justify-center">
      <BaseProfileCard profile={profile} className={`${bgColor} ${textColor} border border-white/20`}>
        {links.map(link => {
          const social = SOCIAL_LINKS.find(s => s.id === link.type);
          if (!social) return null;
          return (
            <CardButton
              key={link.id}
              icon={social.icon}
              label={social.name}
              href={link.value}
              bgColor={buttonColor}
            />
          );
        })}
      </BaseProfileCard>
    </div>
  );
};

const GradientTheme = ({ profile }) => {
  const bgColor = 'bg-gradient-to-br from-indigo-600 to-purple-700';
  const textColor = 'text-white';
  const cardBg = 'bg-white/20 backdrop-blur-sm';
  const buttonColor = 'bg-white text-gray-800 hover:bg-gray-100 shadow-md';
  const links = profile.links.filter(l => l.isActive);

  return (
    <div className={`p-4 sm:p-8 min-h-screen flex items-center justify-center ${bgColor}`}>
      <BaseProfileCard profile={profile} className={`${cardBg} ${textColor} border-none`}>
        {links.map(link => {
          const social = SOCIAL_LINKS.find(s => s.id === link.type);
          if (!social) return null;
          return (
            <CardButton
              key={link.id}
              icon={social.icon}
              label={social.name}
              href={link.value}
              bgColor={buttonColor}
            />
          );
        })}
      </BaseProfileCard>
    </div>
  );
};

const PreviewCard = ({ profile }) => {
  switch (profile.theme) {
    case 'minimal': return <MinimalTheme profile={profile} />;
    case 'glass': return <GlassTheme profile={profile} />;
    case 'gradient': return <GradientTheme profile={profile} />;
    default: return <MinimalTheme profile={profile} />;
  }
};

// Simple QR Code SVG Placeholder (Simulating qrcode.react)
const QRCodeSVG = ({ value, size = 150 }) => (
  <svg viewBox="0 0 30 30" width={size} height={size} className="bg-white p-1 rounded-lg shadow-lg">
    <rect x="0" y="0" width="30" height="30" fill="white" />
    {/* Top Left Finder Pattern */}
    <rect x="2" y="2" width="6" height="6" fill="#1e293b" />
    <rect x="3" y="3" width="4" height="4" fill="white" />
    <rect x="4" y="4" width="2" height="2" fill="#1e293b" />

    {/* Top Right Finder Pattern */}
    <rect x="22" y="2" width="6" height="6" fill="#1e293b" />
    <rect x="23" y="3" width="4" height="4" fill="white" />
    <rect x="24" y="4" width="2" height="2" fill="#1e293b" />

    {/* Bottom Left Finder Pattern */}
    <rect x="2" y="22" width="6" height="6" fill="#1e293b" />
    <rect x="3" y="23" width="4" height="4" fill="white" />
    <rect x="4" y="24" width="2" height="2" fill="#1e293b" />

    {/* Data Dots (Simulated) */}
    {[10, 11, 12, 13, 14, 15, 16, 17, 18].map(y =>
      [10, 11, 12, 13, 14, 15, 16, 17, 18].map(x =>
        (x + y) % 3 === 0 ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1e293b" /> : null
      )
    )}
  </svg>
);


// --- Routing Components ---

const Navbar = ({ isLoggedIn, onNavigate, onLogout, onToggleAuth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemClass = "text-gray-700 hover:text-indigo-600 transition duration-150 py-2 sm:py-0";

  const handleNav = (page, hash) => {
    onNavigate(page, hash);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button onClick={() => handleNav('landing')} className="text-2xl font-extrabold text-indigo-600 tracking-tight">
              Connect<span className="text-gray-900">Tap</span>
            </button>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
            {isLoggedIn ? (
              <>
                <button onClick={() => handleNav('dashboard')} className={navItemClass}>Dashboard</button>
                <button onClick={() => handleNav('admin')} className={navItemClass}>Admin</button>
                <button onClick={onLogout} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition duration-150 shadow-md">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleNav('landing', '#about')} className={navItemClass}>About</button>
                <button onClick={() => handleNav('landing', '#works')} className={navItemClass}>How It Works</button>
                <button onClick={() => handleNav('landing', '#pricing')} className={navItemClass}>Pricing</button>
                <button onClick={() => handleNav('landing', '#contact')} className={navItemClass}>Contact</button>
                <button onClick={() => onToggleAuth(true, 'login')} className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-semibold transition duration-150 shadow-md">
                  Login
                </button>
                <button onClick={() => onToggleAuth(true, 'signup')} className="text-indigo-600 border border-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-semibold transition duration-150 ml-2">
                  Buy Now
                </button>
              </>
            )}
          </div>
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Icon name={isOpen ? 'x' : 'menu'} className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn ? (
              <>
                <button onClick={() => handleNav('dashboard')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50">Dashboard</button>
                <button onClick={() => handleNav('admin')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50">Admin</button>
                <button onClick={onLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600 mt-2">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => handleNav('landing', '#about')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50">About</button>
                <button onClick={() => handleNav('landing', '#works')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50">How It Works</button>
                <button onClick={() => handleNav('landing', '#pricing')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50">Pricing</button>
                <button onClick={() => handleNav('landing', '#contact')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50">Contact</button>
                <button onClick={() => onToggleAuth(true, 'login')} className="block w-full text-center mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Login</button>
                <button onClick={() => onToggleAuth(true, 'signup')} className="block w-full text-center mt-2 px-3 py-2 rounded-md text-base font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50">Buy Now</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-16 sm:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">{subtitle}</h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</p>
      </div>
      {children}
    </div>
  </section>
);

const LandingPage = ({ onToggleAuth }) => {
  useEffect(() => {
    // Handle hash scrolling for navigation
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Tap. Connect. Grow. <span className="text-indigo-400">The Ultimate NFC Business Card.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Ditch the paper and switch to a smart, customizable digital profile. Instantly share your contact, social media, and more with just a tap.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <button
                onClick={() => onToggleAuth(true, 'signup')}
                className="rounded-xl bg-indigo-500 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-indigo-400 transition transform duration-150 active:scale-[0.98]"
              >
                Buy Now
              </button>
              <button
                onClick={() => onToggleAuth(true, 'login')}
                className="text-lg font-semibold leading-6 text-white hover:text-indigo-400 transition"
              >
                Login <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="rounded-2xl bg-indigo-400/10 p-2 sm:p-4 ring-1 ring-white/10 shadow-2xl">
              <PreviewCard profile={defaultProfile} />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <Section id="about" title="Smart Networking. Simplified." subtitle="About ConnectTap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-50 rounded-xl shadow-lg transition hover:shadow-xl">
            <Icon name="briefcase" className="w-10 h-10 mx-auto mb-4 text-indigo-600" />
            <h3 className="text-xl font-bold mb-2">Professional</h3>
            <p className="text-gray-600">Leave a lasting, professional impression with dynamic digital profiles that update instantly.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-lg transition hover:shadow-xl">
            <Icon name="settings" className="w-10 h-10 mx-auto mb-4 text-indigo-600" />
            <h3 className="text-xl font-bold mb-2">Customizable</h3>
            <p className="text-gray-600">Choose from stunning themes (Minimal, Glass, Gradient) and control every element of your profile.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-lg transition hover:shadow-xl">
            <Icon name="tap" className="w-10 h-10 mx-auto mb-4 text-indigo-600" />
            <h3 className="text-xl font-bold mb-2">Instant</h3>
            <p className="text-gray-600">Share your details with a single tap—no apps or downloads needed by the recipient.</p>
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section id="works" title="Three Simple Steps" subtitle="How It Works" >
        <div className="space-y-12 max-w-3xl mx-auto">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mr-4 shadow-md">1</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Create Your Profile</h3>
              <p className="text-gray-600">Sign up and use our intuitive dashboard to add your name, job title, bio, and all your social links.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mr-4 shadow-md">2</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Link Your Card</h3>
              <p className="text-gray-600">Receive your NFC-enabled card or sticker and link it to your newly created digital profile URL.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mr-4 shadow-md">3</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Tap & Connect</h3>
              <p className="text-gray-600">Tap your card against any compatible smartphone. Your profile instantly appears, ready to be saved!</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing" title="Pick Your Perfect Plan" subtitle="Transparent Pricing" >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-8 bg-white border-2 border-indigo-100 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900">Basic</h3>
            <p className="mt-4 text-gray-600">The perfect start for solopreneurs.</p>
            <p className="mt-6 text-5xl font-extrabold text-gray-900">
              $9 <span className="text-xl font-medium text-gray-500">/ card</span>
            </p>
            <ul className="mt-6 space-y-4 text-gray-600">
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-indigo-600 mr-2" /> One Digital Profile</li>
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-indigo-600 mr-2" /> Minimal Theme Only</li>
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-indigo-600 mr-2" /> Unlimited Taps</li>
            </ul>
            <button
              onClick={() => onToggleAuth(true, 'signup')}
              className="mt-8 w-full rounded-xl bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
          </div>

          <div className="relative p-8 bg-indigo-600 text-white rounded-3xl shadow-2xl scale-[1.05]">
            <span className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-yellow-400 text-gray-900 font-bold rounded-full text-sm shadow-md">Popular</span>
            <h3 className="text-2xl font-bold">Pro</h3>
            <p className="mt-4 opacity-80">Full customization for power networkers.</p>
            <p className="mt-6 text-5xl font-extrabold">
              $19 <span className="text-xl font-medium opacity-80">/ card</span>
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-yellow-300 mr-2" /> All Themes Included</li>
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-yellow-300 mr-2" /> Customizable QR Code</li>
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-yellow-300 mr-2" /> Tap Analytics Dashboard</li>
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-yellow-300 mr-2" /> Link Reordering</li>
            </ul>
            <button
              onClick={() => onToggleAuth(true, 'signup')}
              className="mt-8 w-full rounded-xl bg-white text-indigo-600 px-6 py-3 text-lg font-semibold shadow-md hover:bg-gray-100 transition"
            >
              Buy Pro
            </button>
          </div>

          <div className="p-8 bg-gray-50 border-2 border-gray-200 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900">Team</h3>
            <p className="mt-4 text-gray-600">Ideal for small businesses and teams.</p>
            <p className="mt-6 text-5xl font-extrabold text-gray-900">
              $49 <span className="text-xl font-medium text-gray-500">/ 5 cards</span>
            </p>
            <ul className="mt-6 space-y-4 text-gray-600">
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-indigo-600 mr-2" /> 5 Profile Licenses</li>
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-indigo-600 mr-2" /> Centralized Billing</li>
              <li className="flex items-center"><Icon name="check" className="w-5 h-5 text-indigo-600 mr-2" /> Dedicated Account Manager</li>
            </ul>
            <button
              onClick={() => onToggleAuth(true, 'signup')}
              className="mt-8 w-full rounded-xl border border-indigo-600 text-indigo-600 px-6 py-3 text-lg font-semibold hover:bg-indigo-50 transition"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Get in Touch" subtitle="We're Here to Help">
        <div className="max-w-xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows="4" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" placeholder="How can we help you?" />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">&copy; 2024 ConnectTap. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

const AuthModal = ({ isOpen, type, onClose, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset state when modal type changes
    setEmail('');
    setPassword('');
    setUsername('');
    setError('');
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    let users = getStoredUsers();
    let profiles = getStoredProfiles();

    if (type === 'login') {
      const user = Object.values(users).find(u => u.email === email && u.password === password);
      if (user) {
        setSession({ email: user.email, username: user.username });
        onAuthSuccess(user.username);
      } else {
        setError('Invalid email or password.');
      }
    } else if (type === 'signup') {
      if (users[email]) {
        setError('User already exists with this email.');
        return;
      }
      if (Object.values(users).find(u => u.username === username)) {
        setError('Username is already taken.');
        return;
      }

      const newUser = { email, password, username, id: Date.now().toString() };
      users[email] = newUser;
      setStoredUsers(users);

      // Create default profile for new user
      profiles[username] = { ...defaultProfile, name: "New User", username: username, profileImageUrl: `https://placehold.co/150x150/f97316/ffffff?text=${username.substring(0,2).toUpperCase()}` };
      setStoredProfiles(profiles);

      setSession({ email, username });
      onAuthSuccess(username);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl relative">
        <button onClick={() => onClose()} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <Icon name="x" className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                placeholder="yourusername"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition transform duration-150 active:scale-[0.99]"
          >
            {type === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          {type === 'login' ? (
            <p>Don't have an account? <button onClick={() => onClose('signup')} className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => onClose('login')} className="font-medium text-indigo-600 hover:text-indigo-500">Login</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ userSession, onLogout }) => {
  const [profiles, setProfiles] = useState(getStoredProfiles());
  const [currentProfile, setCurrentProfile] = useState(profiles[userSession.username] || defaultProfile);
  const [message, setMessage] = useState('');

  // Update localStorage when currentProfile changes
  useEffect(() => {
    if (userSession.username && currentProfile) {
      const newProfiles = { ...profiles, [userSession.username]: currentProfile };
      setProfiles(newProfiles);
      setStoredProfiles(newProfiles);
    }
  }, [currentProfile, userSession.username]);

  // Handle simple input change for main details
  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setCurrentProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle social link active/deactivate
  const handleLinkToggle = (type) => {
    setCurrentProfile(prev => {
      const existingLink = prev.links.find(l => l.type === type);
      if (existingLink) {
        return {
          ...prev,
          links: prev.links.map(l =>
            l.type === type ? { ...l, isActive: !l.isActive } : l
          ),
        };
      } else {
        const social = SOCIAL_LINKS.find(s => s.id === type);
        return {
          ...prev,
          links: [...prev.links, { id: Date.now().toString(), type: social.id, value: social.placeholder, isActive: true }],
        };
      }
    });
  };

  // Handle social link value change
  const handleLinkValueChange = (id, value) => {
    setCurrentProfile(prev => ({
      ...prev,
      links: prev.links.map(l => (l.id === id ? { ...l, value } : l)),
    }));
  };

  // Handle reordering links (simple drag/drop simulation)
  const moveLink = useCallback((dragIndex, hoverIndex) => {
    setCurrentProfile(prev => {
      const links = [...prev.links];
      const draggedLink = links[dragIndex];
      links.splice(dragIndex, 1);
      links.splice(hoverIndex, 0, draggedLink);
      return { ...prev, links };
    });
  }, []);

  const handleSave = () => {
    // Save is already handled in useEffect, this just provides feedback
    setMessage('Profile settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const socialLinksConfig = SOCIAL_LINKS.map(social => {
    const link = currentProfile.links.find(l => l.type === social.id);
    return {
      ...social,
      linkId: link?.id,
      value: link?.value || social.placeholder,
      isActive: link?.isActive || false,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your digital profile and tap-card settings.</p>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative mb-6">
            <Icon name="check" className="w-5 h-5 inline mr-2" /> {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Profile Editor */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><Icon name="user" className="mr-2 w-6 h-6 text-indigo-500" /> Basic Details</h2>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Profile URL</span>
                  <div className="mt-1 flex rounded-xl shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      connectech.com/u/
                    </span>
                    <input
                      type="text"
                      name="username"
                      value={currentProfile.username}
                      readOnly
                      className="flex-1 block w-full rounded-r-xl border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-100"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="text-gray-700">Profile Image URL</span>
                  <input
                    type="url"
                    name="profileImageUrl"
                    value={currentProfile.profileImageUrl}
                    onChange={handleDetailChange}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                    placeholder="https://image-link.com/photo.jpg"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    value={currentProfile.name}
                    onChange={handleDetailChange}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                    placeholder="Jane Doe"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Job Title</span>
                  <input
                    type="text"
                    name="jobTitle"
                    value={currentProfile.jobTitle}
                    onChange={handleDetailChange}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                    placeholder="Head of Digital Strategy"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Bio/Slogan</span>
                  <textarea
                    name="bio"
                    value={currentProfile.bio}
                    onChange={handleDetailChange}
                    rows="3"
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                    placeholder="Connecting the world, one tap at a time."
                  />
                </label>
              </div>
            </div>

            {/* Social Links Editor */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><Icon name="globe" className="mr-2 w-6 h-6 text-indigo-500" /> Social Links</h2>
              <div className="space-y-4">
                {socialLinksConfig.filter(s => s.isActive).map((social, index) => (
                  <div key={social.linkId} className="flex flex-col sm:flex-row items-center bg-gray-50 p-3 rounded-xl border border-gray-100 transition duration-150 shadow-sm">
                    <div className="flex items-center w-full sm:w-10 mb-2 sm:mb-0">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-indigo-600 cursor-move mr-2"
                        >
                          <Icon name="move" className="w-5 h-5" />
                        </button>
                        <span className="font-semibold text-gray-700 flex items-center">
                          <Icon name={social.icon} className="w-4 h-4 mr-2" />
                          {social.name}
                        </span>
                    </div>
                    <input
                      type="text"
                      value={currentProfile.links.find(l => l.type === social.id)?.value || ''}
                      onChange={(e) => handleLinkValueChange(social.linkId, e.target.value)}
                      className="w-full sm:flex-1 block rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2 text-sm border my-2 sm:my-0 sm:mx-4"
                      placeholder={social.placeholder}
                    />
                    <button
                      onClick={() => handleLinkToggle(social.id)}
                      className="flex-shrink-0 text-red-500 hover:text-red-700 p-2 rounded-lg transition"
                    >
                      <Icon name="minus" className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Add New Link</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SOCIAL_LINKS.filter(s => !socialLinksConfig.find(sc => sc.id === s.id)?.isActive).map(social => (
                      <button
                        key={social.id}
                        onClick={() => handleLinkToggle(social.id)}
                        className="flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition text-sm font-medium shadow-sm"
                      >
                        <Icon name="plus" className="w-4 h-4 mr-1" /> {social.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Selector */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center"><Icon name="settings" className="mr-2 w-6 h-6 text-indigo-500" /> Theme Selection</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(THEMES).map(([id, theme]) => (
                  <button
                    key={id}
                    onClick={() => setCurrentProfile(prev => ({ ...prev, theme: id }))}
                    className={`p-4 rounded-xl text-left transition duration-200 border-4 ${currentProfile.theme === id ? 'border-indigo-500 shadow-lg' : 'border-gray-100 hover:border-indigo-300'}`}
                    style={{ backgroundColor: id === 'glass' ? '#2c3e50' : (id === 'gradient' ? '#4f46e5' : '#ffffff') }}
                  >
                    <div className={`${theme.preview} p-4 rounded-lg text-xs font-semibold`}>
                      {theme.name}
                    </div>
                    <p className={`mt-2 text-sm font-semibold ${id === 'glass' || id === 'gradient' ? 'text-white' : 'text-gray-800'}`}>{theme.name}</p>
                    <p className={`text-xs ${id === 'glass' || id === 'gradient' ? 'text-indigo-200' : 'text-gray-500'}`}>{currentProfile.theme === id ? 'Active' : 'Select'}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-4 px-6 bg-indigo-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition transform active:scale-[0.99]"
            >
              Save Profile Changes
            </button>
          </div>

          {/* Column 2: Live Preview & Analytics */}
          <div className="lg:col-span-1 space-y-8 sticky top-20">
            {/* Live Preview */}
            <div className="p-4 bg-gray-200 rounded-2xl shadow-inner border border-gray-300">
              <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">Live Preview</h2>
              <div className="w-full h-auto">
                <PreviewCard profile={currentProfile} />
              </div>
            </div>

            {/* Analytics & Tools */}
            <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center"><Icon name="tap" className="mr-2 w-6 h-6 text-indigo-500" /> Tap Analytics</h2>
              <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl">
                <span className="text-lg font-medium text-gray-700">Total Profile Taps</span>
                <span className="text-3xl font-extrabold text-indigo-600">{currentProfile.taps.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center"><Icon name="qrcode" className="mr-2 w-6 h-6 text-indigo-500" /> QR Code Share</h2>
              <div className="flex justify-center">
                <QRCodeSVG value={`connectech.com/u/${currentProfile.username}`} />
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">Scan to share your profile instantly.</p>
            </div>

            {/* Subscription UI (Mock) */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-500">
              <h2 className="text-xl font-bold text-green-700 mb-3 flex items-center"><Icon name="check" className="mr-2 w-6 h-6" /> Pro Subscription</h2>
              <p className="text-sm text-gray-600">Your current plan is **Pro**. Access all themes and analytics.</p>
              <button className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Manage Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage = ({ onNavigate }) => {
  const users = getStoredUsers();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Panel</h1>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registered Users ({Object.keys(users).length})</h2>
          <ul className="divide-y divide-gray-200">
            {Object.values(users).map(user => (
              <li key={user.id} className="py-4 flex justify-between items-center hover:bg-gray-50 transition px-2 rounded-lg">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => onNavigate('public', user.username)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View Profile
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PublicProfilePage = ({ username }) => {
  const profiles = getStoredProfiles();
  const profile = profiles[username];

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-extrabold text-red-500 mb-4">404 - Profile Not Found</h1>
        <p className="text-lg text-gray-600">The user '<span className="font-mono bg-gray-100 p-1 rounded">{username}</span>' does not exist.</p>
        <a href="/" className="mt-8 text-indigo-600 hover:text-indigo-500 font-medium">Go back to homepage</a>
      </div>
    );
  }

  // Render the chosen theme component
  return (
    <div className="min-h-screen">
      <PreviewCard profile={profile} />
    </div>
  );
};


// --- Main App Component ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'dashboard', 'admin', 'public'
  const [currentUsername, setCurrentUsername] = useState(null); // Used for public profile view
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login'); // 'login' or 'signup'
  const [userSession, setUserSession] = useState(null);

  // 1. Initialize Auth State from Local Storage on Load
  useEffect(() => {
    const session = getSession();
    if (session && session.username) {
      setUserSession(session);
      // If a session exists, default to dashboard
      setCurrentPage('dashboard');
    }

    // Set up dummy auth for the canvas environment
    // In a real app, this is where you'd sign in with the custom token:
    // if (initialAuthToken) { signInWithCustomToken(auth, initialAuthToken); }
  }, []);

  // 2. Handle State-based Routing (URL Simulation)
  useEffect(() => {
    const path = window.location.hash.substring(1);
    const publicMatch = path.match(/^u\/(.+)$/);

    if (publicMatch) {
      setCurrentPage('public');
      setCurrentUsername(publicMatch[1]);
    } else if (userSession) {
      if (path === 'admin') {
        setCurrentPage('admin');
      } else if (path === 'dashboard') {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('dashboard'); // Default after login
      }
    } else {
      setCurrentPage('landing');
    }
  }, [userSession]);

  // Handle URL changes via hash (for public link sharing simulation)
  const handleNavigate = (page, param) => {
    let newHash = '';
    if (page === 'public' && param) {
      newHash = `u/${param}`;
      setCurrentUsername(param);
    } else if (page === 'landing' && param) {
      newHash = param; // #about, #pricing, etc.
    } else if (page === 'landing') {
      newHash = '';
    } else {
      newHash = page; // dashboard or admin
    }

    window.location.hash = newHash;
    setCurrentPage(page);
  };

  const handleToggleAuth = (isOpen, type = 'login') => {
    setIsAuthModalOpen(isOpen);
    if (isOpen) {
      setAuthType(type);
    }
  };

  const handleAuthSuccess = (username) => {
    const session = getSession();
    setUserSession(session);
    setIsAuthModalOpen(false);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem(LS_SESSION);
    setUserSession(null);
    handleNavigate('landing');
  };

  const renderPage = () => {
    if (currentPage === 'public') {
      return <PublicProfilePage username={currentUsername} />;
    }
    if (!userSession) {
      return <LandingPage onToggleAuth={handleToggleAuth} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userSession={userSession} onLogout={handleLogout} />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigate} />;
      default:
        return <Dashboard userSession={userSession} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="font-sans antialiased min-h-screen">
      <Navbar
        isLoggedIn={!!userSession}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onToggleAuth={handleToggleAuth}
      />
      {renderPage()}
      <AuthModal
        isOpen={isAuthModalOpen}
        type={authType}
        onClose={(newType) => {
          if (newType) {
            setAuthType(newType);
          } else {
            setIsAuthModalOpen(false);
          }
        }}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default App;

