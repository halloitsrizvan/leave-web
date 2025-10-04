import React, { useState, useMemo } from 'react';

// --- Icon components using inline SVG (since lucide-react or external libraries are not permitted) ---
const HomeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const PackageIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="m7.5 19.73 9-5.15"/><path d="M3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0z"/><path d="m22 8-7-4"/><path d="m11 12 1 6"/><path d="M12 18V6"/></svg>
);
const ShoppingCartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);
const UsersIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const MailIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.83 1.83 0 0 1-2.06 0L2 7"/></svg>
);
const TagIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l5.58-5.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
);
const CreditCardIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);
const ShieldIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
);


// --- Mock Data ---
const nfcProducts = [
  { id: 1, name: "NFC Tag 213 Sticker", description: "Versatile, adhesive NFC tag for quick actions, URL sharing, and automation. Ideal for marketing campaigns.", capacity: "144 bytes", price: 0.50, icon: TagIcon },
  { id: 2, name: "NFC 4K Card (PVC)", description: "High-capacity, durable credit-card sized NFC for complex data storage, loyalty, or access control systems.", capacity: "4KB", price: 1.20, icon: CreditCardIcon },
  { id: 3, name: "Metal Shielded NFC", description: "Features ferrite shielding, ensuring reliable performance even when placed directly on metal surfaces.", capacity: "504 bytes", price: 1.80, icon: ShieldIcon },
];

const NAV_ITEMS = [
  { name: 'Home', icon: HomeIcon, page: 'home' },
  { name: 'Products', icon: PackageIcon, page: 'products' },
  { name: 'Order', icon: ShoppingCartIcon, page: 'order' },
  { name: 'About Us', icon: UsersIcon, page: 'about' },
  { name: 'Contact', icon: MailIcon, page: 'contact' },
];

// --- Utility Components ---

const PrimaryButton = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full md:w-auto px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95 ${className}`}
  >
    {children}
  </button>
);

const SectionTitle = ({ children, className = '' }) => (
  <h2 className={`text-4xl font-extrabold text-white mb-6 border-b-4 border-indigo-600 pb-2 inline-block ${className}`}>
    {children}
  </h2>
);

// --- Page Sections ---

const HomeSection = ({ navigate }) => (
  <div className="text-center p-6 sm:p-10">
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl mb-12">
      <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight mb-4">
        The Future is <span className="text-indigo-400">Tap-and-Go</span>.
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Revolutionize your business operations, marketing, and user experience with custom-programmed Near Field Communication (NFC) chips.
      </p>
      <PrimaryButton onClick={() => navigate('products')} className="mt-4">
        Explore Our Chips
      </PrimaryButton>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
      <FeatureCard
        icon={PackageIcon}
        title="Custom Solutions"
        description="From NTAG213 to NTAG424, we source, program, and deliver the perfect chip for your specific use case."
      />
      <FeatureCard
        icon={CreditCardIcon}
        title="Bulk Orders & Pricing"
        description="Benefit from competitive, scaled pricing models for large-volume orders with rapid fulfillment."
      />
      <FeatureCard
        icon={ShieldIcon}
        title="Quality & Reliability"
        description="Every chip is tested and verified for data retention, read/write speed, and durability before shipment."
      />
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-indigo-700/50 hover:bg-gray-700 transition duration-300">
    <Icon className="w-10 h-10 text-indigo-400 mb-4" />
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-base">{description}</p>
  </div>
);


const ProductSection = ({ navigate }) => (
  <div className="p-6 sm:p-10">
    <SectionTitle>Our NFC Products</SectionTitle>
    <p className="text-gray-300 mb-10 max-w-4xl">
      We offer a selection of industry-leading NFC chips available in various formats (stickers, cards, keychains) and chip types. All products are fully customizable with your brand and data.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {nfcProducts.map((product) => (
        <ProductCard key={product.id} product={product} navigate={navigate} />
      ))}
    </div>

    <div className="mt-12 text-center bg-gray-800 p-8 rounded-2xl shadow-xl">
      <h3 className="text-3xl font-bold text-white mb-4">Need Customization?</h3>
      <p className="text-gray-400 mb-6 max-w-3xl mx-auto">
        We handle everything: custom printing, unique serialization, and complex NDEF data programming. Get exactly what you need.
      </p>
      <PrimaryButton onClick={() => navigate('order')}>
        Start a Custom Order
      </PrimaryButton>
    </div>
  </div>
);

const ProductCard = ({ product, navigate }) => {
  const Icon = product.icon;
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-indigo-600/70">
      <Icon className="w-12 h-12 text-indigo-400 mb-4" />
      <h3 className="text-3xl font-bold text-white mb-2">{product.name}</h3>
      <p className="text-indigo-400 font-medium mb-3">Capacity: {product.capacity}</p>
      <p className="text-gray-400 mb-4 text-base h-20 overflow-hidden">{product.description}</p>
      <div className="text-2xl font-bold text-white my-4">${product.price.toFixed(2)} <span className="text-sm font-normal text-gray-400">/ unit (in bulk)</span></div>
      <PrimaryButton onClick={() => navigate('order')} className="mt-4 !py-2 !px-4">
        Get Quote
      </PrimaryButton>
    </div>
  );
};

const OrderSection = () => {
  const [formData, setFormData] = useState({ chipType: '', quantity: '', customization: '', email: '' });
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    // --- Placeholder for API/Firestore Submission Logic ---
    const mockOrderDetails = {
      ...formData,
      timestamp: new Date().toISOString()
    };
    console.log("Submitting Order Request:", mockOrderDetails);

    // Simulate API delay
    setTimeout(() => {
      setSubmissionStatus('success');
      setFormData({ chipType: '', quantity: '', customization: '', email: '' });
    }, 1500);
  };

  const InputField = ({ label, name, type = 'text', children, className = '' }) => (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
          className="shadow appearance-none border-2 border-indigo-600/50 rounded-xl w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900/80 transition duration-200"
        >
          {children}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
          rows="4"
          className="shadow appearance-none border-2 border-indigo-600/50 rounded-xl w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900/80 transition duration-200"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          required
          className="shadow appearance-none border-2 border-indigo-600/50 rounded-xl w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900/80 transition duration-200"
        />
      )}
    </div>
  );

  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
      <SectionTitle className="!text-center">Place Your Custom Order</SectionTitle>
      <p className="text-gray-300 mb-8 text-center">
        Tell us about your project, and we'll get back to you with a competitive quote within one business day.
      </p>

      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-indigo-700/50">
        <form onSubmit={handleSubmit}>
          <InputField label="Chip Type / Format" name="chipType" type="select">
            <option value="" disabled>Select a product type...</option>
            {nfcProducts.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
            <option value="Custom">Other / Custom Requirement</option>
          </InputField>
          <InputField label="Quantity (Minimum 100)" name="quantity" type="number" />
          <InputField label="Email Address" name="email" type="email" />
          <InputField label="Customization & Data Requirements (Printing, NDEF programming, serialization, etc.)" name="customization" type="textarea" />

          <div className="mt-6">
            <PrimaryButton type="submit" disabled={submissionStatus === 'submitting'}>
              {submissionStatus === 'submitting' ? 'Submitting...' : 'Request a Quote'}
            </PrimaryButton>
          </div>

          {submissionStatus === 'success' && (
            <div className="mt-4 p-4 text-center bg-green-700/30 text-green-300 rounded-xl font-semibold">
              <span role="img" aria-label="Success">✅</span> Quote request submitted successfully! We will contact you shortly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};


const AboutSection = () => (
  <div className="p-6 sm:p-10 max-w-4xl mx-auto">
    <SectionTitle>About NFC Solutions Co.</SectionTitle>
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-indigo-700/50 space-y-6">
      <p className="text-lg text-gray-300">
        Founded in 2024, NFC Solutions Co. was born from a passion for seamless, secure, and smart interactions. We saw a gap in the market for high-quality, fully customized, and reliably programmed NFC chips. Our mission is to empower businesses and creatives to bridge the digital and physical worlds with simple, powerful tap technology.
      </p>

      <h3 className="text-3xl font-bold text-indigo-400 pt-4">Our Commitment</h3>
      <ul className="list-disc list-inside text-gray-400 space-y-2 pl-4">
        <li><span className="text-white font-medium">Precision Programming:</span> Ensuring every chip works exactly as intended, every time.</li>
        <li><span className="text-white font-medium">Ethical Sourcing:</span> Partnering only with certified suppliers for the highest-grade silicon and materials.</li>
        <li><span className="text-white font-medium">Scalability:</span> Supporting projects from small prototypes (100 units) to massive deployments (1 million+ units).</li>
      </ul>

      <p className="text-lg text-gray-300 pt-4">
        We believe that NFC is the next frontier in consumer engagement and operational efficiency. Let us be your partner in innovation.
      </p>
    </div>
  </div>
);

const ContactSection = () => {
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const mockContactDetails = {
      ...contactData,
      timestamp: new Date().toISOString()
    };
    console.log("Submitting Contact Form:", mockContactDetails);

    // Simulate API delay
    setTimeout(() => {
      setStatus('sent');
      setContactData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const ContactInput = ({ label, name, type = 'text' }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={contactData[name]}
          onChange={handleChange}
          required
          rows="5"
          className="shadow appearance-none border-2 border-indigo-600/50 rounded-xl w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900/80 transition duration-200"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={contactData[name]}
          onChange={handleChange}
          required
          className="shadow appearance-none border-2 border-indigo-600/50 rounded-xl w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900/80 transition duration-200"
        />
      )}
    </div>
  );


  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
      <SectionTitle className="!text-center">Get In Touch</SectionTitle>
      <p className="text-gray-300 mb-8 text-center">
        Have questions about compatibility, bulk pricing, or a custom project? We are ready to assist.
      </p>

      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-indigo-700/50">
        <div className="mb-8 space-y-2 text-center md:text-left">
            <p className="text-gray-300">Email: <a href="mailto:sales@nfcsolutions.com" className="text-indigo-400 hover:text-indigo-300">sales@nfcsolutions.com</a></p>
            <p className="text-gray-300">Phone: <a href="tel:+15551234567" className="text-indigo-400 hover:text-indigo-300">(555) 123-4567</a></p>
        </div>

        <form onSubmit={handleSubmit}>
          <ContactInput label="Your Name" name="name" />
          <ContactInput label="Your Email" name="email" type="email" />
          <ContactInput label="Your Message" name="message" type="textarea" />

          <div className="mt-6">
            <PrimaryButton type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </PrimaryButton>
          </div>

          {status === 'sent' && (
            <div className="mt-4 p-4 text-center bg-green-700/30 text-green-300 rounded-xl font-semibold">
              <span role="img" aria-label="Success">📬</span> Your message has been sent. We'll be in touch!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};


// --- Main App Component ---

const AppHeader = ({ currentPage, navigate }) => (
  <header className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm shadow-2xl z-50 md:sticky md:top-0 md:border-b-4 md:border-indigo-600/50">
    {/* Mobile Navigation (Bottom Bar) */}
    <nav className="flex justify-around items-center h-16 md:hidden">
      {NAV_ITEMS.map(({ name, icon: Icon, page }) => (
        <button
          key={page}
          onClick={() => navigate(page)}
          className={`flex flex-col items-center justify-center p-1 w-full h-full transition-colors duration-200
            ${currentPage === page ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`
          }
        >
          <Icon className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">{name}</span>
        </button>
      ))}
    </nav>

    {/* Desktop Navigation (Top Bar) */}
    <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <h1 className="text-3xl font-black text-white flex items-center">
            NFC <span className="text-indigo-400 ml-1">SOLUTIONS</span>
        </h1>
        <nav className="flex space-x-6">
            {NAV_ITEMS.map(({ name, page }) => (
                <button
                    key={page}
                    onClick={() => navigate(page)}
                    className={`text-lg font-semibold border-b-2 py-1 transition-all duration-300
                        ${currentPage === page
                            ? 'text-indigo-400 border-indigo-400'
                            : 'text-gray-300 border-transparent hover:border-white hover:text-white'
                        }`
                    }
                >
                    {name}
                </button>
            ))}
        </nav>
    </div>
  </header>
);

const AppFooter = () => (
    <footer className="bg-gray-900 border-t border-indigo-600/30 p-8 text-center mt-12">
        <div className="max-w-7xl mx-auto">
            <p className="text-gray-400 text-sm mb-4">
                © {new Date().getFullYear()} NFC Solutions Co. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4">
                <button className="text-gray-500 hover:text-indigo-400 transition-colors">Privacy Policy</button>
                <button className="text-gray-500 hover:text-indigo-400 transition-colors">Terms of Service</button>
            </div>
        </div>
    </footer>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSection = useMemo(() => {
    switch (currentPage) {
      case 'home':
        return <HomeSection navigate={navigate} />;
      case 'products':
        return <ProductSection navigate={navigate} />;
      case 'order':
        return <OrderSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection navigate={navigate} />;
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100 antialiased">
      {/* Tailwind CSS Script for dynamic loading */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Removed the problematic <style> block that was causing compiler errors.
        The necessary styling for mobile navigation offset is now handled using Tailwind classes.
      */}
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <AppHeader currentPage={currentPage} navigate={navigate} />

      {/* Applying padding-bottom (pb-16 = 4rem) only on mobile devices to prevent content 
          from being hidden behind the fixed bottom navigation bar, and unsetting it (md:pb-0) on desktop. */}
      <main className="max-w-7xl mx-auto pb-16 md:pb-0">
        {renderSection}
      </main>

      <AppFooter />
    </div>
  );
}

