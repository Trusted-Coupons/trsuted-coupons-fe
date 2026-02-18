'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ lang }: { lang: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<{ id: number; store: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      // Navigate to the stores listing filtered by the search term
      router.push(`/${lang}/stores?q=${encodeURIComponent(trimmed)}`);
    }
  };

  useEffect(() => {
    // Cancel any previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${lang}/store-search-suggestions?q=${encodeURIComponent(searchTerm)}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch suggestions');
        return res.json();
      })
      .then((data: { id: number; store: string }[]) => {
        setSuggestions(Array.isArray(data) ? data.slice(0, 7) : []);
      })
      .catch((err) => {
        // Ignore AbortError — it's intentional when searchTerm changes
        if (err.name !== 'AbortError') {
          console.error('Suggestion fetch error:', err);
          setSuggestions([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [searchTerm, lang]);

  return (
    <div className="relative hidden lg:flex lg:flex-1 lg:justify-end">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="rounded-md border-2 border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="ml-2 rounded-md bg-[#f39151] px-4 py-2 text-white">
          {isLoading ? '...' : 'Search'}
        </button>
      </form>

      {searchTerm && suggestions.length > 0 && (
        <div className="absolute mt-12 right-16 w-[250px] z-50 bg-white shadow-lg rounded-md">
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="px-4 text-black py-2 cursor-pointer hover:bg-gray-200">
                <Link
                  href={`/${lang}/stores/${suggestion.id}`}
                  onClick={() => setSuggestions([])}>
                  {suggestion.store}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
