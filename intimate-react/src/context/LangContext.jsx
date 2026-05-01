import { createContext, useContext, useState } from "react";

export const LangContext = createContext();

export const translations = {
  en: {
    /* ---- Global / Shared ---- */
    heroTitle: "Stay Safe, Stay Hygienic",
    heroSubtitle:
      "Disposable toilet seat covers for hotels, offices, hospitals & travel. Eco-friendly · Anti-bacterial · Island-wide delivery.",
    shopNow: "Shop Now",
    learnMore: "Learn More",
    getStarted: "Get Started",
    orderOnWhatsApp: "Order on WhatsApp",
    viewDetails: "View Details",
    freeDelivery: "Free Delivery",
    freeDeliveryNote: "on orders over LKR 3,000",
    freeDeliveryUnlocked: "🎉 You've unlocked free delivery!",
    addMore: "Add LKR {0} more for free delivery",
    readyProtect: "Ready to Protect Your Health?",
    readyProtectSub:
      "Order today and experience the difference Hygenc Covers can make.",
    followJourney: "Follow Our Journey",
    followJourneySub: "See how customers are using our products every day",
    referEarn: "🎁 Refer & Earn 10% Off",
    followFacebook: "📘 Follow on Facebook",
    trustedBy: "Trusted by businesses across Sri Lanka",
    clients: "clients",
    /* ---- Nav / Footer ---- */
    navHome: "Home",
    navAbout: "About",
    navProducts: "Products",
    navBenefits: "Benefits",
    navBlog: "Blog",
    navB2B: "B2B",
    navFaq: "FAQ",
    navCompare: "Compare",
    navDelivery: "Delivery",
    navContact: "Contact",
    footerDesc:
      "Intimate Hygiene Enterprises provides premium hygienic toilet seat covers, designed for comfort, safety, and eco-friendliness. Protect yourself and the environment wherever you go.",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    footerRights: "All rights reserved.",
    /* ---- Products page ---- */
    ourProducts: "Our Products",
    ourProductsSub:
      "Explore our range of eco-friendly, disposable toilet seat covers designed for maximum safety.",
    singleUse: "Single Use Pack",
    singleUseDesc:
      "Perfect for individuals on the go. Hygienic, eco-friendly, and convenient for daily travel.",
    travelPack: "Travel Pack",
    travelPackDesc:
      "Waterproof and anti-slip, ideal for families and frequent travelers.",
    enterprise: "Enterprise Level",
    enterpriseDesc:
      "Bulk packs for offices, hotels, and businesses. Promote hygiene at scale efficiently.",
    lowStock: "🔴 Low Stock · Order Now",
    sellingFast: "🟡 Selling Fast",
    bestSeller: "Best Seller",
    budgetFriendly: "Budget Friendly",
    singleUseLabel: "Single Use",
    compareProducts: "Compare Products →",
    b2bBanner: "Business Owner? Get Bulk Discounts",
    b2bBannerSub:
      "Hotels, hospitals, offices & more — special enterprise pricing available.",
    enquireB2B: "Enquire B2B",
    /* ---- Home page ---- */
    statsLabel1: "Bacteria types per sq inch on toilet seats",
    statsLabel2: "Pathogen survival on unprotected surfaces",
    statsLabel3: "Protection provided by our covers",
    statsLabel4: "Happy customers & counting",
    whyChoose: "Why Choose Hygenc Covers?",
    maxHygiene: "Maximum Hygiene",
    maxHygieneDesc:
      "Our disposable covers provide a protective barrier against bacteria, keeping you safe in public restrooms.",
    ecoFriendly: "Eco-Friendly",
    ecoFriendlyDesc:
      "Made from biodegradable materials, our covers protect not only you but also the environment.",
    convenientPortable: "Convenient & Portable",
    convenientPortableDesc:
      "Compact packaging ensures you can carry them anywhere – perfect for travel, work, or daily use.",
    ourBestsellers: "Our Bestsellers",
    standardPack: "Standard Pack",
    standardPackDesc:
      "Perfect for individuals on the go. Stay protected anywhere.",
    travelKit: "Travel Kit",
    travelKitDesc: "Waterproof and anti-slip, great for family travel.",
    enterprisePack: "Enterprise Pack",
    enterprisePackDesc:
      "Specially designed for businesses, banks, and large organizations – bulk packs to ensure hygiene for all.",
    whatCustomersSay: "What Our Customers Say",
    /* ---- Certifications ---- */
    certEco: "Eco-Friendly Certified",
    certBacterial: "Anti-Bacterial Tested",
    certBio: "100% Biodegradable",
    certQuality: "Quality Assured",
    certHospital: "Hospital Grade",
    /* ---- Used By ---- */
    usedByHotels: "Hotels & Resorts",
    usedByHospitals: "Hospitals & Clinics",
    usedByOffices: "Corporate Offices",
    usedByAirlines: "Airlines & Airports",
    usedByUniversities: "Universities",
    usedByGovt: "Government Buildings",
    /* ---- About ---- */
    aboutHeroTitle: "About Intimate Hygiene Enterprises",
    aboutHeroSub:
      "Leading Sri Lanka's hygiene revolution with eco-friendly, disposable toilet seat covers trusted by hotels, hospitals, and businesses nationwide.",
    ourMission: "Our Mission",
    ourMissionText:
      "To make hygiene accessible to everyone. We believe that every person deserves a clean, safe restroom experience — whether at work, in transit, or in any public space.",
    ourVision: "Our Vision",
    ourVisionText:
      "To become Sri Lanka's most trusted hygiene brand, expanding across South Asia and beyond. We envision a world where public hygiene is no longer a concern.",
    ourValues: "Our Core Values",
    meetTeam: "Meet the Team",
    partnerWithUs: "Partner With Us",
    partnerWithUsSub:
      "Join our growing network of hotels, hospitals, offices, and businesses committed to hygiene.",
    getInTouch: "Get In Touch",
    valueInnovation: "Innovation",
    valueInnovationDesc:
      "We continuously improve our products to meet modern hygiene demands.",
    valueSustainability: "Sustainability",
    valueSustainabilityDesc:
      "Our eco-conscious approach ensures minimal environmental impact.",
    valueAccessibility: "Accessibility",
    valueAccessibilityDesc:
      "We design hygiene solutions that are affordable and available to all.",
    valueTrust: "Trust",
    valueTrustDesc:
      "Customer confidence is at the heart of everything we create.",
    valueHealth: "Health & Safety",
    valueHealthDesc:
      "Every product is developed to safeguard wellbeing in shared environments.",
    valueCare: "Customer Care",
    valueCareDesc:
      "We listen, adapt, and provide exceptional support to our community.",
    /* ---- Benefits ---- */
    benefitsHeroTitle: "Why Our Covers Make a Difference",
    benefitsHeroSub:
      "Discover the science and practicality behind Hygenc disposable toilet seat covers.",
    benefitsTitle: "Health Benefits",
    maxHygieneBenefit: "Maximum Hygiene",
    maxHygieneBenefitDesc:
      "Protects against germs, bacteria, and viruses found on public toilet seats. Even cleaned toilets may harbor microscopic bacteria. Using our seat covers provides a barrier, significantly reducing the risk of infections or illnesses.",
    ecoFriendlyBenefit: "Eco-Friendly",
    ecoFriendlyBenefitDesc:
      "Made from biodegradable and compostable materials, our covers naturally decompose without harming the environment. Safe for septic systems and wastewater treatment, they reduce plastic pollution while promoting sustainable sanitation.",
    waterSaving: "Water Saving",
    waterSavingDesc:
      "Flushable covers dissolve easily, helping to minimize water usage. Compared to traditional cleaning methods that use multiple liters of water per toilet, our covers provide an eco-conscious solution that saves water while maintaining hygiene.",
    laborSaving: "Labor Saving",
    laborSavingDesc:
      "Reduces the cleaning workload for staff by preventing direct contamination of toilet surfaces. Less frequent scrubbing and disinfection are needed, which saves time and reduces the use of harsh chemicals in public restrooms.",
    portable: "Portable & Convenient",
    portableDesc:
      "Compact, lightweight, and easy to carry in bags, purses, or pockets. Whether traveling, working in offices, or visiting gyms, these seat covers offer on-the-go hygiene without bulk or hassle.",
    familyFriendly: "Family-Friendly",
    familyFriendlyDesc:
      "Safe for children, seniors, pregnant women, and anyone using public restrooms. The covers provide peace of mind for parents and caregivers, ensuring that every family member stays protected from germs and contamination.",
    expertRecommended: "Expert Recommended",
    expertRecommendedDesc:
      "Healthcare professionals endorse the use of disposable seat covers as a simple, effective hygiene measure. They are recommended in hospitals, clinics, and high-traffic public facilities to prevent the spread of germs.",
    /* ---- FAQ ---- */
    faqHeroTitle: "Frequently Asked Questions",
    faqHeroSub:
      "Everything you need to know about our products, delivery, and hygiene.",
    faqCat1: "Product-Specific Questions",
    faqCat2: "Hygiene & Safety",
    faqCat3: "Practical Use",
    faqCat4: "Environmental Concerns",
    faqCat5: "Water & Labor Saving",
    stillHaveQ: "Still have questions?",
    stillHaveQSub: "We're here to help.",
    contactUsBtn: "Contact Us",
    /* ---- Contact ---- */
    contactHeroTitle: "Get In Touch",
    contactHeroSub:
      "Have a question, need a bulk quote, or want to partner with us? We'd love to hear from you.",
    sendMessage: "Send Us a Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    yourMessage: "Your Message",
    send: "Send Message",
    messageSent: "✅ Message sent! We'll get back to you shortly.",
    /* ---- Splash ---- */
    splashWelcome: "Welcome to Intimate Hygiene Enterprises",
    /* ---- Compare ---- */
    compareHeroTitle: "Compare Our Products",
    compareHeroSub: "Find the perfect toilet seat cover for your needs.",
    needHelp: "Need help choosing?",
    needHelpSub: "WhatsApp us — we'll recommend the right pack for your needs.",
    askOnWhatsApp: "Ask on WhatsApp",
    /* ---- Delivery ---- */
    deliveryHeroTitle: "Delivery Information",
    deliveryHeroSub: "Fast, reliable island-wide delivery to your doorstep.",
    deliveryZones: "Delivery Zones",
    paymentMethods: "Payment Methods",
    howToOrder: "How to Place an Order",
    deliveryFaqs: "Delivery FAQs",
    deliveryZone: "Zone",
    deliveryAreas: "Areas",
    deliveryTime: "Delivery Time",
    deliveryFee: "Delivery Fee",
    freeFrom: "Free From",
    /* ---- Order Template ---- */
    orderHeroTitle: "Order Confirmation Builder",
    orderHeroSub:
      "Fill in your details below and send a ready-made order message directly on WhatsApp.",
    name: "Name",
    address: "Delivery Address",
    product: "Product",
    quantity: "Quantity",
    payment: "Payment Method",
    note: "Special Note (optional)",
    sendOnWhatsApp: "Send on WhatsApp",
    copyMessage: "Copy Message",
    copied: "Copied!",
    livePreview: "Live Message Preview",
    /* ---- Blog ---- */
    blogHeroTitle: "Hygiene Insights",
    blogHeroSub: "Expert articles on hygiene, travel safety, and eco-living.",
    readMore: "Read More",
    showLess: "Show Less",
    /* ---- B2B ---- */
    b2bHeroTitle: "Bulk Orders & B2B Pricing",
    b2bHeroSub:
      "Wholesale pricing for hotels, hospitals, offices, and institutions.",
    enquireNow: "Enquire Now",
    /* ---- Referral ---- */
    referralHeroTitle: "Give 10% · Get 10%",
    referralHeroSub:
      "Refer a friend and both of you get 10% off your next order.",
    yourNameLabel: "Your Name",
    generateLink: "Generate Share Message",
    shareOnWhatsApp: "Share on WhatsApp",
    /* ---- Product Detail ---- */
    howToUse: "How To Use",
    step1Title: "Open the Pack",
    step1Desc:
      "Remove one cover from the hygienic packaging. Each cover is individually sealed for freshness.",
    step2Title: "Place on Seat",
    step2Desc:
      "Unfold and lay the cover flat on the toilet seat. The natural fit ensures full coverage with no slipping.",
    step3Title: "Use & Dispose",
    step3Desc:
      "After use, the cover can be flushed (Enterprise Pack) or disposed in the bin. No mess, no fuss.",
    hygieneDifference: "The Hygiene Difference",
    withoutCover: "Without a Cover",
    withCover: "With Our Cover",
    withoutItems: [
      "Up to 295 bacteria types on toilet seat surface",
      "E. coli, Staphylococcus & Streptococcus present",
      "Pathogens survive up to 48 hours on surfaces",
      "Direct skin-to-surface contact with contamination",
      "Risk of UTIs and skin infections",
    ],
    withItems: [
      "99% bacterial protection with anti-bacterial layer",
      "Complete physical barrier between you and the seat",
      "Eco-friendly, biodegradable material — zero guilt",
      "Fits any standard toilet seat securely",
      "Compact enough to carry everywhere you go",
    ],
    quantityLabel: "Quantity (packs):",
    customerReviews: "Customer Reviews",
    /* ---- Discount Popup ---- */
    popupTitle: "Welcome! Here's 5% Off",
    popupSub: "Use code below on your first order:",
    popupExpiry: "Valid for 24 hours · First order only",
    redeemWhatsApp: "Redeem on WhatsApp",
    copyCode: "Copy Code",
    popupCopied: "Copied!",
    /* ---- Delivery Progress Bar ---- */
    deliveryProgressUnlocked: "🎉 You've unlocked free delivery!",
    deliveryProgressAdd: "Add LKR {0} more for",
    deliveryProgressFree: "free delivery",
  },

  /* =================== SINHALA =================== */
  si: {
    heroTitle: "ආරක්ෂිතව සිටින්න, සනීපාරක්ෂාවෙන් සිටින්න",
    heroSubtitle:
      "හෝටල්, කාර්යාල, රෝහල් සහ සංචාරය සඳහා ඒකවරණ වැසිකිලි ආසන ආවරණ. පරිසර හිතකාමී · ප්‍රතිජීවාණු · දිවයිනේ සෑම තැනකටම delivery කරයි.",
    shopNow: "දැන් මිළදී ගන්න",
    learnMore: "තව දැනගන්න",
    getStarted: "ආරම්භ කරන්න",
    orderOnWhatsApp: "WhatsApp හරහා ඇණවුම් කරන්න",
    viewDetails: "සවිස්තර බලන්න",
    freeDelivery: "නොමිලේ Delivery",
    freeDeliveryNote: "LKR 3,000 ට වැඩි ඇණවුම් සඳහා",
    freeDeliveryUnlocked: "🎉 නොමිලේ delivery ලැබුණා!",
    addMore: "නොමිලේ delivery සඳහා LKR {0} ක් වැඩිපුර ඇණවුම් කරන්න",
    readyProtect: "ඔබේ සෞඛ්‍යය ආරක්ෂා කිරීමට සූදානම්ද?",
    readyProtectSub: "අද ඇණවුම් කර Hygenc Covers හි වෙනස දැනෙන්න.",
    followJourney: "අපගේ ගමන අනුගමනය කරන්න",
    followJourneySub: "ගනුදෙනුකරුවන් දිනෙන් දින නිෂ්පාදන භාවිත කරන ආකාරය බලන්න",
    referEarn: "🎁 යොමු කර 10% වට්ටමක් දිනන්න",
    followFacebook: "📘 Facebook හි Follow කරන්න",
    trustedBy: "ශ්‍රී ලංකාවේ ව්‍යාපාර විසින් විශ්වාස කරනු ලැබේ",
    clients: "ගනුදෙනුකරුවන්",
    navHome: "මුල් පිටුව",
    navAbout: "අප ගැන",
    navProducts: "නිෂ්පාදන",
    navBenefits: "ප්‍රතිලාභ",
    navBlog: "බ්ලොග්",
    navB2B: "B2B",
    navFaq: "ප්‍ර.උ.ප.",
    navCompare: "සංසන්දනය",
    navDelivery: "Delivery",
    navContact: "සම්බන්ධ වන්න",
    footerDesc:
      "Intimate Hygiene Enterprises ප්‍රිමියම් සනීපාරක්ෂාකාරී වැසිකිලි ආසන ආවරණ සපයන ව්‍යාපාරයකි.",
    quickLinks: "ශීඝ්‍ර සබැඳි",
    contactUs: "සම්බන්ධ වන්න",
    footerRights: "සියලු හිමිකම් ඇවිරිණි.",
    ourProducts: "අපගේ නිෂ්පාදන",
    ourProductsSub:
      "ඔබේ ආරක්ෂාව සඳහා නිර්මිත eco-friendly, ඒකවරණ වැසිකිලි ආසන ආවරණ.",
    singleUse: "තනි භාවිත Pack",
    singleUseDesc: "ගමන් යන්නන් සඳහා පරිපූර්ණයි. සනීපාරක්ෂාකාරී, eco-friendly.",
    travelPack: "Travel Pack",
    travelPackDesc: "ජලනිරෝධී සහ anti-slip, පවුල් සහ නිතර ගමන් යන්නන් සඳහා.",
    enterprise: "Enterprise Level",
    enterpriseDesc: "කාර්යාල, හෝටල් සහ ව්‍යාපාර සඳහා bulk packs.",
    lowStock: "🔴 Stock අවසන් වෙමින් · දැන් ඇණවුම් කරන්න",
    sellingFast: "🟡 ඉක්මනින් විකිණෙමින්",
    bestSeller: "වැඩිපුරම විකිණෙන",
    budgetFriendly: "ලාභදායී",
    singleUseLabel: "තනි භාවිත",
    compareProducts: "නිෂ්පාදන සංසන්දනය →",
    b2bBanner: "ව්‍යාපාරිකයෙක්ද? Bulk වට්ටම් ලබාගන්න",
    b2bBannerSub: "හෝටල්, රෝහල්, කාර්යාල සහ තවත් — විශේෂ ව්‍යාපාරික මිලකරණ.",
    enquireB2B: "B2B විමසන්න",
    statsLabel1: "වැසිකිලි ආසනවල sq inch එකකට bacteria වර්ග",
    statsLabel2: "ආරක්ෂාවක් නොමැති මතුපිට pathogen පැවැත්ම",
    statsLabel3: "අපගේ ආවරණ ලබා දෙන ආරක්ෂාව",
    statsLabel4: "සතුටු ගනුදෙනුකරුවන් සහ ගණනාව",
    whyChoose: "Hygenc Covers තෝරා ගන්නේ ඇයි?",
    maxHygiene: "උපරිම සනීපාරක්ෂාව",
    maxHygieneDesc:
      "අපගේ ඒකවරණ ආවරණ bacteria වලට එරෙහිව ආරක්ෂාකාරී බාධකයක් ලබා දෙයි.",
    ecoFriendly: "Eco-Friendly",
    ecoFriendlyDesc:
      "biodegradable ද්‍රව්‍ය වලින් නිෂ්පාදිත, ඔබව සහ පරිසරය ආරක්ෂා කරයි.",
    convenientPortable: "පහසු සහ ගෙන යා හැකි",
    convenientPortableDesc:
      "ඕනෑම තැනකට ගෙනයාමට පහසු — ගමන, රැකියාව, හෝ දෛනික භාවිතය සඳහා.",
    ourBestsellers: "අපගේ හොඳම නිෂ්පාදන",
    standardPack: "Standard Pack",
    standardPackDesc: "ගමන් යන්නන් සඳහා. ඕනෑම තැන ආරක්ෂිතව සිටින්න.",
    travelKit: "Travel Kit",
    travelKitDesc: "ජලනිරෝධී සහ anti-slip, පවුල් ගමන් සඳහා.",
    enterprisePack: "Enterprise Pack",
    enterprisePackDesc: "ව්‍යාපාර, බැංකු සහ ආයතන සඳහා නිර්මිත bulk packs.",
    whatCustomersSay: "ගනුදෙනුකරුවන් කියන දේ",
    certEco: "Eco-Friendly සහතිකය",
    certBacterial: "Anti-Bacterial පරීක්ෂාව",
    certBio: "100% Biodegradable",
    certQuality: "ගුණාත්මකභාවය සහතිකය",
    certHospital: "රෝහල් ශ්‍රේණිය",
    usedByHotels: "හෝටල් සහ නිවාස",
    usedByHospitals: "රෝහල් සහ සායන",
    usedByOffices: "ආයතනික කාර්යාල",
    usedByAirlines: "ගුවන් සේවා",
    usedByUniversities: "විශ්ව විද්‍යාල",
    usedByGovt: "රජයේ ගොඩනැගිලි",
    aboutHeroTitle: "Intimate Hygiene Enterprises ගැන",
    aboutHeroSub:
      "හෝටල්, රෝහල් සහ ව්‍යාපාර විශ්වාස කරන eco-friendly ආවරණ සමඟ ශ්‍රී ලංකාවේ සනීපාරක්ෂා විප්ලවය නායකත්වය ගනිමු.",
    ourMission: "අපගේ මෙහෙවර",
    ourMissionText:
      "සෑම කෙනෙකුටම සනීපාරක්ෂාව ලබා දෙන්න. සෑම කෙනෙකුටම පිරිසිදු, ආරක්ෂිත වැසිකිලි අත්දැකීමක් ලැබිය යුතු බව අපි විශ්වාස කරමු.",
    ourVision: "අපගේ දැක්ම",
    ourVisionText:
      "ශ්‍රී ලංකාවේ වඩාත්ම විශ්වාසනීය සනීපාරක්ෂා brand එක වීම සහ දකුණු ආසියාව පුරා ව්‍යාප්ත වීම.",
    ourValues: "අපගේ මූලික වටිනාකම්",
    meetTeam: "කණ්ඩායම හඳුනන්න",
    partnerWithUs: "අප සමඟ හවුල් වන්න",
    partnerWithUsSub:
      "සනීපාරක්ෂාවට කැපවූ හෝටල්, රෝහල්, කාර්යාල ජාලයට සම්බන්ධ වන්න.",
    getInTouch: "සම්බන්ධ වන්න",
    valueInnovation: "නව නිපැයුම",
    valueInnovationDesc:
      "නවීන සනීපාරක්ෂා ඉල්ලීම් සපුරාලීමට අපි නිරන්තරයෙන් නිෂ්පාදන ඉහළ නංවමු.",
    valueSustainability: "තිරසාරත්වය",
    valueSustainabilityDesc:
      "අපගේ eco-conscious ප්‍රවේශය අවම පාරිසරික බලපෑමක් සහතික කරයි.",
    valueAccessibility: "ප්‍රවේශ්‍යතාව",
    valueAccessibilityDesc:
      "ලාභදායී සහ සෑම කෙනෙකුට ලබා ගත හැකි සනීපාරක්ෂා විසඳුම් නිර්මාණය කරමු.",
    valueTrust: "විශ්වාසය",
    valueTrustDesc: "ගනුදෙනුකරු විශ්වාසය අපි නිර්මාණය කරන සෑම දෙයකම හදවතේ ඇත.",
    valueHealth: "සෞඛ්‍යය සහ ආරක්ෂාව",
    valueHealthDesc:
      "සෑම නිෂ්පාදනයක්ම හංසාරක පරිසරවල යහොස් ආරක්ෂා කිරීමට සංවර්ධනය කෙරේ.",
    valueCare: "ගනුදෙනුකරු සේවය",
    valueCareDesc:
      "අපි සවන් දෙමු, අනුවර්තනය වෙමු, සහ ගනුදෙනුකරුවන්ට ඉහළ සහාය ලබා දෙමු.",
    benefitsHeroTitle: "අපගේ ආවරණ ඇයි වෙනස් කරන්නේ",
    benefitsHeroSub:
      "Hygenc ඒකවරණ වැසිකිලි ආසන ආවරණ පිළිබඳ විද්‍යාව සහ ප්‍රායෝගිකත්වය සොයා ගන්න.",
    benefitsTitle: "සෞඛ්‍ය ප්‍රතිලාභ",
    maxHygieneBenefit: "උපරිම සනීපාරක්ෂාව",
    maxHygieneBenefitDesc:
      "සාර්ථක වැසිකිලි ආසනවල ඇති bacteria, ජීවාණු සහ වෛරස් වලින් ආරක්ෂා කරයි.",
    ecoFriendlyBenefit: "Eco-Friendly",
    ecoFriendlyBenefitDesc:
      "biodegradable ද්‍රව්‍ය වලින් නිෂ්පාදිත, plastic දූෂණය අඩු කරයි.",
    waterSaving: "ජල ඉතිරිය",
    waterSavingDesc:
      "Flushable ආවරණ ජලයේ පහසුවෙන් දිය වෙයි, ජල භාවිතය අඩු කිරීමට උපකාරී වේ.",
    laborSaving: "ශ්‍රම ඉතිරිය",
    laborSavingDesc:
      "වැසිකිලි මතුපිට සෘජු දූෂණය වළකා ගැනීමෙන් කාර්ය මණ්ඩලයේ පිරිසිදු කිරීමේ කාර්යය අඩු කරයි.",
    portable: "ගෙන යා හැකි සහ පහසු",
    portableDesc:
      "බෑග්, මලු, හෝ කාශේ ගෙන යාමට සුදුසු. ගමන, කාර්යාල, හෝ ව්‍යායාම ශාලා සඳහා.",
    familyFriendly: "පවුලට හිතකර",
    familyFriendlyDesc:
      "ළමයින්, වැඩිහිටියන්, ගර්භණී කාන්තාවන් සහ ඕනෑම කෙනෙකුට ආරක්ෂිතයි.",
    expertRecommended: "විශේෂඥයින් නිර්දේශ කරයි",
    expertRecommendedDesc:
      "සෞඛ්‍ය වෘත්තිකයන් ඒකවරණ ආසන ආවරණ සරල, ඵලදායී සනීපාරක්ෂාකාරී පියවරක් ලෙස නිර්දේශ කරයි.",
    faqHeroTitle: "නිතර අසන ප්‍රශ්න",
    faqHeroSub:
      "නිෂ්පාදන, delivery සහ සනීපාරක්ෂාව ගැන ඔබට දැන ගැනීමට අවශ්‍ය සියල්ල.",
    faqCat1: "නිෂ්පාදනයට සංකිර්ණ ප්‍රශ්න",
    faqCat2: "සනීපාරක්ෂාව සහ ආරක්ෂාව",
    faqCat3: "ප්‍රායෝගික භාවිතය",
    faqCat4: "පරිසර සැලකිලි",
    faqCat5: "ජල සහ ශ්‍රම ඉතිරිය",
    stillHaveQ: "තවමත් ප්‍රශ්න ඇද්ද?",
    stillHaveQSub: "අපි සහාය දීමට සූදානම්.",
    contactUsBtn: "සම්බන්ධ වන්න",
    contactHeroTitle: "අප හා සම්බන්ධ වන්න",
    contactHeroSub:
      "ප්‍රශ්නයක්, bulk ලංසුවක් හෝ හවුල්කාරිත්වයක් සඳහා — ඔබෙන් ඇසීමට අපට ප්‍රියයි.",
    sendMessage: "අපට පණිවිඩය යවන්න",
    yourName: "ඔබේ නම",
    yourEmail: "ඔබේ Email",
    subject: "විෂය",
    yourMessage: "ඔබේ පණිවිඩය",
    send: "පණිවිඩය යවන්න",
    messageSent: "✅ පණිවිඩය යැව්වා! ඉක්මනින් ප්‍රතිචාර දක්වන්නෙමු.",
    splashWelcome: "Intimate Hygiene Enterprises වෙතට සාදරයෙන් පිළිගනිමු",
    compareHeroTitle: "නිෂ්පාදන සංසන්දනය කරන්න",
    compareHeroSub: "ඔබේ අවශ්‍යතාව සඳහා පරිපූර්ණ ආවරණය සොයා ගන්න.",
    needHelp: "තෝරා ගැනීමට සහාය අවශ්‍යද?",
    needHelpSub:
      "WhatsApp හරහා අමතන්න — ඔබේ අවශ්‍යතාවට සුදුසු pack නිර්දේශ කරන්නෙමු.",
    askOnWhatsApp: "WhatsApp හි විමසන්න",
    deliveryHeroTitle: "Delivery තොරතුරු",
    deliveryHeroSub:
      "ඔබේ දොරටුව දක්වා ශ්‍රී ලංකාව පුරා ශීඝ්‍ර, විශ්වාසනීය delivery.",
    deliveryZones: "Delivery කලාප",
    paymentMethods: "ගෙවීම් ක්‍රම",
    howToOrder: "ඇණවුමක් යෙදීමේ ක්‍රමය",
    deliveryFaqs: "Delivery නිතර අසන ප්‍රශ්න",
    deliveryZone: "කලාපය",
    deliveryAreas: "ප්‍රදේශ",
    deliveryTime: "Delivery කාලය",
    deliveryFee: "Delivery ගාස්තුව",
    freeFrom: "නිදහස් ආරම්භය",
    orderHeroTitle: "ඇණවුම් තහවුරු Builder",
    orderHeroSub:
      "ඔබේ තොරතුරු පුරවා WhatsApp හරහා සූදානම් ඇණවුම් පණිවිඩයක් යවන්න.",
    name: "නම",
    address: "Delivery ලිපිනය",
    product: "නිෂ්පාදනය",
    quantity: "ප්‍රමාණය",
    payment: "ගෙවීම් ක්‍රමය",
    note: "විශේෂ සටහන (අනිවාර්ය නොවේ)",
    sendOnWhatsApp: "WhatsApp හරහා යවන්න",
    copyMessage: "පණිවිඩය Copy කරන්න",
    copied: "Copy කෙරිණ!",
    livePreview: "Live පෙරදසුන",
    blogHeroTitle: "සනීපාරක්ෂා දෘෂ්ටිකෝණ",
    blogHeroSub: "සනීපාරක්ෂාව, ගමන් ආරක්ෂාව සහ eco-living ගැන විශේෂඥ ලිපි.",
    readMore: "තව කියවන්න",
    showLess: "අඩු කරන්න",
    b2bHeroTitle: "Bulk ඇණවුම් සහ B2B මිලකරණ",
    b2bHeroSub: "හෝටල්, රෝහල්, කාර්යාල සහ ආයතන සඳහා තොග මිලකරණ.",
    enquireNow: "දැන් විමසන්න",
    referralHeroTitle: "10% දෙන්න · 10% ගන්න",
    referralHeroSub:
      "මිතුරෙකු යොමු කරන්න සහ ඔබ දෙදෙනාම ඊළඟ ඇණවුමෙන් 10% වට්ටම ලබා ගන්න.",
    yourNameLabel: "ඔබේ නම",
    generateLink: "Share පණිවිඩය සකස් කරන්න",
    shareOnWhatsApp: "WhatsApp හි Share කරන්න",
    howToUse: "භාවිත කරන්නේ කෙසේද",
    step1Title: "Pack විවෘත කරන්න",
    step1Desc:
      "සනීපාරක්ෂාකාරී ඇසුරුමෙන් ආවරණයක් ඉවත් කරන්න. සෑම ආවරණයක්ම නැවුම්ව තනි තනිව sealed.",
    step2Title: "ආසනය මත තැබීම",
    step2Desc:
      "ආවරණය unfold කර වැසිකිලි ආසනය මත flat ලෙස තැබීම. ස්වාභාවික fit නිසා ගිලෙනයාම නැත.",
    step3Title: "භාවිත කර ඉවත දමන්න",
    step3Desc:
      "භාවිතයෙන් පසු, ආවරණය flush කළ හැකිය (Enterprise Pack) හෝ bin එකේ දැමිය හැකිය.",
    hygieneDifference: "සනීපාරක්ෂා වෙනස",
    withoutCover: "ආවරණයක් නොමැතිව",
    withCover: "අපගේ ආවරණ සහිතව",
    withoutItems: [
      "වැසිකිලි ආසන මතුපිට bacteria වර්ග 295 ක් දක්වා",
      "E. coli, Staphylococcus සහ Streptococcus ඇත",
      "Pathogen 48 ගණන් දක්වා මතුපිටවල ජීවත් වේ",
      "දූෂිත මතුපිටට සෘජු සම-සම්බන්ධය",
      "UTI සහ සම ආසාදන අවදානම",
    ],
    withItems: [
      "Anti-bacterial ස්ථරය සහිත 99% bacterial ආරක්ෂාව",
      "ඔබ සහ ආසනය අතර සම්පූර්ණ ශාරීරික බාධකය",
      "Eco-friendly, biodegradable ද්‍රව්‍ය — කිසිදු ගැටලුවක් නැත",
      "ඕනෑම සම්මත වැසිකිලි ආසනයකට ගැළපේ",
      "ඕනෑ තැනකට ගෙනයාමට සුදුසු",
    ],
    quantityLabel: "ප්‍රමාණය (packs):",
    customerReviews: "ගනුදෙනුකරු සමාලෝචන",
    popupTitle: "සාදරයෙන් පිළිගනිමු! 5% වට්ටමක්",
    popupSub: "ඔබේ පළමු ඇණවුමේ පහත code භාවිත කරන්න:",
    popupExpiry: "පැය 24ක් වලංගු · පළමු ඇණවුම පමණි",
    redeemWhatsApp: "WhatsApp හරහා Redeem කරන්න",
    copyCode: "Code Copy කරන්න",
    popupCopied: "Copy කෙරිණ!",
    deliveryProgressUnlocked: "🎉 නොමිලේ delivery ලැබුණා!",
    deliveryProgressAdd: "නොමිලේ delivery සඳහා LKR {0} ක් වැඩිපුර",
    deliveryProgressFree: "ඇණවුම් කරන්න",
  },

  /* =================== TAMIL =================== */
  ta: {
    heroTitle: "பாதுகாப்பாக இருங்கள், சுகாதாரமாக இருங்கள்",
    heroSubtitle:
      "ஹோட்டல்கள், அலுவலகங்கள், மருத்துவமனைகள் மற்றும் பயணத்திற்கான டிஸ்போஸபிள் கழிவறை இருக்கை கவர்கள். சுற்றுச்சூழல் நட்பு · பாக்டீரியா எதிர்ப்பு · தீவு முழுவதும் டெலிவரி.",
    shopNow: "இப்போது வாங்கவும்",
    learnMore: "மேலும் அறிக",
    getStarted: "தொடங்குங்கள்",
    orderOnWhatsApp: "WhatsApp இல் ஆர்டர் செய்யுங்கள்",
    viewDetails: "விவரங்களை காண்க",
    freeDelivery: "இலவச டெலிவரி",
    freeDeliveryNote: "LKR 3,000 க்கு மேல் ஆர்டர்களுக்கு",
    freeDeliveryUnlocked: "🎉 இலவச டெலிவரி பெற்றுவிட்டீர்கள்!",
    addMore: "இலவச டெலிவரிக்கு LKR {0} கூடுதலாக சேர்க்கவும்",
    readyProtect: "உங்கள் ஆரோக்கியத்தை பாதுகாக்க தயாரா?",
    readyProtectSub:
      "இன்றே ஆர்டர் செய்து Hygenc Covers வித்தியாசத்தை அனுபவியுங்கள்.",
    followJourney: "எங்கள் பயணத்தை பின்பற்றுங்கள்",
    followJourneySub:
      "வாடிக்கையாளர்கள் தினமும் தயாரிப்புகளை எவ்வாறு பயன்படுத்துகிறார்கள் என்று பாருங்கள்",
    referEarn: "🎁 பரிந்துரைத்து 10% தள்ளுபடி பெறுங்கள்",
    followFacebook: "📘 Facebook இல் Follow செய்யுங்கள்",
    trustedBy: "இலங்கை முழுவதும் வணிகங்களால் நம்பப்படுகிறது",
    clients: "வாடிக்கையாளர்கள்",
    navHome: "முகப்பு",
    navAbout: "எங்களைப் பற்றி",
    navProducts: "தயாரிப்புகள்",
    navBenefits: "நன்மைகள்",
    navBlog: "வலைப்பதிவு",
    navB2B: "B2B",
    navFaq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    navCompare: "ஒப்பிடு",
    navDelivery: "டெலிவரி",
    navContact: "தொடர்பு கொள்ளுங்கள்",
    footerDesc:
      "Intimate Hygiene Enterprises பிரீமியம் சுகாதார கழிவறை இருக்கை கவர்கள் வழங்குகிறது.",
    quickLinks: "விரைவு இணைப்புகள்",
    contactUs: "தொடர்பு கொள்ளுங்கள்",
    footerRights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    ourProducts: "எங்கள் தயாரிப்புகள்",
    ourProductsSub:
      "உங்கள் பாதுகாப்பிற்காக வடிவமைக்கப்பட்ட eco-friendly, டிஸ்போஸபிள் கழிவறை இருக்கை கவர்கள்.",
    singleUse: "ஒரு முறை பயன்பாடு",
    singleUseDesc: "பயணிகளுக்கு ஏற்றது. சுகாதாரமான, eco-friendly.",
    travelPack: "பயண பேக்",
    travelPackDesc:
      "நீர் எதிர்ப்பு மற்றும் anti-slip, குடும்பங்கள் மற்றும் அதிக பயணிகளுக்கு.",
    enterprise: "Enterprise Level",
    enterpriseDesc:
      "அலுவலகங்கள், ஹோட்டல்கள் மற்றும் வணிகங்களுக்கான bulk packs.",
    lowStock: "🔴 குறைந்த இருப்பு · இப்போது ஆர்டர் செய்யுங்கள்",
    sellingFast: "🟡 வேகமாக விற்கப்படுகிறது",
    bestSeller: "அதிக விற்பனை",
    budgetFriendly: "சிக்கனமான",
    singleUseLabel: "ஒரு முறை பயன்பாடு",
    compareProducts: "தயாரிப்புகளை ஒப்பிடு →",
    b2bBanner: "வணிகரா? Bulk தள்ளுபடி பெறுங்கள்",
    b2bBannerSub:
      "ஹோட்டல்கள், மருத்துவமனைகள், அலுவலகங்கள் — சிறப்பு வணிக விலை நிர்ணயம்.",
    enquireB2B: "B2B விசாரிக்கவும்",
    statsLabel1: "கழிவறை இருக்கையில் sq inch க்கு பாக்டீரியா வகைகள்",
    statsLabel2: "பாதுகாப்பற்ற மேற்பரப்பில் நோய்க்கிருமி உயிர்வாழும் காலம்",
    statsLabel3: "எங்கள் கவர்கள் வழங்கும் பாதுகாப்பு",
    statsLabel4: "மகிழ்சியான வாடிக்கையாளர்கள் மற்றும் எண்ணிக்கை",
    whyChoose: "Hygenc Covers ஏன் தேர்ந்தெடுக்கணும்?",
    maxHygiene: "அதிகபட்ச சுகாதாரம்",
    maxHygieneDesc:
      "எங்கள் டிஸ்போஸபிள் கவர்கள் பாக்டீரியாவுக்கு எதிரான பாதுகாப்பு தடையை வழங்குகின்றன.",
    ecoFriendly: "சுற்றுச்சூழல் நட்பு",
    ecoFriendlyDesc:
      "பயோடிகிரேடபிள் பொருட்களிலிருந்து தயாரிக்கப்பட்டது, உங்களையும் சுற்றுச்சூழலையும் பாதுகாக்கிறது.",
    convenientPortable: "வசதியான மற்றும் எடுத்துச் செல்லலாம்",
    convenientPortableDesc:
      "எங்கும் எடுத்துச் செல்ல ஏற்றது — பயணம், வேலை அல்லது அன்றாட பயன்பாட்டிற்கு.",
    ourBestsellers: "எங்கள் சிறந்த விற்பனை தயாரிப்புகள்",
    standardPack: "Standard Pack",
    standardPackDesc: "பயணிகளுக்கு. எங்கும் பாதுகாப்பாக இருங்கள்.",
    travelKit: "Travel Kit",
    travelKitDesc: "நீர் எதிர்ப்பு மற்றும் anti-slip, குடும்ப பயணங்களுக்கு.",
    enterprisePack: "Enterprise Pack",
    enterprisePackDesc:
      "வணிகங்கள், வங்கிகள் மற்றும் நிறுவனங்களுக்கு bulk packs.",
    whatCustomersSay: "வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள்",
    certEco: "சுற்றுச்சூழல் நட்பு சான்றிதழ்",
    certBacterial: "பாக்டீரியா எதிர்ப்பு சோதனை",
    certBio: "100% பயோடிகிரேடபிள்",
    certQuality: "தரம் உறுதிப்படுத்தப்பட்டது",
    certHospital: "மருத்துவமனை தரம்",
    usedByHotels: "ஹோட்டல்கள் மற்றும் விடுதிகள்",
    usedByHospitals: "மருத்துவமனைகள் மற்றும் கிளினிக்குகள்",
    usedByOffices: "கார்ப்பரேட் அலுவலகங்கள்",
    usedByAirlines: "விமான சேவைகள்",
    usedByUniversities: "பல்கலைக்கழகங்கள்",
    usedByGovt: "அரசு கட்டிடங்கள்",
    aboutHeroTitle: "Intimate Hygiene Enterprises பற்றி",
    aboutHeroSub:
      "ஹோட்டல்கள், மருத்துவமனைகள் மற்றும் வணிகங்கள் நம்பும் eco-friendly கவர்களுடன் இலங்கையின் சுகாதார புரட்சிக்கு தலைமை தாங்குகிறோம்.",
    ourMission: "எங்கள் நோக்கம்",
    ourMissionText:
      "அனைவருக்கும் சுகாதாரத்தை அணுகக்கூடியதாக மாற்றுவது. ஒவ்வொரு நபரும் சுத்தமான, பாதுகாப்பான கழிவறை அனுபவத்திற்கு தகுதியுடையவர்கள் என்று நாங்கள் நம்புகிறோம்.",
    ourVision: "எங்கள் தொலைநோக்கு",
    ourVisionText:
      "இலங்கையின் மிகவும் நம்பகமான சுகாதார பிராண்டாக மாறுவதும் தென்னாசியா முழுவதும் விரிவடைவதும்.",
    ourValues: "எங்கள் மூல மதிப்புகள்",
    meetTeam: "குழுவை சந்தியுங்கள்",
    partnerWithUs: "எங்களுடன் கூட்டு சேருங்கள்",
    partnerWithUsSub:
      "சுகாதாரத்திற்கு அர்ப்பணிக்கப்பட்ட ஹோட்டல்கள், மருத்துவமனைகள், அலுவலக நெட்வொர்க்கில் சேருங்கள்.",
    getInTouch: "தொடர்பு கொள்ளுங்கள்",
    valueInnovation: "புதுமை",
    valueInnovationDesc:
      "நவீன சுகாதார தேவைகளை பூர்த்தி செய்ய தயாரிப்புகளை தொடர்ந்து மேம்படுத்துகிறோம்.",
    valueSustainability: "நிலைத்தன்மை",
    valueSustainabilityDesc:
      "எங்கள் eco-conscious அணுகுமுறை குறைந்தபட்ச சுற்றுச்சூழல் தாக்கத்தை உறுதி செய்கிறது.",
    valueAccessibility: "அணுகல்தன்மை",
    valueAccessibilityDesc:
      "அனைவருக்கும் கிடைக்கக்கூடிய மலிவான சுகாதார தீர்வுகளை வடிவமைக்கிறோம்.",
    valueTrust: "நம்பகத்தன்மை",
    valueTrustDesc:
      "வாடிக்கையாளர் நம்பிக்கை நாங்கள் உருவாக்கும் அனைத்திலும் மையமாக உள்ளது.",
    valueHealth: "ஆரோக்கியம் மற்றும் பாதுகாப்பு",
    valueHealthDesc:
      "ஒவ்வொரு தயாரிப்பும் பகிரப்பட்ட சூழல்களில் நலனை பாதுகாக்க உருவாக்கப்படுகிறது.",
    valueCare: "வாடிக்கையாளர் சேவை",
    valueCareDesc:
      "நாங்கள் கேட்கிறோம், மாற்றியமைக்கிறோம், சமூகத்திற்கு சிறந்த ஆதரவை வழங்குகிறோம்.",
    benefitsHeroTitle: "எங்கள் கவர்கள் எவ்வாறு வித்தியாசமாக செயல்படுகின்றன",
    benefitsHeroSub:
      "Hygenc டிஸ்போஸபிள் கழிவறை இருக்கை கவர்களின் அறிவியல் மற்றும் நடைமுறை பயன்பாட்டை கண்டறியுங்கள்.",
    benefitsTitle: "சுகாதார நன்மைகள்",
    maxHygieneBenefit: "அதிகபட்ச சுகாதாரம்",
    maxHygieneBenefitDesc:
      "பொது கழிவறை இருக்கைகளில் காணப்படும் கிருமிகள், பாக்டீரியா மற்றும் வைரஸ்களிலிருந்து பாதுகாக்கிறது.",
    ecoFriendlyBenefit: "சுற்றுச்சூழல் நட்பு",
    ecoFriendlyBenefitDesc:
      "பயோடிகிரேடபிள் மற்றும் கம்போஸ்டபிள் பொருட்களிலிருந்து தயாரிக்கப்பட்டது, பிளாஸ்டிக் மாசுபாட்டை குறைக்கிறது.",
    waterSaving: "தண்ணீர் சேமிப்பு",
    waterSavingDesc:
      "Flushable கவர்கள் தண்ணீரில் எளிதாக கரைகின்றன, நீர் பயன்பாட்டை குறைக்க உதவுகின்றன.",
    laborSaving: "உழைப்பு சேமிப்பு",
    laborSavingDesc:
      "கழிவறை மேற்பரப்புகளை நேரடி மாசுபாட்டிலிருந்து தடுப்பதன் மூலம் பணியாளர்களின் சுத்தம் செய்யும் சுமையை குறைக்கிறது.",
    portable: "எடுத்துச் செல்லலாம் மற்றும் வசதியானது",
    portableDesc:
      "பைகள், பர்ஸ்கள் அல்லது பாக்கெட்டுகளில் எடுத்துச் செல்வது சுலபம். பயணம், அலுவலகங்கள் அல்லது ஜிம்முகளுக்கு.",
    familyFriendly: "குடும்பத்திற்கு ஏற்றது",
    familyFriendlyDesc:
      "குழந்தைகள், முதியோர், கர்ப்பிணி பெண்கள் மற்றும் யாருக்கும் பாதுகாப்பானது.",
    expertRecommended: "நிபுணர்கள் பரிந்துரைக்கிறார்கள்",
    expertRecommendedDesc:
      "சுகாதார நிபுணர்கள் டிஸ்போஸபிள் இருக்கை கவர்களை எளிய, பயனுள்ள சுகாதார நடவடிக்கையாக பரிந்துரைக்கிறார்கள்.",
    faqHeroTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faqHeroSub:
      "தயாரிப்புகள், டெலிவரி மற்றும் சுகாதாரம் பற்றி நீங்கள் அறிய வேண்டியதெல்லாம்.",
    faqCat1: "தயாரிப்பு சம்பந்தமான கேள்விகள்",
    faqCat2: "சுகாதாரம் மற்றும் பாதுகாப்பு",
    faqCat3: "நடைமுறை பயன்பாடு",
    faqCat4: "சுற்றுச்சூழல் கவலைகள்",
    faqCat5: "தண்ணீர் மற்றும் உழைப்பு சேமிப்பு",
    stillHaveQ: "இன்னும் கேள்விகள் உள்ளதா?",
    stillHaveQSub: "நாங்கள் உதவ தயாராக இருக்கிறோம்.",
    contactUsBtn: "தொடர்பு கொள்ளுங்கள்",
    contactHeroTitle: "தொடர்பு கொள்ளுங்கள்",
    contactHeroSub:
      "கேள்வி, bulk மேற்கோள் அல்லது கூட்டாண்மை — உங்களிடமிருந்து கேட்க விரும்புகிறோம்.",
    sendMessage: "எங்களுக்கு செய்தி அனுப்புங்கள்",
    yourName: "உங்கள் பெயர்",
    yourEmail: "உங்கள் Email",
    subject: "விஷயம்",
    yourMessage: "உங்கள் செய்தி",
    send: "செய்தி அனுப்புங்கள்",
    messageSent: "✅ செய்தி அனுப்பப்பட்டது! விரைவில் பதிலளிப்போம்.",
    splashWelcome: "Intimate Hygiene Enterprises க்கு வரவேற்கிறோம்",
    compareHeroTitle: "தயாரிப்புகளை ஒப்பிடுங்கள்",
    compareHeroSub: "உங்கள் தேவைக்கு சரியான கழிவறை இருக்கை கவரை கண்டறியுங்கள்.",
    needHelp: "தேர்வு செய்ய உதவி தேவையா?",
    needHelpSub:
      "எங்களுக்கு WhatsApp செய்யுங்கள் — உங்கள் தேவைக்கு சரியான pack பரிந்துரைப்போம்.",
    askOnWhatsApp: "WhatsApp இல் கேளுங்கள்",
    deliveryHeroTitle: "டெலிவரி தகவல்",
    deliveryHeroSub:
      "உங்கள் வாசலுக்கு வேகமான, நம்பகமான தீவு முழுவதும் டெலிவரி.",
    deliveryZones: "டெலிவரி மண்டலங்கள்",
    paymentMethods: "கட்டண முறைகள்",
    howToOrder: "ஆர்டர் செய்வது எப்படி",
    deliveryFaqs: "டெலிவரி அடிக்கடி கேட்கப்படும் கேள்விகள்",
    deliveryZone: "மண்டலம்",
    deliveryAreas: "பகுதிகள்",
    deliveryTime: "டெலிவரி நேரம்",
    deliveryFee: "டெலிவரி கட்டணம்",
    freeFrom: "இலவச தொடக்கம்",
    orderHeroTitle: "ஆர்டர் உறுதிப்படுத்தல் Builder",
    orderHeroSub:
      "உங்கள் விவரங்களை நிரப்பி WhatsApp இல் தயாரான ஆர்டர் செய்தியை நேரடியாக அனுப்புங்கள்.",
    name: "பெயர்",
    address: "டெலிவரி முகவரி",
    product: "தயாரிப்பு",
    quantity: "அளவு",
    payment: "கட்டண முறை",
    note: "சிறப்பு குறிப்பு (விருப்பமானது)",
    sendOnWhatsApp: "WhatsApp இல் அனுப்புங்கள்",
    copyMessage: "செய்தியை நகலெடுக்கவும்",
    copied: "நகலெடுக்கப்பட்டது!",
    livePreview: "Live முன்னோட்டம்",
    blogHeroTitle: "சுகாதார நுண்ணறிவுகள்",
    blogHeroSub:
      "சுகாதாரம், பயண பாதுகாப்பு மற்றும் eco-living பற்றிய நிபுணர் கட்டுரைகள்.",
    readMore: "மேலும் படிக்கவும்",
    showLess: "குறைவாக காட்டு",
    b2bHeroTitle: "Bulk ஆர்டர்கள் மற்றும் B2B விலை நிர்ணயம்",
    b2bHeroSub:
      "ஹோட்டல்கள், மருத்துவமனைகள், அலுவலகங்கள் மற்றும் நிறுவனங்களுக்கான மொத்த விலை நிர்ணயம்.",
    enquireNow: "இப்போது விசாரிக்கவும்",
    referralHeroTitle: "10% கொடு · 10% பெறு",
    referralHeroSub:
      "ஒரு நண்பரை பரிந்துரையுங்கள், இருவரும் அடுத்த ஆர்டரில் 10% தள்ளுபடி பெறுவீர்கள்.",
    yourNameLabel: "உங்கள் பெயர்",
    generateLink: "Share செய்தியை உருவாக்குங்கள்",
    shareOnWhatsApp: "WhatsApp இல் Share செய்யுங்கள்",
    howToUse: "பயன்படுத்துவது எப்படி",
    step1Title: "Pack ஐ திறக்கவும்",
    step1Desc:
      "சுகாதாரமான பேக்கேஜிங்கிலிருந்து ஒரு கவரை எடுக்கவும். ஒவ்வொரு கவரும் தனித்தனியாக sealed.",
    step2Title: "இருக்கையில் வையுங்கள்",
    step2Desc:
      "கவரை unfold செய்து கழிவறை இருக்கையில் flat ஆக வையுங்கள். இயற்கையான fit கழுவதை தடுக்கிறது.",
    step3Title: "பயன்படுத்தி நிராகரிக்கவும்",
    step3Desc:
      "பயன்பாட்டிற்கு பிறகு, கவரை flush செய்யலாம் (Enterprise Pack) அல்லது bin இல் போடலாம்.",
    hygieneDifference: "சுகாதார வித்தியாசம்",
    withoutCover: "கவர் இல்லாமல்",
    withCover: "எங்கள் கவருடன்",
    withoutItems: [
      "கழிவறை இருக்கை மேற்பரப்பில் 295 வகை பாக்டீரியா வரை",
      "E. coli, Staphylococcus மற்றும் Streptococcus உள்ளன",
      "நோய்க்கிருமிகள் மேற்பரப்பில் 48 மணி நேரம் வரை உயிர்வாழும்",
      "மாசுபட்ட மேற்பரப்புடன் நேரடி தொடர்பு",
      "UTI மற்றும் தோல் நோய்த்தொற்று அபாயம்",
    ],
    withItems: [
      "Anti-bacterial அடுக்குடன் 99% பாக்டீரியா பாதுகாப்பு",
      "உங்களுக்கும் இருக்கைக்கும் இடையே முழுமையான தடை",
      "Eco-friendly, பயோடிகிரேடபிள் பொருள் — குற்றமில்லாதது",
      "எந்த நிலையான கழிவறை இருக்கையிலும் பொருந்தும்",
      "எங்கும் எடுத்துச் செல்லும் அளவிற்கு சிறியது",
    ],
    quantityLabel: "அளவு (packs):",
    customerReviews: "வாடிக்கையாளர் மதிப்புரைகள்",
    popupTitle: "வரவேற்கிறோம்! 5% தள்ளுபடி",
    popupSub: "உங்கள் முதல் ஆர்டரில் கீழே உள்ள code ஐ பயன்படுத்துங்கள்:",
    popupExpiry: "24 மணி நேரம் செல்லுபடியாகும் · முதல் ஆர்டர் மட்டும்",
    redeemWhatsApp: "WhatsApp இல் Redeem செய்யுங்கள்",
    copyCode: "Code ஐ நகலெடுக்கவும்",
    popupCopied: "நகலெடுக்கப்பட்டது!",
    deliveryProgressUnlocked: "🎉 இலவச டெலிவரி பெற்றுவிட்டீர்கள்!",
    deliveryProgressAdd: "இலவச டெலிவரிக்கு LKR {0} கூடுதலாக சேர்க்கவும்",
    deliveryProgressFree: "",
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
