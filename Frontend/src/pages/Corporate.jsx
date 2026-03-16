import m3 from "../assets/hero/m3.jpg";
import m1 from "../assets/hero/m1.jpg";
import icor from "../assets/hero/icor.jpg";
import o1 from "../assets/hero/o1.jpg";
import u1 from "../assets/hero/u1.jpg";
import ma1 from "../assets/hero/ma1.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Corporate() {
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
      Trusted by 300+ corporate offices
    </span>

    {/* Heading */}
    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-slate-900 mb-6">
     {" "}
      <span className="bg-gradient-to-r from-sky-700 to-slate-900 bg-clip-text text-transparent">
        Corporate Offices
      </span>
    </h1>

    

    {/* Image */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">

      <img
        src={icor}
        alt="Digital signage in corporate office lobby"
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
        <p className="text-3xl font-bold text-slate-900">40%</p>
        <p className="text-sm text-slate-500 mt-1">Faster Communication</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-slate-900">55%</p>
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
              src={o1}
              alt="Employees viewing digital display in office"
              className="w-full h-[480px] object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-slate-700 uppercase mb-4">
            Real-World Impact
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Transform Workplace Communication
          </h2>

          <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
            Digital notice boards and lobby displays ensure that important updates, KPIs, 
            and announcements reach employees and visitors instantly.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Company-wide announcements in real-time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Live KPIs and performance dashboards</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Meeting room schedules & directions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Enhanced visitor experience at reception</span>
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
              Built for Modern Workspaces
            </h2>
            <p className="mt-4 text-slate-600">
              Digital display solutions designed for corporate environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={o1} alt="Lobby Display" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Lobby Displays
                </h3>
                <p className="text-slate-600">
                  Welcome visitors with branded content, directions, and corporate messaging.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={u1} alt="Meeting Room Screens" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Meeting Room Screens
                </h3>
                <p className="text-slate-600">
                  Display schedules, agendas, and room availability outside meeting rooms.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={ma1} alt="Office KPI Dashboards" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  KPI Dashboards
                </h3>
                <p className="text-slate-600">
                  Real-time performance dashboards for teams and leadership.
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
            Smarter Communication for Modern Offices
          </h2>
          <p className="mt-5 text-slate-400 max-w-3xl mx-auto">
            Drive engagement, transparency, and operational efficiency across your organization.
          </p>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">45%</p>
              <h4 className="mt-2 font-semibold text-white">Improved Awareness</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Employees stay informed with live digital updates.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">50%</p>
              <h4 className="mt-2 font-semibold text-white">Higher Engagement</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Visual communication increases message retention.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">35%</p>
              <h4 className="mt-2 font-semibold text-white">Faster Decision Making</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Real-time dashboards accelerate leadership insights.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">99.9%</p>
              <h4 className="mt-2 font-semibold text-white">System Reliability</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Enterprise-grade uptime for mission-critical displays.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}