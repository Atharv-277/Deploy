import m3 from "../assets/hero/m3.jpg";
import m1 from "../assets/hero/m1.jpg";
import ihos from "../assets/hero/ihos.jpg";
import m2 from "../assets/hero/m2.jpg";
import h2 from "../assets/hero/h2.jpg";
import h1 from "../assets/hero/h1.jpg";
import t2 from "../assets/hero/t2.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hospital() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-sky-50 py-20">

  <div className="max-w-7xl mx-auto px-6">

    {/* Label */}
    <p className="text-sky-600 font-semibold text-sm tracking-wider uppercase mb-2">
      Industry
    </p>

    {/* Heading */}
    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
      Hospitals
    </h1>

    {/* Description */}
    

    {/* Image */}
    <div className="relative rounded-3xl overflow-hidden shadow-xl">

      <img
        src={ihos}
        alt="Restaurant self ordering kiosk"
        className="w-full h-[520px] object-cover"
      />

      {/* CTA Button */}
      <div className="absolute bottom-8 right-8">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition shadow-lg"
        >
          Business Enquiry →
        </Link>
      </div>

    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-10 mt-12 max-w-lg">
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
              src={m2}
              alt="Patient using self-service kiosk in hospital"
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
            Transform the Patient Journey
          </h2>

          <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
            Digital kiosks streamline patient check-in and registration, while wayfinding 
            screens guide visitors through large hospital campuses with ease.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Self check-in & appointment confirmation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Real-time queue & token displays</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Wayfinding for departments & labs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Patient education & awareness screens</span>
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
              Built for Healthcare Environments
            </h2>
            <p className="mt-4 text-slate-600">
              Digital solutions designed for hospitals, clinics, and diagnostic centers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={h2} alt="Patient Check-in Kiosk" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Patient Check-in Kiosks
                </h3>
                <p className="text-slate-600">
                  Speed up registration and reduce front-desk workload.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={h1} alt="Wayfinding Displays" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Wayfinding Displays
                </h3>
                <p className="text-slate-600">
                  Help patients and visitors navigate complex hospital layouts.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={t2} alt="Queue Management Screens" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Queue Management Displays
                </h3>
                <p className="text-slate-600">
                  Display token numbers and reduce perceived waiting time.
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
            Healthcare That Feels Human & Efficient
          </h2>
          <p className="mt-5 text-slate-400 max-w-3xl mx-auto">
            Deliver better care experiences while improving operational efficiency.
          </p>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">45%</p>
              <h4 className="mt-2 font-semibold text-white">Lower Wait Time</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Faster patient flow through self-service.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">35%</p>
              <h4 className="mt-2 font-semibold text-white">Higher Throughput</h4>
              <p className="mt-3 text-slate-400 text-sm">
                More patients served per hour.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">40%</p>
              <h4 className="mt-2 font-semibold text-white">Reduced Admin Load</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Staff can focus on care, not paperwork.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">99.9%</p>
              <h4 className="mt-2 font-semibold text-white">System Reliability</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Mission-critical uptime for hospital operations.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}