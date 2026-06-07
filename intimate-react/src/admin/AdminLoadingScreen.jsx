import { Loader2 } from "lucide-react";

const assetBase = import.meta.env.BASE_URL;

export default function AdminLoadingScreen({
  label = "Checking admin session...",
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src={`${assetBase}shortlogo.png`}
          alt="Hygenc"
          className="h-12 w-12 object-contain"
        />
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin text-green-primary" />
          {label}
        </div>
      </div>
    </div>
  );
}
