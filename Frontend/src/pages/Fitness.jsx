import bb1 from "../assets/hero/bb1.jpg";
import m1 from "../assets/hero/m1.jpg";
import g1 from "../assets/hero/g1.jpg";
import gy1 from "../assets/hero/gy1.jpg";
import gy2 from "../assets/hero/gy2.jpg";
import ifit from "../assets/hero/ifit.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Fitness() {
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
      Trusted by 220+ gyms & fitness studios
    </span>

    {/* Heading */}
    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-slate-900 mb-12">
      {" "}
      <span className="bg-gradient-to-r from-sky-500 to-sky-500 bg-clip-text text-transparent">
        Fitness Centers
      </span>
    </h1>

    {/* Image */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">

      <img
        src={ifit}
        alt="Digital screens inside modern gym"
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
        <p className="text-3xl font-bold text-slate-900">35%</p>
        <p className="text-sm text-slate-500 mt-1">Higher Attendance</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-slate-900">40%</p>
        <p className="text-sm text-slate-500 mt-1">Faster Check-in</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-slate-900">99.9%</p>
        <p className="text-sm text-slate-500 mt-1">Display Uptime</p>
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
              src={g1}
              alt="Member using self check-in kiosk at gym"
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
            Create a Smarter Fitness Experience
          </h2>

          <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
            Digital kiosks simplify member check-in, while workout screens and class schedules 
            keep members informed, motivated, and engaged throughout their fitness journey.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Self check-in & membership verification</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Live class schedules & trainer info</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Workout guidance & digital coaching screens</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Promote memberships & personal training plans</span>
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
              Built for Modern Fitness Centers
            </h2>
            <p className="mt-4 text-slate-600">
              Digital display solutions designed for gyms, studios, and wellness clubs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={gy1} alt="Self Check-in Kiosk" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Self Check-in Kiosks
                </h3>
                <p className="text-slate-600">
                  Enable quick, contactless entry for members.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={gy2} alt="Class Schedule Displays" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Class Schedule Displays
                </h3>
                <p className="text-slate-600">
                  Show live class timings and studio availability.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={bb1} alt="Workout Guidance Screens" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Workout Guidance Screens
                </h3>
                <p className="text-slate-600">
                  Display workout tips and digital coaching content.
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
            Fitness Experiences That Keep Members Coming Back
          </h2>
          <p className="mt-5 text-slate-400 max-w-3xl mx-auto">
            Increase retention, engagement, and operational efficiency with digital fitness solutions.
          </p>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">35%</p>
              <h4 className="mt-2 font-semibold text-white">Higher Attendance</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Members stay informed and motivated.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">40%</p>
              <h4 className="mt-2 font-semibold text-white">Faster Check-in</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Reduce front desk congestion.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">30%</p>
              <h4 className="mt-2 font-semibold text-white">Higher Upsells</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Promote personal training & premium plans.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">99.9%</p>
              <h4 className="mt-2 font-semibold text-white">System Reliability</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Always-on digital infrastructure.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
