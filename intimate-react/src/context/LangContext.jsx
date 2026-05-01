import { createContext, useContext, useState } from "react";

export const LangContext = createContext();

export const translations = {
  en: {
    heroTitle: "Stay Safe, Stay Hygienic",
    heroSubtitle:
      "Disposable toilet seat covers for hotels, offices, hospitals & travel. Eco-friendly · Anti-bacterial · Island-wide delivery.",
    shopNow: "Shop Now",
    learnMore: "Learn More",
    ourProducts: "Our Products",
    singleUse: "Single Use Pack",
    travelPack: "Travel Pack",
    enterprise: "Enterprise Pack",
    orderWhatsApp: "Order on WhatsApp",
    viewDetails: "View Details",
    freeDelivery: "Free Delivery",
    freeDeliveryNote: "on orders over LKR 3,000",
    lowStock: "Low Stock · Order Now",
    bestSeller: "Best Seller",
    budgetFriendly: "Budget Friendly",
    singleUseLabel: "Single Use",
  },
  si: {
    heroTitle: "ආරක්ෂිතව සිටින්න, සනීපාරක්ෂාවෙන් සිටින්න",
    heroSubtitle:
      "හෝටල්, කාර්යාල, රෝහල් සහ සංචාරය සඳහා ඒකවරණ වැසිකිලි ආසන ආවරණ. පරිසර හිතකාමී · ප්‍රතිජීවාණු · දිවයිනේ සෑම තැනකටම deliveryකරයි.",
    shopNow: "දැන් මිළදී ගන්න",
    learnMore: "තව දැනගන්න",
    ourProducts: "අපගේ නිෂ්පාදන",
    singleUse: "තනි භාවිත Pack",
    travelPack: "Travel Pack",
    enterprise: "Enterprise Pack",
    orderWhatsApp: "WhatsApp හරහා ඇණවුම් කරන්න",
    viewDetails: "සවිස්තර බලන්න",
    freeDelivery: "නොමිලේ Delivery",
    freeDeliveryNote: "LKR 3,000 ට වැඩි ඇණවුම් සඳහා",
    lowStock: "Stock අවසන් වෙමින් · දැන් ඇණවුම් කරන්න",
    bestSeller: "වැඩිපුරම විකිණෙන",
    budgetFriendly: "ලාභදායී",
    singleUseLabel: "තනි භාවිත",
  },
  ta: {
    heroTitle: "பாதுகாப்பாக இருங்கள், சுகாதாரமாக இருங்கள்",
    heroSubtitle:
      "ஹோட்டல்கள், அலுவலகங்கள், மருத்துவமனைகள் மற்றும் பயணத்திற்கான டிஸ்போஸபிள் கழிவறை இருக்கை கவர்கள். சுற்றுச்சூழல் நட்பு · பாக்டீரியா எதிர்ப்பு · தீவு முழுவதும் டெலிவரி.",
    shopNow: "இப்போது வாங்கவும்",
    learnMore: "மேலும் அறிக",
    ourProducts: "எங்கள் தயாரிப்புகள்",
    singleUse: "ஒரு முறை பயன்பாடு",
    travelPack: "பயண பேக்",
    enterprise: "நிறுவன பேக்",
    orderWhatsApp: "WhatsApp இல் ஆர்டர் செய்யுங்கள்",
    viewDetails: "விவரங்களை காண்க",
    freeDelivery: "இலவச டெலிவரி",
    freeDeliveryNote: "LKR 3,000 க்கு மேல் ஆர்டர்களுக்கு",
    lowStock: "குறைந்த இருப்பு · இப்போது ஆர்டர் செய்யுங்கள்",
    bestSeller: "அதிக விற்பனை",
    budgetFriendly: "சிக்கனமான",
    singleUseLabel: "ஒரு முறை பயன்பாடு",
  },
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
