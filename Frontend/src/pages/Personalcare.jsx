import m3 from "../assets/hero/m3.jpg";
import m1 from "../assets/hero/m1.jpg";
import b2 from "../assets/hero/b2.jpg";
import b1 from "../assets/hero/b1.jpg";
import s1 from "../assets/hero/s1.jpg";
import s2 from "../assets/hero/s2.jpg";
import iper from "../assets/hero/iper.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Personalcare() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-sky-50 py-20">

  <div className="max-w-7xl mx-auto px-6">

    {/* Label */}
    <span className="inline-block px-4 py-1.5 rounded-full text-sm border border-slate-200 text-slate-600 mb-4">
      Trusted by 180+ salons & wellness brands
    </span>

    {/* Heading */}
    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-slate-900 mb-12">
      {" "}
      <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
        Personal Care
      </span>
    </h1>

    {/* Image */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">

      <img
        src={iper}
        alt="Digital screen inside salon"
        className="w-full h-[520px] object-cover"
      />

      {/* CTA Button */}
      <div className="absolute bottom-8 right-8">
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-black font-medium hover:bg-slate-200 transition shadow-lg"
        >
          Business Enquiry
          <span className="transform transition group-hover:translate-x-1">→</span>
        </Link>
      </div>

    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-8 pt-12 max-w-lg">
      <div>
        <p className="text-3xl font-bold text-slate-900">30%</p>
        <p className="text-sm text-slate-500 mt-1">More Walk-ins</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-slate-900">45%</p>
        <p className="text-sm text-slate-500 mt-1">Faster Check-in</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-slate-900">99.9%</p>
        <p className="text-sm text-slate-500 mt-1">System Uptime</p>
      </div>
    </div>

  </div>

</section>

      {/* Real-World Impact Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={b2}
              alt="Customer using self check-in kiosk in salon"
              className="w-full h-[480px] object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">
            Real-World Impact
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Transform the Salon Experience
          </h2>

          <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
            Digital kiosks streamline appointment booking, while display screens showcase 
            services, offers, and premium treatments to boost upsells.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Self check-in & appointment booking</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Service menus & treatment highlights</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Promotional campaigns & seasonal offers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Reduced front-desk workload</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm tracking-widest text-slate-500 uppercase">
              Use Cases
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              Built for Salons & Wellness Centers
            </h2>
            <p className="mt-4 text-slate-600">
              Digital display solutions designed for beauty, spa, and personal care brands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={s2} alt="Appointment Booking Kiosk" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Appointment Kiosks
                </h3>
                <p className="text-slate-600">
                  Enable walk-in bookings and quick check-ins.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={b1} alt="Service Menu Displays" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Service Menu Displays
                </h3>
                <p className="text-slate-600">
                  Showcase treatments, packages, and pricing dynamically.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={s1} alt="Promotional Screens in Salon" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Promotional Screens
                </h3>
                <p className="text-slate-600">
                  Promote premium services and seasonal offers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section className="relative bg-[#0b0b0e] py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest text-slate-400 uppercase">
            Business Benefits
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Personal Care That Feels Premium
          </h2>
          <p className="mt-5 text-slate-400 max-w-3xl mx-auto">
            Deliver luxury experiences while improving operational efficiency.
          </p>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">30%</p>
              <h4 className="mt-2 font-semibold text-white">More Walk-ins</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Eye-catching screens attract customers.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">45%</p>
              <h4 className="mt-2 font-semibold text-white">Faster Check-in</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Self-service reduces waiting time.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">35%</p>
              <h4 className="mt-2 font-semibold text-white">Higher Upsells</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Promote premium services visually.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">99.9%</p>
              <h4 className="mt-2 font-semibold text-white">System Reliability</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Always-on displays for daily operations.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}