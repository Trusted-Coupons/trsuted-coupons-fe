'use client';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">Sorry, the page you're looking for could not be found.</p>
      <a href="/" className="mt-6 text-blue-500">
        Return to Home
      </a>
    </div>
  );
}
