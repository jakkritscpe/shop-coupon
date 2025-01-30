"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      {/* Section 1: About & Contact */}
      <div>
        <span className="footer-title">เกี่ยวกับเรา</span>
        <Link href="/about" className="link link-hover">
          เกี่ยวกับ MyShop
        </Link>
        <Link href="/contact" className="link link-hover">
          ติดต่อเรา
        </Link>
      </div>

      {/* Section 2: Legal Links */}
      <div>
        <span className="footer-title">กฎหมาย</span>
        <Link href="/terms" className="link link-hover">
          ข้อกำหนดการให้บริการ
        </Link>
        <Link href="/privacy" className="link link-hover">
          นโยบายความเป็นส่วนตัว
        </Link>
      </div>

      {/* Section 3: Payment Provider */}
      <div>
        <span className="footer-title">การชำระเงิน</span>
        <Link href="https://stripe.com" className="link link-hover">
          เราใช้ Stripe ในการรับชำระเงิน
        </Link>
      </div>

      {/* Section 4: Social Links */}
      <div>
        <span className="footer-title">ติดตามเรา</span>
        <div className="flex space-x-4">
          <Link href="https://www.facebook.com" aria-label="Facebook">
            <Image src="/facebook.svg" alt="Facebook" width={35} height={35} />
          </Link>
          <Link href="https://www.instagram.com" aria-label="Instagram">
            <Image src="/instagram.svg" alt="Instagram" width={35} height={35} />
          </Link>
          <Link href="https://line.me" aria-label="Line">
            <Image src="/line.svg" alt="Line" width={35} height={35} />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full mt-10 flex flex-col items-center">
        {/* <Image src="/logo.svg" alt="MyShop Logo" width={120} height={40} /> */}
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">MyShop</a>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} MyShop. สงวนลิขสิทธิ์.
        </p>
      </div>
    </footer>
  );
}
