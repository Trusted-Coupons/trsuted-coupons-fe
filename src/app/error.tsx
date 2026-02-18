'use client'; // app/error.js''

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">500 - Something Went Wrong</h1>
      <p className="mt-4 text-lg">Something went wrong. Please try again later.</p>
    </div>
  );
}
