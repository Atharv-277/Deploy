import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import ProductPage from "./pages/ProductPage.jsx";
import Industries from "./pages/Industries.jsx";
import Banking from "./pages/Banking.jsx";
import Corporate from "./pages/Corporate.jsx";
import Education from "./pages/Education.jsx";
import Fitness from "./pages/Fitness.jsx";
import Hospital from "./pages/Hospital.jsx";
import Manufacturing from "./pages/Manufacturing.jsx";
import Personalcare from "./pages/Personalcare.jsx";
import Restaurant from "./pages/Restaurant.jsx";
import Retail from "./pages/Retail.jsx";
import Transportation from "./pages/Transportation.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contactus from "./pages/Contactus.jsx";
import StartAdvertising from "./pages/StartAdvertising.jsx";
import GetQuote from "./pages/GetQuote.jsx";
import AdminNetworkPanel from "./pages/AdminNetworkPanel.jsx";
import {
  ADMIN_UNAUTHORIZED_EVENT,
  clearAdminToken,
  hasAdminToken,
  loginAdmin,
  verifyAdminSession,
} from "./utils/adminAuth";

const ADMIN_ROUTE_MAP = {
  "/": "/admin/home",
  "/products": "/admin/products",
  "/industries": "/admin/industries",
  "/services": "/admin/services",
  "/contact": "/admin/contact",
  "/industries/banking": "/admin/industries/banking",
  "/industries/corporate": "/admin/industries/corporate",
  "/industries/education": "/admin/industries/education",
  "/industries/fitness": "/admin/industries/fitness",
  "/industries/hospital": "/admin/industries/hospital",
  "/industries/manufacturing": "/admin/industries/manufacturing",
  "/industries/personalcare": "/admin/industries/personalcare",
  "/industries/restaurant": "/admin/industries/restaurant",
  "/industries/retail": "/admin/industries/retail",
  "/industries/transportation": "/admin/industries/transportation",
  "/advertising-campaigns": "/admin/advertising-campaigns",
  "/case-studies": "/admin/case-studies",
  "/signage-installations": "/admin/signage-installations",
  "/gallery": "/admin/gallery",
  "/contact_us": "/admin/contact_us",
  "/start-advertising": "/admin/start-advertising",
  "/get-quote": "/admin/get-quote",
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AdminPathSync() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminAuthenticated = hasAdminToken();
    if (!isAdminAuthenticated) {
      return;
    }

    if (location.pathname.startsWith("/admin")) {
      return;
    }

    const mapped = ADMIN_ROUTE_MAP[location.pathname];
    if (!mapped) {
      return;
    }

    navigate(`${mapped}${location.search}${location.hash}`, { replace: true });
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}

function AdminProtected({ children }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(hasAdminToken());
  const [isAuthenticated, setIsAuthenticated] = useState(hasAdminToken());

  useEffect(() => {
    let isActive = true;

    const validateExistingSession = async () => {
      if (!hasAdminToken()) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        await verifyAdminSession();
        if (isActive) {
          setIsAuthenticated(true);
          setError("");
        }
      } catch {
        clearAdminToken();
        if (isActive) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isActive) {
          setIsCheckingAuth(false);
        }
      }
    };

    const handleUnauthorized = () => {
      clearAdminToken();
      setPassword("");
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      setError("Session expired. Please sign in again.");
    };

    validateExistingSession();
    window.addEventListener(ADMIN_UNAUTHORIZED_EVENT, handleUnauthorized);

    return () => {
      isActive = false;
      window.removeEventListener(ADMIN_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      await loginAdmin(password);
      setIsAuthenticated(true);
      setError("");
    } catch (submitError) {
      setError(submitError.message || "Incorrect password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setPassword("");
    setError("");
    setIsAuthenticated(false);
  };

  if (isCheckingAuth) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-slate-50">
        <section className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-7 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Verifying Admin Session</h1>
          <p className="text-slate-600 text-sm">Checking backend authentication before loading admin tools.</p>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-slate-50">
        <section className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-7">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Access</h1>
          <p className="text-slate-600 text-sm mb-5">
            Enter the admin password to continue.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter password"
                autoFocus
                required
              />
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-sky-600 text-white font-medium px-4 py-2.5 hover:bg-sky-700"
            >
              {isSubmitting ? "Verifying..." : "Unlock Admin"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-4 flex justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="px-3 py-1.5 text-xs rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
        >
          Logout Admin
        </button>
      </div>
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AdminPathSync />
      <div className="min-h-screen bg-white">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              fontSize: "14px",
            },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin/home"
            element={
              <AdminProtected>
                <Home isAdminMode />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/latest-news"
            element={
              <AdminProtected>
                <Home isAdminMode />
              </AdminProtected>
            }
          />
          <Route path="/products" element={<ProductPage />} />
          <Route
            path="/admin/products"
            element={
              <AdminProtected>
                <ProductPage isAdminMode />
              </AdminProtected>
            }
          />
          <Route path="/industries" element={<Industries />} />
          <Route
            path="/admin/industries"
            element={
              <AdminProtected>
                <Industries />
              </AdminProtected>
            }
          />
          <Route path="/services" element={<Services />} />
          <Route
            path="/admin/services"
            element={
              <AdminProtected>
                <Services />
              </AdminProtected>
            }
          />
          <Route path="/industries/banking" element={<Banking />} />
          <Route
            path="/admin/industries/banking"
            element={
              <AdminProtected>
                <Banking />
              </AdminProtected>
            }
          />
          <Route path="/industries/corporate" element={<Corporate />} />
          <Route
            path="/admin/industries/corporate"
            element={
              <AdminProtected>
                <Corporate />
              </AdminProtected>
            }
          />
          <Route path="/industries/education" element={<Education />} />
          <Route
            path="/admin/industries/education"
            element={
              <AdminProtected>
                <Education />
              </AdminProtected>
            }
          />
          <Route path="/industries/fitness" element={<Fitness />} />
          <Route
            path="/admin/industries/fitness"
            element={
              <AdminProtected>
                <Fitness />
              </AdminProtected>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin/contact"
            element={
              <AdminProtected>
                <Contact />
              </AdminProtected>
            }
          />
          <Route path="/industries/hospital" element={<Hospital />} />
          <Route
            path="/admin/industries/hospital"
            element={
              <AdminProtected>
                <Hospital />
              </AdminProtected>
            }
          />
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route
            path="/admin/industries/manufacturing"
            element={
              <AdminProtected>
                <Manufacturing />
              </AdminProtected>
            }
          />
          <Route path="/industries/personalcare" element={<Personalcare />} />
          <Route
            path="/admin/industries/personalcare"
            element={
              <AdminProtected>
                <Personalcare />
              </AdminProtected>
            }
          />
          <Route path="/industries/restaurant" element={<Restaurant />} />
          <Route
            path="/admin/industries/restaurant"
            element={
              <AdminProtected>
                <Restaurant />
              </AdminProtected>
            }
          />
          <Route path="/industries/retail" element={<Retail />} />
          <Route
            path="/admin/industries/retail"
            element={
              <AdminProtected>
                <Retail />
              </AdminProtected>
            }
          />
          <Route path="/industries/transportation" element={<Transportation />} />
          <Route
            path="/admin/industries/transportation"
            element={
              <AdminProtected>
                <Transportation />
              </AdminProtected>
            }
          />
          <Route path="/advertising-campaigns" element={<CaseStudies />} />
          <Route
            path="/admin/advertising-campaigns"
            element={
              <AdminProtected>
                <CaseStudies isAdminMode />
              </AdminProtected>
            }
          />
          <Route path="/signage-installations" element={<Gallery />} />
          <Route
            path="/admin/signage-installations"
            element={
              <AdminProtected>
                <Gallery isAdminMode />
              </AdminProtected>
            }
          />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route
            path="/admin/case-studies"
            element={
              <AdminProtected>
                <CaseStudies isAdminMode />
              </AdminProtected>
            }
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/admin/gallery"
            element={
              <AdminProtected>
                <Gallery isAdminMode />
              </AdminProtected>
            }
          />
          <Route path="/contact_us" element={<Contactus></Contactus>}></Route>
          <Route
            path="/admin/contact_us"
            element={
              <AdminProtected>
                <Contactus />
              </AdminProtected>
            }
          />
          <Route path="/start-advertising" element={<StartAdvertising />} />
          <Route
            path="/admin/start-advertising"
            element={
              <AdminProtected>
                <StartAdvertising />
              </AdminProtected>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProtected>
                <AdminNetworkPanel />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/network"
            element={
              <AdminProtected>
                <AdminNetworkPanel />
              </AdminProtected>
            }
          />
          <Route path="/get-quote/:stateName" element={<GetQuote />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route
            path="/admin/get-quote/:stateName"
            element={
              <AdminProtected>
                <GetQuote />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/get-quote"
            element={
              <AdminProtected>
                <GetQuote />
              </AdminProtected>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;