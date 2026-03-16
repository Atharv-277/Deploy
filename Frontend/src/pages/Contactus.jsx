import React from "react";

export default function Contactus() {
  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT SECTION */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Talk to Our Experts
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-xl">
            Got a question about Pickcel? Whether it’s pricing, setup,
            integrations, or partnerships — our team is just a message away.
          </p>

          {/* Info Card */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6 max-w-xl">
            <h3 className="text-lg font-semibold text-gray-800">
              Ask us Anything
            </h3>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✔</span>
                Expert guidance on everything from features to enterprise
                compliance.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✔</span>
                No bots, no delays — just real people helping you.
              </li>
            </ul>
          </div>

          {/* Ratings */}
          <div className="mt-8 flex items-center gap-10 text-gray-600">
            <div>
              <p className="font-semibold">G2</p>
              <p className="text-sm">4.9/5 on G2</p>
            </div>
            <div>
              <p className="font-semibold">Capterra</p>
              <p className="text-sm">4.6/5 on Capterra</p>
            </div>
          </div>

          <p className="mt-6 text-gray-600">
            Powering 150,000+ screens for 9,000+ businesses in 70+ countries.
          </p>

          {/* Locations */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold">INDIA</h4>
              <p className="text-sm mt-2">
                #918, 3rd Floor, 5th Main Road <br />
                Sector 7, HSR Layout, <br />
                Pune, Maharashtra, India <br />
                411046
              </p>
            </div>

            
          </div>

          {/* Client Logos */}
          <div className="mt-8 flex gap-6 text-gray-500 font-semibold text-sm">
            <span>Unilever</span>
            <span>Uber</span>
            <span>Amazon</span>
            <span>Decathlon</span>
          </div>
        </div>

        {/* RIGHT SECTION - FORM CARD */}
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
          <form className="space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name*
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Email Address*
              </label>
              <input
                type="email"
                placeholder="Enter your business email"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name/Website
              </label>
              <input
                type="text"
                placeholder="Enter website url"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <div className="flex gap-2 mt-1">
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>+91</option>
                  <option>+1</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                How many screens do you plan to start with?*
              </label>
              <select className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none">
                <option>Please select number of screens</option>
                <option>1-5</option>
                <option>6-20</option>
                <option>21-50</option>
                <option>50+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                What can we help you with?
              </label>
              <select className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none">
                <option>Select Your Query</option>
                <option>Pricing</option>
                <option>Setup</option>
                <option>Integration</option>
                <option>Partnership</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Get in Touch with an Expert
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}