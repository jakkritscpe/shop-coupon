"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div>
      <ul className="menu bg-base-100 w-100">
        <li>
          <Link href="/" className="hover:text-primary">
            <Image src="/home.svg" alt="Line" width={18} height={18} />
            หน้าหลัก
          </Link>
        </li>
        <li>
          <details open>
            <summary>
              {" "}
              <Image src="/edit.svg" alt="Line" width={18} height={18} />
              จัดการข้อมูล
            </summary>
            <ul>
              <li>
                <Link href="/admin/edit/contact" className="hover:text-primary">
                  ติดต่อเรา
                </Link>
              </li>
              <li>
                <Link href="/admin/edit/about" className="hover:text-primary">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/admin/edit/terms" className="hover:text-primary">
                  ข้อกำหนดการให้บริการ
                </Link>
              </li>
              <li>
                <Link href="/admin/edit/privacy" className="hover:text-primary">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link href="/admin/edit/follow" className="hover:text-primary">
                  ติดตามเรา
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link href="/admin/setting" className="hover:text-primary">
            <Image src="/setting.svg" alt="Line" width={18} height={18} />
            ตั้งค่า
          </Link>
        </li>
        {/* <li>
          <Link href="/admin/setting" className="hover:text-primary">
            <Image src="/setting.svg" alt="Line" width={18} height={18} />
            ออกจากระบบ
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
