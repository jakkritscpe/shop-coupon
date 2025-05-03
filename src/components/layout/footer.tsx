"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function Footer({ siteName }: { siteName?: string }) {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [line, setLine] = useState("");

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`/api/link-contact`);
        const linkContacts = res.data.linkContacts;

        if (!linkContacts) {
          console.log("No content found");
          return;
        }

        linkContacts.forEach((item: { name: string; link: string }) => {
          if (item.name === "facebook") {
            setFacebook(item.link);
          }
          if (item.name === "instagram") {
            setInstagram(item.link);
          }
          if (item.name === "line") {
            setLine(item.link);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchConfig();
  }, []);

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
          {facebook && (
            <Link href={facebook} aria-label="Facebook">
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={35}
                height={35}
              />
            </Link>
          )}
          {instagram && (
            <Link href={instagram} aria-label="Instagram">
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={35}
                height={35}
              />
            </Link>
          )}
          {line && (
            <Link href={line} aria-label="Line">
              <Image src="/line.svg" alt="Line" width={35} height={35} />
            </Link>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full mt-10 flex flex-col items-center">
        {/* <Image src="/logo.svg" alt="MyShop Logo" width={120} height={40} /> */}
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">{ siteName || "MyShop" }</a>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} { siteName || "MyShop" }. สงวนลิขสิทธิ์.
        </p>
      </div>
    </footer>
  );
}
