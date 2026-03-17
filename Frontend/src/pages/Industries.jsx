import { Link } from "react-router-dom"
import o1 from "../assets/hero/o1.jpg"
import retail from "../assets/hero/retail.jpg"
import r2 from "../assets/hero/r2.jpg"
import man from "../assets/hero/man.jpg"
import h1 from "../assets/hero/h1.jpg"
import a1 from "../assets/hero/a1.jpg"
import e1 from "../assets/hero/e1.jpg"
import b1 from "../assets/hero/b1.jpg"
import g1 from "../assets/hero/g1.jpg"
import bank1 from "../assets/hero/bank1.jpg"

const industries = [
  {
    title: "Corporate / Office",
    desc: "Enhance internal communication with lobby displays, meeting room screens, KPI dashboards, and corporate announcements.",
    img: o1,
    cta: "Explore office solutions",
    path: "/industries/corporate"
  },
  {
    title: "Retail",
    desc: "Boost in-store engagement with promotional signage, interactive catalogs, digital price tags, and window displays.",
    img: retail,
    cta: "Explore retail solutions",
    reverse: true,
    path: "/industries/retail"
  },
  {
    title: "Hospitality & Restaurant",
    desc: "Digital menu boards, wayfinding displays, promotional screens, and in-room entertainment to elevate guest experience.",
    img: r2,
    cta: "Explore hospitality solutions",
    path: "/industries/restaurant"
  },
  {
    title: "Manufacturing",
    desc: "Real-time production dashboards, safety alerts, quality metrics, and operational KPIs displayed across factory floors.",
    img: man,
    cta: "Explore manufacturing solutions",
    reverse: true,
    path: "/industries/manufacturing"
  },
  {
    title: "Healthcare",
    desc: "Queue management systems, wayfinding signage, patient education screens, and digital notice boards across facilities.",
    img: h1,
    cta: "Explore healthcare solutions",
    path: "/industries/hospital"
  },
  {
    title: "Transportation",
    desc: "Real-time arrival/departure information, digital wayfinding, emergency alerts, and advertising displays for transit hubs.",
    img: a1,
    cta: "Explore transportation solutions",
    reverse: true,
    path: "/industries/transportation"
  },
  {
    title: "Education",
    desc: "Digital notice boards, campus navigation screens, classroom displays, and event communication for institutions.",
    img: e1,
    cta: "Explore education solutions",
    path: "/industries/education"
  },
  {
    title: "Personal Care",
    desc: "Promote services, offers, and wellness content using visually engaging digital screens inside salons and clinics.",
    img: b1,
    cta: "Explore personal care solutions",
    reverse: true,
    path: "/industries/personalcare"
  },
  {
    title: "Fitness",
    desc: "Motivational content, workout programs, achievements, and digital branding inside gyms and fitness centers.",
    img: g1,
    cta: "Explore fitness solutions",
    path: "/industries/fitness"
  },
  {
    title: "Banking & Finance",
    desc: "Engage customers with digital promotions, financial updates, service information, and real-time announcements.",
    img: bank1,
    cta: "Explore financial solutions",
    reverse: true,
    path: "/industries/banking"
  }
]

const Industries = () => {
  return (
    <div className="bg-sky-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Industries We Serve
        </h1>
        <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
          Tailored digital display solutions designed to elevate customer engagement, communication, and operational efficiency across industries.
        </p>
      </div>

      <div className="space-y-28">
        {industries.map((item, index) => (
          <div
            key={index}
            className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center"
          >
            <div className={item.reverse ? "md:order-2" : ""}>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-black">
                <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-[4/3]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              <Link
                to={item.path}
                className="inline-flex items-center gap-2 text-sky-600 font-semibold group mt-4"
              >
                {item.cta}
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-500 text-white transform transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Industries