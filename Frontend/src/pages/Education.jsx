import m3 from "../assets/hero/m3.jpg";
import e2 from "../assets/hero/e2.jpg";
import iedu from "../assets/hero/iedu.jpg";
import e1 from "../assets/hero/e1.jpg";
import { useEffect } from "react";
import e3 from "../assets/hero/e3.jpg";
import b4 from "../assets/hero/b4.jpg";
import { Link } from "react-router-dom";

export default function Education() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-sky-50 py-20 animate__animated animate__fadeIn animate__slow">

  <div className="max-w-7xl mx-auto px-6">

    {/* Label */}
    <span className="inline-block px-4 py-1.5 rounded-full text-sm border border-slate-200 text-slate-600 mb-4">
      Trusted by 200+ schools & universities
    </span>

    {/* Heading */}
    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-slate-900 mb-12">
      {" "}
      <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
        Education
      </span>
    </h1>

    {/* Image */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">

      <img
        src={iedu}
        alt="Digital displays on educational campus"
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
        <p className="text-3xl font-bold text-slate-900">50%</p>
        <p className="text-sm text-slate-500 mt-1">Faster Communication</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-slate-900">40%</p>
        <p className="text-sm text-slate-500 mt-1">Higher Engagement</p>
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
              src={e2}
              alt="Students interacting with digital notice board"
              className="w-full h-[480px] object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-violet-600 uppercase mb-4">
            Real-World Impact
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Transform Campus Communication
          </h2>

          <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
            Digital signage ensures announcements, schedules, and emergency alerts 
            reach students and staff instantly across the campus.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Digital notice boards for announcements</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Wayfinding for large campuses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Timetables & exam schedules</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Emergency alerts & safety notices</span>
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
              Built for Educational Campuses
            </h2>
            <p className="mt-4 text-slate-600">
              Digital display solutions for schools, colleges, and universities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={e1} alt="Digital Notice Boards" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Digital Notice Boards
                </h3>
                <p className="text-slate-600">
                  Share campus news, events, and announcements in real-time.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={b4} alt="Campus Wayfinding" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Campus Wayfinding
                </h3>
                <p className="text-slate-600">
                  Help students and visitors navigate large campuses.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={e3} alt="Classroom Displays" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Classroom Displays
                </h3>
                <p className="text-slate-600">
                  Interactive screens for schedules and learning content.
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
            Education That Connects Everyone
          </h2>
          <p className="mt-5 text-slate-400 max-w-3xl mx-auto">
            Keep students informed, engaged, and safe with digital campus solutions.
          </p>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">50%</p>
              <h4 className="mt-2 font-semibold text-white">Faster Updates</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Instant communication across campus.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">40%</p>
              <h4 className="mt-2 font-semibold text-white">Higher Engagement</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Visual communication boosts attention.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">30%</p>
              <h4 className="mt-2 font-semibold text-white">Reduced Confusion</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Clear schedules and directions for students.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">99.9%</p>
              <h4 className="mt-2 font-semibold text-white">System Reliability</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Always-on campus communication.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}