import m3 from "../assets/hero/m3.jpg";
import u1 from "../assets/hero/u1.jpg";
import o1 from "../assets/hero/o1.jpg";
import b4 from "../assets/hero/b4.jpg";
import bank1 from "../assets/hero/bank1.jpg";
import iban from "../assets/hero/iban.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Banking() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-blue-50 py-20">

  <div className="max-w-7xl mx-auto px-6">

    {/* Label */}
    <span className="inline-block px-4 py-1.5 rounded-full text-sm border border-slate-200 text-slate-600 mb-4">
      Trusted by 200+ financial institutions
    </span>

    {/* Heading */}
    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-slate-900 mb-12">
      {" "}
      <span className="bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent">
        Banking
      </span>
    </h1>

    {/* Image */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">

      <img
        src={iban}
        alt="Digital banking kiosk inside bank branch"
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
        <p className="text-3xl font-bold text-slate-900">45%</p>
        <p className="text-sm text-slate-500 mt-1">Lower Queue Time</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-slate-900">60%</p>
        <p className="text-sm text-slate-500 mt-1">Faster Service</p>
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
              src={u1}
              alt="Customer using digital kiosk in bank"
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
            Transform the In-Branch Banking Experience
          </h2>

          <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
            Self-service kiosks and digital displays empower customers to complete routine banking tasks, 
            explore financial products, and get assistance faster without waiting in long queues.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Account inquiries & service requests via kiosks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Digital promotion of loans, cards & schemes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Queue management & token display integration</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Enhanced privacy & faster customer servicing</span>
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
              Built for Modern Banking Operations
            </h2>
            <p className="mt-4 text-slate-600">
              Deliver smarter banking services across your branch network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={b4} alt="Self Service Banking Kiosk" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Self-Service Kiosks
                </h3>
                <p className="text-slate-600">
                  Enable customers to check balances, update details, and raise service requests.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={bank1} alt="Digital Banking Displays" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Digital Promotion Screens
                </h3>
                <p className="text-slate-600">
                  Highlight new loan offers, interest rates, and financial products dynamically.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={o1} alt="Queue Display Systems" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Queue Management Displays
                </h3>
                <p className="text-slate-600">
                  Keep customers informed with real-time token numbers and service counters.
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
            Banking That Moves at Digital Speed
          </h2>
          <p className="mt-5 text-slate-400 max-w-3xl mx-auto">
            Improve operational efficiency, customer satisfaction, and in-branch engagement.
          </p>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">40%</p>
              <h4 className="mt-2 font-semibold text-white">Reduced Wait Time</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Faster service delivery through self-service options.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">35%</p>
              <h4 className="mt-2 font-semibold text-white">Higher Cross-Sell</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Promote financial products at the right moment.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">50%</p>
              <h4 className="mt-2 font-semibold text-white">Faster Transactions</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Reduce teller workload with automation.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">95%</p>
              <h4 className="mt-2 font-semibold text-white">Customer Satisfaction</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Deliver modern, frictionless in-branch experiences.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
