import Link from "next/link";

export default function NavbarSignin() {
  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <nav className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center p-3">
            {/* Logo */}
            <img
              src="/PickMe_transparent.svg"
              alt="pickme-logo"
              className="bg-white/60 rounded-xl p-1 w-16 h-16"
            />
            {/* End Logo */}
          </Link>
          <div className="hidden md:flex items-center space-x-12 font-cousine">
            <Link
              className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
              href="/"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
              href="/songs"
            >
              Songs
            </Link>
            <Link
              className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
              href="#"
            >
              Tabs
            </Link>
            <Link
              className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
              href="#"
            >
              Profile
            </Link>
            <Link
              className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
              href="#"
            >
              Sign Out
            </Link>
          </div>
          <div className="md:hidden">
            {/* Toggle Button */}
            <button
              type="button"
              className="hs-collapse-toggle flex justify-center items-center size-6 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
              id="hs-navbar-header-floating-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-header-floating"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-header-floating"
            >
              <svg
                className="hs-collapse-open:hidden shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={3} x2={21} y1={6} y2={6} />
                <line x1={3} x2={21} y1={12} y2={12} />
                <line x1={3} x2={21} y1={18} y2={18} />
              </svg>
              <svg
                className="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            {/* End Toggle Button */}
          </div>
          <div
            id="hs-navbar-header-floating"
            className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:hidden"
            aria-labelledby="hs-navbar-header-floating-collapse"
          >
            <div className="flex flex-col items-center mt-4 space-y-4">
              <Link
                className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                href="/"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                href="/songs"
              >
                Songs
              </Link>
              <Link
                className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                href="#"
              >
                Tabs
              </Link>
              <Link
                className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                href="#"
              >
                Profile
              </Link>
              <Link
                className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                href="#"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
    </>
  );
}
