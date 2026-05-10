import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AnnouncementBar from "./components/AnnouncementBar";
import CartDrawer from "./components/CartDrawer";
import DiscountPopup from "./components/DiscountPopup";
import LivePurchaseNotification from "./components/LivePurchaseNotification";
import StickyMobileCTA from "./components/StickyMobileCTA";
import WhatsAppButton from "./components/WhatsAppButton";
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

function App() {
  return (
    <LangProvider>
      <CartProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CartProvider>
    </LangProvider>
  );
}

export default App;
