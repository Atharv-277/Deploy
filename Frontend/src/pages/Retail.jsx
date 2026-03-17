import m3 from "../assets/hero/m3.jpg";
import m1 from "../assets/hero/m1.jpg";
import m2 from "../assets/hero/m2.jpg";
import ire from "../assets/hero/ire.jpg";
import r3 from "../assets/hero/r3.jpg";
import retail from "../assets/hero/retail.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Retail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-sky-50 py-20">
  <div className="max-w-7xl mx-auto px-6">

    <p className="text-sky-600 font-semibold text-sm tracking-wider uppercase mb-2">
      Industry
    </p>

    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-10">
      Retail Stores
    </h1>

    <div className="relative rounded-3xl overflow-hidden shadow-xl">

      <img
        src={ire}
        alt="Retail digital displays"
        className="w-full h-[300px] sm:h-[380px] md:h-[520px] object-cover transition duration-700 hover:scale-105"
      />

      <div className="absolute bottom-8 right-8">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition shadow-lg"
        >
          Business Enquiry →
        </Link>
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
              src={m3}
              alt="Customer interacting with digital kiosk in retail store"
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
            Transform the In-Store Shopping Experience
          </h2>

          <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
            Interactive displays and digital signage guide customers, showcase promotions, 
            and help shoppers discover products faster — driving higher engagement and conversion.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Interactive product discovery kiosks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Dynamic pricing & promotional screens</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Wayfinding displays for large stores</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-sm">✓</span>
              <span className="text-slate-700">Increased impulse purchases</span>
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
              Built for Modern Retail
            </h2>
            <p className="mt-4 text-slate-600">
              Digital display solutions designed to boost in-store performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={r3} alt="Product Discovery Kiosk" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Product Discovery Kiosks
                </h3>
                <p className="text-slate-600">
                  Let customers browse catalogs, compare products, and check availability instantly.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={retail} alt="Promotional Digital Signage" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Promotional Digital Signage
                </h3>
                <p className="text-slate-600">
                  Highlight offers, discounts, and seasonal campaigns at high-traffic zones.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition">
              <div className="h-48 overflow-hidden">
                <img src={m3} alt="Smart Shelf Displays" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Smart Shelf Displays
                </h3>
                <p className="text-slate-600">
                  Digital price tags and shelf screens for real-time pricing and product info.
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
            Retail That Converts Browsers into Buyers
          </h2>
          <p className="mt-5 text-slate-400 max-w-3xl mx-auto">
            Drive revenue growth with immersive in-store digital experiences.
          </p>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">35%</p>
              <h4 className="mt-2 font-semibold text-white">Higher Conversions</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Engaging screens influence purchase decisions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">40%</p>
              <h4 className="mt-2 font-semibold text-white">Longer Store Time</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Customers stay engaged with interactive content.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">30%</p>
              <h4 className="mt-2 font-semibold text-white">Higher Basket Size</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Upsell and cross-sell via digital prompts.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-4xl font-bold text-white">99.9%</p>
              <h4 className="mt-2 font-semibold text-white">System Reliability</h4>
              <p className="mt-3 text-slate-400 text-sm">
                Always-on displays for uninterrupted promotions.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
