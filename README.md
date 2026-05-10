<div align="center">

<img src="intimate-react/public/fulllogo.png" alt="Hygenc Covers Logo" width="280" />

<br/>

# Hygenc Covers — Intimate Hygiene E-Commerce Platform

**Premium toilet seat cover products for Sri Lanka — built for retail, hospitality & B2B**

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-7-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![WhatsApp](https://img.shields.io/badge/WhatsApp_Checkout-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/94729991950)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Application Flow](#application-flow)
- [Component Tree](#component-tree)
- [State Management](#state-management)
- [Routing](#routing)
- [Internationalisation (i18n)](#internationalisation-i18n)
- [Cart & Checkout Flow](#cart--checkout-flow)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment & Configuration](#environment--configuration)
- [Contributing](#contributing)

---

## Overview

**Hygenc Covers** is a high-conversion, mobile-first e-commerce web application for **intimate hygiene toilet seat covers** targeting the Sri Lankan market. The platform supports three customer segments:

| Segment | Product | Channel |
|---|---|---|
| Retail / Personal | Single Use Pack | WhatsApp · Cart |
| Travellers | Travel Pack (Waterproof) | WhatsApp · Cart |
| Hotels / Corporates | Enterprise Bulk Pack | B2B Enquiry Form |

The storefront is fully internationalised across **English**, **Sinhala (සිංහල)**, and **Tamil (தமிழ்)**, with a WhatsApp-first checkout that requires zero backend payment infrastructure.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19 |
| Build Tool | Vite | 8 |
| Styling | Tailwind CSS | 4 |
| Routing | React Router DOM | 7 |
| Icons | Font Awesome (SVG Core) | 7 |
| Animation | CSS Keyframes + IntersectionObserver | — |
| State | React Context API | — |
| Persistence | localStorage / sessionStorage | Browser native |
| Checkout | WhatsApp Deep Link | `wa.me` protocol |
| Font | Google Fonts — Poppins | 400/600/700/900 |
| Linter | ESLint + react-hooks + react-refresh | 10 |

---

## Architecture

```mermaid
graph TB
    subgraph Client["Client (Browser)"]
        direction TB
        subgraph Providers["Context Providers"]
            LC[LangContext<br/>EN · SI · TA]
            CC[CartContext<br/>localStorage]
        end

        subgraph Router["React Router v7"]
            Splash --> Home
            Home --> Products
            Products --> PD1[Product1]
            Products --> PD2[Product2]
            Products --> PD3[Product3]
            Products --> Compare
            Home --> About
            Home --> Benefits
            Home --> Blog
            Home --> FAQ
            Home --> B2B
            Home --> Referral
            Home --> Delivery
            Home --> Contact
            Home --> Order[OrderTemplate]
        end

        subgraph GlobalUI["Global UI Layer"]
            AB[AnnouncementBar]
            WA[WhatsAppButton]
            DP[DiscountPopup]
            LPN[LivePurchaseNotification]
            CD[CartDrawer]
            SM[StickyMobileCTA]
        end

        Providers --> Router
        Providers --> GlobalUI
    end

    subgraph External["External Services"]
        WAS[WhatsApp API<br/>wa.me/94729991950]
        GF[Google Fonts<br/>Poppins]
    end

    CD -->|"order message"| WAS
    SM -->|"quick order"| WAS
    Client -->|"font load"| GF
```

---

## Application Flow

```mermaid
sequenceDiagram
    actor User
    participant Splash
    participant Home
    participant Products
    participant CartDrawer
    participant WhatsApp

    User->>Splash: Visit /
    Splash-->>User: Brand intro (3s auto-redirect)
    User->>Home: / home
    Home-->>User: Hero + Trust badges + Stats + FAQ

    User->>Products: /products
    Products-->>User: Product grid (3 cards)

    alt Add to Cart
        User->>Products: Click "Add to Cart"
        Products->>CartDrawer: add({ id, name, price, img })
        CartDrawer-->>User: Badge count update
        User->>CartDrawer: Open drawer
        CartDrawer-->>User: Show items + Free delivery progress
        User->>CartDrawer: Click "Order via WhatsApp"
        CartDrawer->>WhatsApp: wa.me?text=<encoded order>
        WhatsApp-->>User: Pre-filled chat
    else Direct WhatsApp
        User->>Products: Click "Order on WhatsApp"
        Products->>WhatsApp: wa.me?text=<product message>
        WhatsApp-->>User: Pre-filled chat
    end
```

---

## Component Tree

```mermaid
graph TD
    App --> LangProvider
    App --> CartProvider
    App --> BrowserRouter

    BrowserRouter --> GlobalUI
    GlobalUI --> AnnouncementBar
    GlobalUI --> WhatsAppButton
    GlobalUI --> DiscountPopup
    GlobalUI --> LivePurchaseNotification
    GlobalUI --> CartDrawer
    GlobalUI --> StickyMobileCTA

    BrowserRouter --> Routes

    Routes --> Splash
    Routes --> Home
    Routes --> Products
    Routes --> Product1 & Product2 & Product3
    Routes --> About & Benefits & Blog
    Routes --> FAQ & Compare & B2B
    Routes --> Referral & Delivery & Contact
    Routes --> OrderTemplate

    Home --> Navbar
    Home --> HeroSection
    Home --> TrustBadges
    Home --> CountUp
    Home --> BeforeAfterSlider
    Home --> FAQAccordion
    Home --> NewsletterSignup
    Home --> Footer
    Home --> ScrollToTop

    Products --> Navbar
    Products --> TrustBadges
    Products --> DeliveryProgressBar
    Products --> ProductCards["Product Cards (×3)"]
    Products --> Footer

    CartDrawer --> DeliveryProgressBar
    CartDrawer --> CartItems["Cart Items"]
    CartDrawer --> WhatsAppCheckout["WhatsApp Checkout CTA"]
```

---

## State Management

```mermaid
stateDiagram-v2
    [*] --> Empty : App Load / localStorage empty

    Empty --> HasItems : add(product)
    HasItems --> HasItems : updateQty(id, delta)
    HasItems --> HasItems : remove(id)
    HasItems --> Empty : clear()

    HasItems --> DrawerOpen : setOpen(true)
    DrawerOpen --> DrawerOpen : modify cart
    DrawerOpen --> Checkout : "Order via WhatsApp"
    DrawerOpen --> HasItems : setOpen(false)

    Checkout --> [*] : wa.me deep-link opens
    HasItems --> [*] : clear() after order

    note right of HasItems
        Persisted to localStorage
        Subtotal computed on render
        Count shown on CartButton badge
    end note
```

---

## Routing

```mermaid
flowchart LR
    root["/"] -->|Navigate replace| splash["/splash"]
    splash -->|auto or click| home["/home"]

    home --> products["/products"]
    home --> about["/about"]
    home --> benefits["/benefits"]
    home --> blog["/blog"]
    home --> faq["/faq"]
    home --> compare["/compare"]
    home --> b2b["/b2b"]
    home --> referral["/referral"]
    home --> delivery["/delivery"]
    home --> contact["/contact"]

    products --> p1["/products/1<br/>Single Use"]
    products --> p2["/products/2<br/>Travel Pack"]
    products --> p3["/products/3<br/>Enterprise"]

    home --> order["/order"]
    wildcard["*"] -->|Navigate replace| splash
```

---

## Internationalisation (i18n)

```mermaid
graph LR
    LangContext -->|"t = translations[lang]"| EN[English 🇬🇧]
    LangContext -->|"t = translations[lang]"| SI[සිංහල 🇱🇰]
    LangContext -->|"t = translations[lang]"| TA[தமிழ் 🇮🇳]

    subgraph Keys["Translation Key Groups (~70 keys each)"]
        direction TB
        NAV[Navigation labels]
        HERO[Hero section]
        PRODUCTS[Product names & descriptions]
        CART[Cart & checkout strings]
        TRUST[Trust badge labels]
        FAQ[FAQ Q&A pairs ×5]
        NEWSLETTER[Newsletter section]
        ANNOUNCE[Announcement bar]
        NOTIFY[Live purchase notifications]
    end

    LangContext --> Keys
```

The active language is toggled via `LangToggle` component in the Navbar and persisted in React state (resets on reload — no localStorage persistence by design so the default audience sees English).

---

## Cart & Checkout Flow

```mermaid
flowchart TD
    A[User clicks Add to Cart] --> B[CartContext.add]
    B --> C{Item already in cart?}
    C -->|Yes| D[Increment qty]
    C -->|No| E[Append new item]
    D & E --> F[Persist to localStorage]
    F --> G[CartButton badge updates]

    G --> H[User opens CartDrawer]
    H --> I[View items + subtotal]
    I --> J{Subtotal ≥ LKR 3,000?}
    J -->|No| K[Show delivery progress bar]
    J -->|Yes| L[Show Free Delivery unlocked]

    K & L --> M[User clicks Order via WhatsApp]
    M --> N[Build order message string]
    N --> O["wa.me/94729991950?text=<encoded>"]
    O --> P[WhatsApp opens with pre-filled order]
```

---

## Features

### Customer-Facing
| Feature | Description |
|---|---|
| **Splash Screen** | Animated brand intro with auto-redirect |
| **Premium Hero** | Gradient + blob animations + trust chip + hero stats |
| **Live Purchase Notifications** | Cycling toast — real names, cities, products (sessionStorage once-per-session) |
| **Announcement Bar** | Live 24h countdown timer, dismissible, gradient shimmer |
| **Before/After Slider** | Interactive drag + touch slider showing hygiene contrast |
| **Scroll-triggered Reveals** | `up`, `left`, `right`, `zoom` variants via IntersectionObserver |
| **CountUp Animations** | Animated stats (10,000+ customers, 4.9★, etc.) |
| **Product Cards** | Image badges, urgency chips, star ratings, add-to-cart |
| **Cart Drawer** | Slide-in, qty controls, free delivery progress, WhatsApp checkout |
| **Sticky Mobile CTA** | Bottom bar with Shop + WhatsApp, visible after 400px scroll |
| **Discount Popup** | Timed offer popup, sessionStorage dismissed |
| **FAQ Accordion** | CSS grid-rows animation, no JS height measurement |
| **Newsletter Signup** | Email capture, localStorage, success animation, 5% off badge |
| **B2B Page** | Bulk enquiry channel for hotels/corporates |
| **Referral Page** | Referral programme entry point |
| **Product Comparison** | Side-by-side table of all three packs |

### Developer Experience
| Feature | Description |
|---|---|
| **Vite HMR** | Sub-100ms hot module replacement |
| **Tailwind CSS v4** | Zero-config JIT via `@tailwindcss/vite` plugin |
| **Custom animations** | 12+ keyframes in `index.css` (blob, shimmer, marquee, toast, gradientShift, …) |
| **`prefers-reduced-motion`** | All animations disabled automatically for accessibility |
| **ESLint** | react-hooks + react-refresh rules |

---

## Project Structure

```
intimate-react/
├── public/
│   ├── fulllogo.png          # Company logo (Navbar, README)
│   ├── shortlogo.png         # Favicon fallback
│   ├── favicon.svg
│   ├── normal.png            # Single Use Pack product image
│   ├── travel.png            # Travel Pack product image
│   ├── interprise.png        # Enterprise Pack product image
│   └── back2top.png          # Scroll-to-top button icon
│
├── src/
│   ├── main.jsx              # Entry point — mounts <App/>
│   ├── index.css             # Global styles, custom keyframes, utilities
│   ├── App.jsx               # Router + global providers + global UI
│   │
│   ├── context/
│   │   ├── LangContext.jsx   # EN/SI/TA translations + useLang hook
│   │   └── CartContext.jsx   # Cart state + useCart hook
│   │
│   ├── hooks/
│   │   └── useInView.js      # IntersectionObserver hook
│   │
│   ├── components/
│   │   ├── Navbar.jsx                # Scroll-shrink nav + hamburger menu
│   │   ├── Footer.jsx
│   │   ├── AnnouncementBar.jsx       # Top countdown bar
│   │   ├── WhatsAppButton.jsx        # Floating WhatsApp FAB
│   │   ├── DiscountPopup.jsx         # Timed offer modal
│   │   ├── LivePurchaseNotification.jsx  # Cycling toast
│   │   ├── CartButton.jsx            # Icon + badge
│   │   ├── CartDrawer.jsx            # Slide-in cart panel
│   │   ├── StickyMobileCTA.jsx       # Bottom mobile bar
│   │   ├── TrustBadges.jsx           # 4-icon trust grid
│   │   ├── DeliveryProgressBar.jsx   # Free delivery meter
│   │   ├── BeforeAfterSlider.jsx     # Drag/touch reveal slider
│   │   ├── FAQAccordion.jsx          # CSS-animated accordion
│   │   ├── NewsletterSignup.jsx      # Email capture section
│   │   ├── CountUp.jsx               # rAF-based animated counter
│   │   ├── Reveal.jsx                # Scroll-triggered wrapper
│   │   ├── LangToggle.jsx            # EN/SI/TA switcher
│   │   ├── ProductDetailLayout.jsx   # Shared product detail template
│   │   └── ScrollToTop.jsx           # Back-to-top button
│   │
│   └── pages/
│       ├── Splash.jsx          # /splash — brand intro
│       ├── Home.jsx            # /home — main landing page
│       ├── Products.jsx        # /products — product grid
│       ├── Product1.jsx        # /products/1 — Single Use detail
│       ├── Product2.jsx        # /products/2 — Travel Pack detail
│       ├── Product3.jsx        # /products/3 — Enterprise detail
│       ├── About.jsx           # /about
│       ├── Benefits.jsx        # /benefits
│       ├── Blog.jsx            # /blog
│       ├── FAQ.jsx             # /faq
│       ├── Compare.jsx         # /compare — product comparison table
│       ├── B2B.jsx             # /b2b — bulk/corporate enquiry
│       ├── Referral.jsx        # /referral
│       ├── Delivery.jsx        # /delivery — shipping info
│       ├── Contact.jsx         # /contact
│       └── OrderTemplate.jsx   # /order — order confirmation template
│
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/INTIMATE_HYGIENE.git
cd INTIMATE_HYGIENE/intimate-react

# Install dependencies
npm install
```

### Development

```bash
npm run dev
# → http://localhost:5173/
```

### Production Build

```bash
npm run build
# Output: intimate-react/dist/
```

### Preview Production Build

```bash
npm run preview
# → http://localhost:4173/
```

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start dev server with HMR at `:5173` |
| `build` | `vite build` | Bundle for production into `dist/` |
| `preview` | `vite preview` | Serve the production build locally |
| `lint` | `eslint .` | Run ESLint across all source files |

---

## Environment & Configuration

There are **no required environment variables**. All external integrations use public endpoints:

| Integration | Configuration |
|---|---|
| WhatsApp Number | Hard-coded: `+94729991950` in `whatsappMsg` fields and `CartDrawer.jsx` |
| Free Delivery Threshold | Hard-coded: `LKR 3,000` in `DeliveryProgressBar.jsx` and `CartDrawer.jsx` |
| Newsletter | localStorage key: `hygenc_newsletter_subscribed` |
| Discount Popup | sessionStorage key: `hygenc_discount_dismissed` |
| Announcement Bar | sessionStorage key: `hygenc_announce_dismissed` |
| Live Notifications | sessionStorage key: `hygenc_notif_dismissed` |

To change the WhatsApp number, update `wa.me/94729991950` in:
- `src/pages/Products.jsx` (product `whatsappMsg` strings)
- `src/components/CartDrawer.jsx` (checkout URL)
- `src/components/StickyMobileCTA.jsx`
- `src/components/WhatsAppButton.jsx`

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes following conventional commits: `git commit -m "feat: add X"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request against `main`

---

<div align="center">

**Hygenc Covers** · Made with ❤️ for Sri Lanka

[hygenc.lk](https://hygenc.lk) · [WhatsApp](https://wa.me/94729991950) · [Facebook](#)

</div>
