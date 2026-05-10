
/**
 * Floating "Back to Top" button using the original back2top.png image.
 * Scrolls smoothly to the top when clicked.
 */
export default function ScrollToTop() {
  return (
    <img
      src="/back2top.png"
      id="goTopBtn"
      alt="Go to Top"
      title="Go to Top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-44 sm:bottom-40 md:bottom-24 right-5 sm:right-7 w-10 h-10 sm:w-12 sm:h-12 cursor-pointer z-50 hover:scale-110 transition-transform duration-300"
    />
  );
}
