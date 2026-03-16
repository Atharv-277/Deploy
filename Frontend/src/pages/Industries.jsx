import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const industries = [
  {
    title: "Corporate / Office",
    desc: "Enhance internal communication with lobby displays, meeting room screens, KPI dashboards, and corporate announcements.",
    img1: "/src/assets/hero/m4.jpg",
    img2: "/src/assets/hero/o1.jpg",
    cta: "Explore office solutions",
    path: "/industries/corporate"
  },
  {
    title: "Retail",
    desc: "Boost in-store engagement with promotional signage, interactive catalogs, digital price tags, and window displays.",
    img1: "/src/assets/hero/m3.jpg",
    img2: "/src/assets/hero/retail.jpg",
    cta: "Explore retail solutions",
    reverse: true,
    path: "/industries/retail"
  },
  {
    title: "Hospitality & Restaurant",
    desc: "Digital menu boards, wayfinding displays, promotional screens, and in-room entertainment to elevate guest experience.",
    img1: "/src/assets/hero/r1.jpg",
    img2: "/src/assets/hero/r2.jpg",
    cta: "Explore hospitality solutions",
    path: "/industries/restaurant"
  },
  {
    title: "Manufacturing",
    desc: "Real-time production dashboards, safety alerts, quality metrics, and operational KPIs displayed across factory floors.",
    img1: "/src/assets/hero/m1.jpg",
    img2: "/src/assets/hero/man.jpg",
    cta: "Explore manufacturing solutions",
    reverse: true,
    path: "/industries/manufacturing"
  },
  {
    title: "Healthcare",
    desc: "Queue management systems, wayfinding signage, patient education screens, and digital notice boards across facilities.",
    img1: "/src/assets/hero/m2.jpg",
    img2: "/src/assets/hero/h1.jpg",
    cta: "Explore healthcare solutions",
    path: "/industries/hospital"
  },
  {
    title: "Transportation",
    desc: "Real-time arrival/departure information, digital wayfinding, emergency alerts, and advertising displays for transit hubs.",
    img1: "/src/assets/hero/t1.jpg",
    img2: "/src/assets/hero/a1.jpg",
    cta: "Explore transportation solutions",
    reverse: true,
    path: "/industries/transportation"
  },
  {
    title: "Education",
    desc: "Digital notice boards, campus navigation screens, classroom displays, and event communication for institutions.",
    img1: "/src/assets/hero/e2.jpg",
    img2: "/src/assets/hero/e1.jpg",
    cta: "Explore education solutions",
    path: "/industries/education"
  },
  {
    title: "Personal Care",
    desc: "Promote services, offers, and wellness content using visually engaging digital screens inside salons and clinics.",
    img1: "/src/assets/hero/b2.jpg",
    img2: "/src/assets/hero/b1.jpg",
    cta: "Explore personal care solutions",
    reverse: true,
    path: "/industries/personalcare"
  },
  {
    title: "Fitness",
    desc: "Motivational content, workout programs, achievements, and digital branding inside gyms and fitness centers.",
    img1: "/src/assets/hero/g2.jpg",
    img2: "/src/assets/hero/g1.jpg",
    cta: "Explore fitness solutions",
    path: "/industries/fitness"
  },
  {
    title: "Banking & Finance",
    desc: "Engage customers with digital promotions, financial updates, service information, and real-time announcements.",
    img1: "/src/assets/hero/ba1.jpg",
    img2: "/src/assets/hero/bank1.jpg",
    cta: "Explore financial solutions",
    reverse: true,
    path: "/industries/banking"
  }
]

// Smooth auto image slider
const ImageSlider = ({ img1, img2, title }) => {
  const [showFirst, setShowFirst] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-[4/3]">
      <img
        src={img1}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover
          transition-all duration-[1600ms] ease-in-out
          ${showFirst ? "opacity-100 scale-100" : "opacity-0 scale-105"}
        `}
      />

      <img
        src={img2}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover
          transition-all duration-[1600ms] ease-in-out
          ${showFirst ? "opacity-0 scale-105" : "opacity-100 scale-100"}
        `}
      />

      <div className="absolute inset-0 bg-black/10" />
    </div>
  )
}

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
                <ImageSlider
                  img1={item.img1}
                  img2={item.img2}
                  title={item.title}
                />
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