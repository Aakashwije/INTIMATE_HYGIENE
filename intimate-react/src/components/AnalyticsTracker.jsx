import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackSiteEvent } from "../lib/database";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackSiteEvent({
      event_type: "page_view",
      path: location.pathname,
      label: document.title,
    });
  }, [location.pathname]);

  return null;
}
