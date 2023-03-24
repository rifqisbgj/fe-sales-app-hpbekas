import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainNav({ setKeyword, setProduct, setTempCreate }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchData = (e) => {
    e.preventDefault();
    setProduct([]);
    setTempCreate(0);
    setKeyword(query);
    // navigate("/products", { state: { q: query }, replace: true });
  };
  return (
    <>
      <div class="bg-white shadow-sm sticky z-10 top-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
          <div class="flex items-center justify-between">
            <div className="md:hidden"></div>

            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center py-2"
            >
              <svg
                className="w-8 text-deep-purple-accent-400"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                BagjaCell
              </span>
            </a>

            <div class="flex items-center space-x-4">
              <div className="relative w-[500px] mt-1 shadow-sm hidden md:block">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <MagnifyingGlassIcon class="h-5 w-5 text-primary" />
                </div>
                <form onSubmit={searchData}>
                  <input
                    type="text"
                    name="search"
                    className="block w-full h-8 border-primary rounded py-5 pl-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Cari di Bagja Cell"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>

          <div class="relative md:hidden pb-2">
            <input
              type="search"
              class="mt-1 w-full pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none"
              placeholder="Cari di Bagja Cell"
            />

            <svg
              class="h-6 w-6 text-gray-300 ml-2 mt-3 stroke-current absolute top-0 left-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
