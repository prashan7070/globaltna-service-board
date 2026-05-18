import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">Resource Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The job request or page you are looking for doesn't exist or has been removed.
      </p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
        Return to Home
      </Link>
    </div>
  );
}