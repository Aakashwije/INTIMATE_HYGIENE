import { useEffect } from "react";

const BASE = "Intimate Hygiene Enterprises";
const DEFAULT_DESC =
  "Premium eco-friendly disposable toilet seat covers for hotels, hospitals, travel & daily use. Buy online in Sri Lanka. Bulk B2B orders available.";
const DEFAULT_IMG = "https://hygenc.lk/og-image.jpg";
const SITE_URL = "https://hygenc.lk";

function setMeta(name, content, prop = false) {
  const attr = prop ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SEO({ title, description, path = "", image }) {
  const fullTitle = title
    ? `${title} | ${BASE}`
    : `${BASE} – Disposable Toilet Seat Covers Sri Lanka`;
  const desc = description || DEFAULT_DESC;
  const url = `${SITE_URL}${path}`;
  const img = image || DEFAULT_IMG;

  useEffect(() => {
    document.title = fullTitle;

    // Standard
    setMeta("description", desc);
    setMeta("robots", "index, follow");

    // Open Graph
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", desc, true);
    setMeta("og:url", url, true);
    setMeta("og:image", img, true);
    setMeta("og:type", "website", true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", img);
  }, [fullTitle, desc, url, img]);

  return null;
}
