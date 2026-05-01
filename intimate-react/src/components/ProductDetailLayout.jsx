import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

/**
 * Reusable product detail page layout.
 * Accepts title, subtitle, image, sections, and a highlight prop for special callouts.
 */
export default function ProductDetailLayout({
  title,
  subtitle,
  image,
  imageAlt,
  sections,
  highlight,
}) {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-24 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{
          background:
            'linear-gradient(rgba(40,167,69,0.85), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover',
        }}
      >
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">
            {title}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed opacity-95"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        </div>
      </section>

      {/* Product Details */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto my-20 px-5 items-start">
        <img
          src={image}
          alt={imageAlt}
          className="w-full rounded-xl shadow-lg object-cover"
        />
        <div className="bg-white p-8 rounded-xl shadow-md">
          {sections
            .slice(0, 2)
            .map(({ heading, items, text, highlightItem }) => (
              <div key={heading} className="mb-6">
                <h2 className="text-[#28a745] font-semibold text-xl mb-3">
                  {heading}
                </h2>
                {items && (
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className={`relative pl-7 ${
                          highlightItem === i
                            ? "text-red-600 font-bold"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="absolute left-0 text-[#28a745] font-bold">
                          ✔
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {text && (
                  <p className="text-gray-600 leading-relaxed mt-2">{text}</p>
                )}
              </div>
            ))}
          {highlight && (
            <p className="text-red-600 font-bold mt-2">{highlight}</p>
          )}
        </div>
      </section>

      {/* Remaining sections */}
      <div className="max-w-6xl mx-auto px-5 pb-16 space-y-8">
        {sections.slice(2).map(({ heading, items, text }) => (
          <div key={heading} className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{heading}</h2>
            {items && (
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="relative pl-7 text-gray-700">
                    <span className="absolute left-0 text-[#28a745] font-bold">
                      ✔
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {text && (
              <p className="text-gray-600 leading-relaxed mt-2">{text}</p>
            )}
          </div>
        ))}
      </div>

      <Footer />
      <ScrollToTop />
    </>
  );
}
