import m3 from "../assets/hero/m3.jpg";
import m5 from "../assets/hero/m5.jpg";
import m2 from "../assets/hero/m2.jpg";
import r4 from "../assets/hero/r4.jpg";
import r2 from "../assets/hero/r2.jpg";
import ires from "../assets/hero/ires.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Restaurant() {
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
      Trusted by 500+ restaurant chains
    </span>

    {/* Heading */}
    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-slate-900 mb-6">
      {" "}
      <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
        Restaurants
      </span>
    </h1>

    

    {/* Image */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">

      <img
        src={ires}
        alt="Restaurant self ordering kiosk"
        className="w-full h-[300px] sm:h-[380px] md:h-[520px] object-cover"
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
        <p className="text-sm text-slate-500 mt-1">Higher Order Value</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900">50%</p>
        <p className="text-sm text-slate-500 mt-1">Faster Service</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900">99.9%</p>
        <p className="text-sm text-slate-500 mt-1">Uptime</p>
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
              src={m5}
              alt="Customer using self-service kiosk in restaurant"
              className="w-full h-[480px] object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase mb-4">
            Real-World Impact
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Transform the Way Guests Order
          </h2>

          <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
            Our self-service kiosks and digital menu boards create a seamless ordering experience. 
            Guests browse vivid menus, customize their meals, and pay — all without waiting in line.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">
                ✓
              </span>
              <span className="text-slate-700">
                Intuitive touchscreen interface for all ages
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">
                ✓
              </span>
              <span className="text-slate-700">
                Dynamic menu updates in real-time
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">
                ✓
              </span>
              <span className="text-slate-700">
                Integrated payment and loyalty programs
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">
                ✓
              </span>
              <span className="text-slate-700">
                Reduced wait times by up to 50%
              </span>
            </li>
          </ul>
        </div>
      </section>

{/* Use Cases Section */}
<section className="bg-white py-28">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <p className="text-sm tracking-widest text-slate-500 uppercase">
        Use Cases
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
        Built for Every Part of Your Restaurant
      </h2>
      <p className="mt-4 text-slate-600">
        From front-of-house ordering to back-of-house efficiency, our solutions cover every touchpoint.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Card 1 */}
      <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
        <div className="h-48 overflow-hidden">
          <img 
            src={r4} 
            alt="Self Order Kiosks" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Self-Order Kiosks
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Empower guests to browse menus, customize orders, and pay at interactive touchscreen stations.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
        <div className="h-48 overflow-hidden">
          <img 
            src={m5} 
            alt="Digital Menu Boards" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Hospitality 
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Create an inviting atmosphere with digital displays that showcase your brand, menu highlights, and promotions.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
        <div className="h-48 overflow-hidden">
          <img 
            src={r2} 
            alt="Promotional Screens" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Promotional Screens
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Run targeted promotions, upsell combos, and feature seasonal items on strategically placed displays.
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
    
    {/* Header */}
    <p className="text-sm tracking-widest text-slate-400 uppercase">
      Business Benefits
    </p>
    <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
      Measurable Impact on Your Bottom Line
    </h2>
    <p className="mt-5 text-slate-400 max-w-3xl mx-auto">
      Our digital solutions deliver real, quantifiable improvements across your operations.
    </p>

    {/* Stats Grid */}
    <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
      
      {/* Stat 1 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 text-white mb-6">
          ↗
        </div>
        <p className="text-4xl font-bold text-white">30%</p>
        <h4 className="mt-2 font-semibold text-white">
          Higher Average Order Value
        </h4>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          Smart upselling prompts and visual menus drive larger basket sizes at every transaction.
        </p>
      </div>

      {/* Stat 2 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 text-white mb-6">
          ⏱
        </div>
        <p className="text-4xl font-bold text-white">50%</p>
        <h4 className="mt-2 font-semibold text-white">
          Faster Service
        </h4>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          Parallel ordering through kiosks eliminates bottlenecks and keeps lines moving.
        </p>
      </div>

      {/* Stat 3 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 text-white mb-6">
          📈
        </div>
        <p className="text-4xl font-bold text-white">40%</p>
        <h4 className="mt-2 font-semibold text-white">
          Reduced Queue Times
        </h4>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          Distribute order flow across multiple kiosks to dramatically cut wait times during peak hours.
        </p>
      </div>

      {/* Stat 4 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 text-white mb-6">
          🙂
        </div>
        <p className="text-4xl font-bold text-white">95%</p>
        <h4 className="mt-2 font-semibold text-white">
          Customer Satisfaction
        </h4>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          Give guests control over their orders with an intuitive, personalized experience they love.
        </p>
      </div>

    </div>
  </div>
</section>
    </>
  );
}
