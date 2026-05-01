/**
 * Shows a progress bar towards free delivery.
 * Pass `orderTotal` (number) as prop.
 * If not passed, shows the static promo banner only.
 */

const FREE_THRESHOLD = 3000;

export default function DeliveryProgressBar({ orderTotal = 0 }) {
  const pct = Math.min(100, Math.round((orderTotal / FREE_THRESHOLD) * 100));
  const remaining = FREE_THRESHOLD - orderTotal;
  const achieved = orderTotal >= FREE_THRESHOLD;

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-sm font-semibold text-gray-700">
          {achieved ? (
            <span className="text-[#28a745]">🎉 You've unlocked free delivery!</span>
          ) : (
            <>
              Add{" "}
              <span className="text-[#28a745] font-bold">
                LKR {remaining.toLocaleString()}
              </span>{" "}
              more for <span className="font-bold">free delivery</span>
            </>
          )}
        </p>
        <span className="text-xs text-gray-400 font-semibold">{pct}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: achieved
              ? "#28a745"
              : "linear-gradient(to right, #5cd65c, #28a745)",
          }}
        />
      </div>
      {!achieved && (
        <p className="text-xs text-gray-400 mt-1">
          Free delivery on orders over LKR {FREE_THRESHOLD.toLocaleString()}
        </p>
      )}
    </div>
  );
}
