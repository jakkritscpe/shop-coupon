import React from "react";
import Link from "next/link";

const Header = () => {
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
                หน้าหลัก
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-primary">
                สินค้า
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                ติดต่อเรา
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section - CTA & Mobile Menu */}
        <div className="flex-none gap-2">
          {/* Desktop CTA */}
          {/* <button className="btn btn-primary hidden md:inline-flex">
            เข้าสู่ระบบ
          </button> */}

          {/* Mobile Menu Toggle */}
          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
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
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
          <Link href="/#" className="hover:text-primary" onClick={() => (document.activeElement as HTMLElement)?.blur()}>
            หน้าหลัก
          </Link>
              </li>
              <li>
          <Link href="/products" className="hover:text-primary" onClick={() => (document.activeElement as HTMLElement)?.blur()}>
            สินค้า
          </Link>
              </li>
              <li>
          <Link href="/contact" className="hover:text-primary" onClick={() => (document.activeElement as HTMLElement)?.blur()}>
            ติดต่อเรา
          </Link>
              </li>
              {/* <li className="md:hidden mt-2">
          <a className="btn btn-primary">เข้าสู่ระบบ</a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
