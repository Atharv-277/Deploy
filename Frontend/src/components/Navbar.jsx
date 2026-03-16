import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer group select-none">
      {/* Screen Icon */}
      <div className="relative">
        <div className="relative w-9 h-7 rounded-md border-2 border-sky-500 overflow-hidden group-hover:scale-110 transition-transform duration-300">
          {/* Live screen pulse */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/40 to-blue-400/40 animate-pulse" />
        </div>
        {/* Stand */}
        <div className="w-4 h-[2px] bg-sky-500 mx-auto mt-1" />
      </div>

      {/* Brand Text */}
<span className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">        A2K{" "}
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
            Screens
          </span>
          {/* Underline animation */}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-sky-500 to-blue-500 group-hover:w-full transition-all duration-300" />
        </span>
      </span>
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showOurWorkDropdown, setShowOurWorkDropdown] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#solutions") {
      const section = document.getElementById("solutions");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const navItem =
    "relative cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 transition after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-sky-500 after:to-blue-500 after:transition-all after:duration-300 hover:after:w-full";

  const handleSolutionsClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.getElementById("industries");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#industries");
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-slate-200" />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className={navItem}>
            Home
          </Link>
          {/* Products Dropdown */}
          <div className="relative" onMouseEnter={() => setShowProductsDropdown(true)} onMouseLeave={() => setShowProductsDropdown(false)}>
            <Link to="/products#display" className={navItem}>Products</Link>
            {showProductsDropdown && (
              <div className="absolute top-full left-0 pt-2 w-56">
                <div className="bg-white/95 backdrop-blur-xl rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                  <Link to="/products#display" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Display Solutions</Link>
                  <Link to="/products#kiosk" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Kiosk Solutions</Link>
                  <Link to="/products#interactive" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Interactive Solutions</Link>
                  <Link to="/products#mounting" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Mounting Solutions</Link>
                </div>
              </div>
            )}
          </div>
          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setShowServicesDropdown(true)} onMouseLeave={() => setShowServicesDropdown(false)}>
            <Link to="/services" className={navItem}>Services</Link>
            {showServicesDropdown && (
              <div className="absolute top-full left-0 pt-2 w-64">
                <div className="bg-white/95 backdrop-blur-xl rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                  <Link to="/services#advertising" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Advertising Services</Link>
                  <Link to="/services#software" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Software (CMS) Service</Link>
                  <Link to="/services#installation" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Installation Service</Link>
                  <Link to="/services#creative" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Creative (Design & Template) Service</Link>
                  <Link to="/services#consultation" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Expert Consultation</Link>
                  <Link to="/services#customization" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Customization & Integrations</Link>
                  <Link to="/services#training" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">User Training</Link>
                  <Link to="/services#support" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Technical Support</Link>
                  <Link to="/services#marketing" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Marketing for Your Brand</Link>
                </div>
              </div>
            )}
          </div>
          {/* Our Work Dropdown */}
          <div className="relative" onMouseEnter={() => setShowOurWorkDropdown(true)} onMouseLeave={() => setShowOurWorkDropdown(false)}>
            <span className={navItem}>Our Work</span>
            {showOurWorkDropdown && (
              <div className="absolute top-full left-0 pt-2 w-48">
                <div className="bg-white/95 backdrop-blur-xl rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                  <Link to="/advertising-campaigns" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Advertising Campaigns</Link>
                  <Link to="/signage-installations" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Signage Installations</Link>
                </div>
              </div>
            )}
          </div>
          {/* Solutions Dropdown */}
          <div className="relative" onMouseEnter={() => setShowSolutionsDropdown(true)} onMouseLeave={() => setShowSolutionsDropdown(false)}>
            <a href="/#industries" className={navItem} onClick={handleSolutionsClick}>Solutions</a>
            {showSolutionsDropdown && (
              <div className="absolute top-full left-0 pt-2 w-56">
                <div className="bg-white/95 backdrop-blur-xl rounded-lg shadow-lg border border-slate-200 overflow-hidden max-h-[500px] overflow-y-auto">
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 sticky top-0">Industries We Serve</div>
                  <Link to="/industries/corporate" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Corporate / Office</Link>
                  <Link to="/industries/retail" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Retail</Link>
                  <Link to="/industries/restaurant" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Hospitality & Restaurant</Link>
                  <Link to="/industries/manufacturing" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Manufacturing</Link>
                  <Link to="/industries/hospital" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Healthcare</Link>
                  <Link to="/industries/transportation" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Transportation</Link>
                  <Link to="/industries/education" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Education</Link>
                  <Link to="/industries/personalcare" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Personal Care</Link>
                  <Link to="/industries/fitness" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Fitness</Link>
                  <Link to="/industries/banking" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition">Banking & Finance</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="relative overflow-hidden px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-700
            bg-white border-2 border-slate-200
            shadow-sm hover:shadow-md transition group hover:border-slate-300"
          >
            <span className="relative z-10">Contact Us</span>
          </Link>
          
         <button
  onClick={() => navigate("/start-advertising")}
  className="relative overflow-hidden px-6 py-2.5 rounded-xl text-sm font-semibold text-white 
  bg-gradient-to-r from-sky-500 to-blue-500 
  shadow-md hover:shadow-lg transition group"
>
  <span className="relative z-10">Start Advertising</span>
  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition" />
</button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden relative bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            <Link to="/" className="py-3 text-sm font-medium text-slate-700 hover:text-sky-500 transition border-b border-slate-100" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>

            {/* Products */}
            <div>
              <button className="w-full flex justify-between items-center py-3 text-sm font-medium text-slate-700 hover:text-sky-500 transition border-b border-slate-100" onClick={() => setMobileSubmenu(mobileSubmenu === "products" ? null : "products")}>Products<svg className={`w-4 h-4 transition-transform ${mobileSubmenu === "products" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></button>
              {mobileSubmenu === "products" && (
                <div className="pl-4 pb-2 flex flex-col gap-1">
                  <Link to="/products#display" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Display Solutions</Link>
                  <Link to="/products#kiosk" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Kiosk Solutions</Link>
                  <Link to="/products#interactive" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Interactive Solutions</Link>
                  <Link to="/products#mounting" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Mounting Solutions</Link>
                </div>
              )}
            </div>
            {/* Services */}
            <div>
              <button className="w-full flex justify-between items-center py-3 text-sm font-medium text-slate-700 hover:text-sky-500 transition border-b border-slate-100" onClick={() => setMobileSubmenu(mobileSubmenu === "services" ? null : "services")}>Services<svg className={`w-4 h-4 transition-transform ${mobileSubmenu === "services" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></button>
              {mobileSubmenu === "services" && (
                <div className="pl-4 pb-2 flex flex-col gap-1">
                  <Link to="/services#advertising" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Advertising Services</Link>
                  <Link to="/services#software" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Software (CMS) Service</Link>
                  <Link to="/services#installation" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Installation Service</Link>
                  <Link to="/services#creative" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Creative (Design & Template) Service</Link>
                  <Link to="/services#consultation" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Expert Consultation</Link>
                  <Link to="/services#customization" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Customization & Integrations</Link>
                  <Link to="/services#training" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>User Training</Link>
                  <Link to="/services#support" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Technical Support</Link>
                  <Link to="/services#marketing" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Marketing for Your Brand</Link>
                </div>
              )}
            </div>
            {/* Our Work */}
            <div>
              <button className="w-full flex justify-between items-center py-3 text-sm font-medium text-slate-700 hover:text-sky-500 transition border-b border-slate-100" onClick={() => setMobileSubmenu(mobileSubmenu === "ourwork" ? null : "ourwork")}>Our Work<svg className={`w-4 h-4 transition-transform ${mobileSubmenu === "ourwork" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></button>
              {mobileSubmenu === "ourwork" && (
                <div className="pl-4 pb-2 flex flex-col gap-1">
                  <Link to="/advertising-campaigns" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Advertising Campaigns</Link>
                  <Link to="/signage-installations" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Signage Installations</Link>
                </div>
              )}
            </div>
            {/* Solutions */}
            <div>
              <button className="w-full flex justify-between items-center py-3 text-sm font-medium text-slate-700 hover:text-sky-500 transition border-b border-slate-100" onClick={() => setMobileSubmenu(mobileSubmenu === "solutions" ? null : "solutions")}>Solutions<svg className={`w-4 h-4 transition-transform ${mobileSubmenu === "solutions" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></button>
              {mobileSubmenu === "solutions" && (
                <div className="pl-4 pb-2 flex flex-col gap-1">
                  <Link to="/industries/corporate" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Corporate / Office</Link>
                  <Link to="/industries/retail" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Retail</Link>
                  <Link to="/industries/restaurant" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Hospitality & Restaurant</Link>
                  <Link to="/industries/manufacturing" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Manufacturing</Link>
                  <Link to="/industries/hospital" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Healthcare</Link>
                  <Link to="/industries/transportation" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Transportation</Link>
                  <Link to="/industries/education" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Education</Link>
                  <Link to="/industries/personalcare" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Personal Care</Link>
                  <Link to="/industries/fitness" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Fitness</Link>
                  <Link to="/industries/banking" className="py-2 text-sm text-slate-600 hover:text-sky-500" onClick={() => setMobileMenuOpen(false)}>Banking & Finance</Link>
                </div>
              )}
            </div>

            {/* Mobile CTA */}
            <div className="flex flex-col gap-3 pt-4">
              <Link
                to="/contact"
                className="text-center px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <button
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/start-advertising");
                }}
              >
                Start Advertising
              </button>
            </div>
          </div>
        </div>
      )}
      
    </nav>
  );
}