"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Setting = () => {
  const [listId, setListId] = useState<number[]>([]);
  const [siteName, setSiteName] = useState("");
  const [logo, setLogo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`/api/config`);
        const config = res.data.config;

        if (!config) {
          console.log("No content found");
          return;
        }

        const _listId: number[] = [];
        config.forEach((item: { id: number, name: string; value: string }) => {
          _listId.push(item.id);

          if (item.name === "siteName") {
            setSiteName(item.value);
          }
          if (item.name === "logo") {
            setLogo(item.value);
          }
          if (item.name === "paymentMethod") {
            setPaymentMethod(item.value);
          }
        });

        setListId(_listId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConfig();
  }, [setListId]);

  const handleSubmit = async (
    e: React.FormEvent,
    id: number,
    name: string,
    value: string
  ) => {
    e.preventDefault();

    try {
      if (!listId.includes(id)) {
        await axios.post(`/api/config`, {
          name: name,
          value: value,
        });
      } else {
        await axios.put(`/api/config`, {
          id: id,
          name: name,
          value: value,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">ตั้งค่า</h1>
      <div className="divider"></div>
      <div className="flex flex-col gap-4">
        <form onSubmit={(e) => handleSubmit(e, 1, "siteName", siteName)}>
          <label className="relative">
            <span className="text text-gray-600 mb-1 block">ชื่อเว็บไซต์</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="..."
                className="input input-bordered w-full max-w-md"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
              <button className="btn btn-neutral flex items-center gap-2">
                <Image src="/save.svg" alt="Save" width={18} height={18} />
                <span>บันทึก</span>
              </button>
            </div>
          </label>
        </form>
        <form onSubmit={(e) => handleSubmit(e, 2, "logo", logo)}>
          <label className="relative">
            <span className="text text-gray-600 mb-1 block">โลโก้บริษัท</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="<svg>...</svg>"
                className="input input-bordered w-full max-w-md"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
              <button className="btn btn-neutral flex items-center gap-2">
                <Image src="/save.svg" alt="Save" width={18} height={18} />
                <span>บันทึก</span>
              </button>
            </div>
          </label>
        </form>
        <form
          onSubmit={(e) => handleSubmit(e, 3, "paymentMethod", paymentMethod)}
        >
          <label className="relative">
            <span className="text text-gray-600 mb-1 block">
              Payment Method
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="promptpay, card"
                className="input input-bordered w-full max-w-md"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <input type="checkbox" defaultChecked className="checkbox" />
              <button className="btn btn-neutral flex items-center gap-2">
                <Image src="/save.svg" alt="Save" width={18} height={18} />
                <span>บันทึก</span>
              </button>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Setting;
