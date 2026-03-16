import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-20 pb-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky-500/10 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-slate-800">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              A2K <span className="text-sky-500">Screens</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Delivering commercial-grade digital signage solutions across India.
              We help businesses transform physical spaces into powerful digital
              experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-sky-400 transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-sky-400 transition">Products</Link></li>
              <li><Link to="/industries" className="hover:text-sky-400 transition">Industries</Link></li>
              <li><Link to="/advertising-campaigns" className="hover:text-sky-400 transition">Advertising Campaigns</Link></li>
              <li><Link to="/signage-installations" className="hover:text-sky-400 transition">Signage Installations</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Industries</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/industries/retail" className="hover:text-sky-400 transition">Retail</Link></li>
              <li><Link to="/industries/corporate" className="hover:text-sky-400 transition">Corporate</Link></li>
              <li><Link to="/industries/restaurant" className="hover:text-sky-400 transition">Restaurants</Link></li>
              <li><Link to="/industries/hospital" className="hover:text-sky-400 transition">Healthcare</Link></li>
              <li><Link to="/industries/education" className="hover:text-sky-400 transition">Education</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>33/6/2, Lane 9 , Chandrabhaga Nagar, Dhankawadi, <br />Pune, Maharashtra 411046</li>
              <li>+91 8668223495</li>
              <li>contact@a2kscreens.in</li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-sky-500 transition cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-sky-500 transition cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-sky-500 transition cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} A2K Screens. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
}
