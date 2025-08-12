import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: '#D6A99D' }} className="text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-2xl font-bold tracking-wide">
            Student Manager
          </div>
          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-white/80 transition">Student List</Link>
            <Link to="/manage" className="hover:text-white/80 transition">Manage Students</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div style={{ backgroundColor: '#D6A99D' }} className="md:hidden px-4 pb-4">
          <Link
            to="/"
            className="block py-2 hover:text-white/80 transition"
            onClick={() => setOpen(false)}
          >
            Student List
          </Link>
          <Link
            to="/manage"
            className="block py-2 hover:text-white/80 transition"
            onClick={() => setOpen(false)}
          >
            Manage Students
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;