import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminAnalytics from "./admin/pages/AdminAnalytics";
import AdminCustomers from "./admin/pages/AdminCustomers";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminInquiries from "./admin/pages/AdminInquiries";
import AdminNewsletter from "./admin/pages/AdminNewsletter";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminQuiz from "./admin/pages/AdminQuiz";
import AdminSettings from "./admin/pages/AdminSettings";
import AnnouncementBar from "./components/AnnouncementBar";
import CartDrawer from "./components/CartDrawer";
import DiscountPopup from "./components/DiscountPopup";
import LivePurchaseNotification from "./components/LivePurchaseNotification";
import StickyMobileCTA from "./components/StickyMobileCTA";
import WhatsAppButton from "./components/WhatsAppButton";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { CartProvider } from "./context/CartContext";
import { LangProvider } from "./context/LangContext";
import About from "./pages/About";
import B2B from "./pages/B2B";
import Benefits from "./pages/Benefits";
import Blog from "./pages/Blog";
import Compare from "./pages/Compare";
import Contact from "./pages/Contact";
import Delivery from "./pages/Delivery";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import OrderTemplate from "./pages/OrderTemplate";
import Product1 from "./pages/Product1";
import Product2 from "./pages/Product2";
import Product3 from "./pages/Product3";
import Products from "./pages/Products";
import Quiz from "./pages/Quiz";
import Referral from "./pages/Referral";
import Splash from "./pages/Splash";

function CustomerApp() {
  return (
    <>
      <AnnouncementBar />
      <WhatsAppButton />
      <DiscountPopup />
      <LivePurchaseNotification />
      <CartDrawer />
      <StickyMobileCTA />
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/1" element={<Product1 />} />
        <Route path="/products/2" element={<Product2 />} />
        <Route path="/products/3" element={<Product3 />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/b2b" element={<B2B />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/order" element={<OrderTemplate />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <LangProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* ── Admin routes (completely isolated, no customer overlays) ── */}
            <Route
              path="/admin"
              element={
                <AdminAuthProvider>
                  <AdminLogin />
                </AdminAuthProvider>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminAuthProvider>
                  <AdminLayout />
                </AdminAuthProvider>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
              <Route path="quiz" element={<AdminQuiz />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* ── Customer-facing routes ── */}
            <Route path="/*" element={<CustomerApp />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LangProvider>
  );
}

export default App;
