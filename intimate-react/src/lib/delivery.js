export const OUTSIDE_COLOMBO_DELIVERY_FEE = 350;

const COLOMBO_AREAS = [
  "colombo",
  "dehiwala",
  "mount lavinia",
  "mt lavinia",
  "moratuwa",
  "kotte",
  "sri jayawardenepura",
  "rajagiriya",
  "battaramulla",
  "nugegoda",
  "maharagama",
  "boralesgamuwa",
  "kohuwala",
  "kirulapone",
  "wellawatte",
  "bambalapitiya",
  "kollupitiya",
  "narahenpita",
  "nawala",
  "ratmalana",
  "kolonnawa",
  "angoda",
  "wellampitiya",
];

function normalizeLocation(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isColomboDeliveryArea(value = "") {
  const location = normalizeLocation(value);
  if (!location) return false;
  if (/\bcolombo\s*(0?[1-9]|1[0-5])\b/.test(location)) return true;
  return COLOMBO_AREAS.some((area) => location.includes(area));
}

export function getDeliveryQuote(city = "") {
  const isColombo = isColomboDeliveryArea(city);
  return {
    fee: isColombo ? 0 : OUTSIDE_COLOMBO_DELIVERY_FEE,
    area: isColombo ? "Colombo area" : "Outside Colombo",
    label: isColombo
      ? "FREE (Colombo area)"
      : `LKR ${OUTSIDE_COLOMBO_DELIVERY_FEE.toLocaleString()} (outside Colombo)`,
  };
}

export const DELIVERY_POLICY_TEXT =
  "Delivery: Colombo area free · Outside Colombo LKR 350";
