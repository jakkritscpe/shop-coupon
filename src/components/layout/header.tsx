"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-base-100 shadow-sm">
      <div className="navbar max-w-6xl mx-auto">
        {/* Left Section - Logo */}
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            MyShop
          </Link>
        </div>

        {/* Center Section - Navigation (Desktop) */}
        <div className="flex-none hidden md:flex">
          <ul className="menu menu-horizontal gap-2">
            <li>
              <Link href="/" className="hover:text-primary">
                สินค้าและบริการ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                ติดต่อเรา
              </Link>
            </li>{
              session && (
                <li>
                  <Link href="/admin/edit/contact" className="hover:text-primary">
                    แอดมิน
                  </Link>
                </li>
              )
            }
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-none gap-2">
          {/* 🔒 ปุ่มเข้าสู่ระบบ / ออกจากระบบ */}
          {status !== "loading" && (
            session ? (
              <button className="btn" onClick={() => signOut()}>
                ออกจากระบบ
              </button>
            ) : (
              <button className="btn" onClick={() => signIn()}>
                เข้าสู่ระบบ
              </button>
            )
          )}

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end md:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {menuOpen && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary"
                    onClick={closeMenu}
                  >
                    สินค้าและบริการ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary"
                    onClick={closeMenu}
                  >
                    ติดต่อเรา
                  </Link>
                </li>
                {session && (
                  <li>
                    <Link
                      href="/admin/edit/contact"
                      className="hover:text-primary"
                      onClick={closeMenu}
                    >
                      แอดมิน
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;