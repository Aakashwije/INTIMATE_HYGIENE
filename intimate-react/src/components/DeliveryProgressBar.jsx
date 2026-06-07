import { MapPin, Truck } from "lucide-react";
import { DELIVERY_POLICY_TEXT } from "../lib/delivery";

export default function DeliveryProgressBar() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3">
      <div className="flex items-start gap-3">
        <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#28a745]" />
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {DELIVERY_POLICY_TEXT}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[#28a745] ring-1 ring-green-200">
              <MapPin className="h-3.5 w-3.5" />
              Colombo area: FREE
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-gray-700 ring-1 ring-green-200">
              Outside Colombo: LKR 350
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
