"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Setting = () => {
  const [listName, setListName] = useState<string[]>([]);
  const [siteName, setSiteName] = useState("");
  const [logo, setLogo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [limitItems, setLimitItems] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state

  const [checkboxStates, setCheckboxStates] = useState({
    promptpay: false,
    card: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxStates((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true); // ⏳ เริ่มโหลด
        const res = await axios.get(`/api/config`);
        const config = res.data.config;

        if (!config) {
          console.log("No content found");
          return;
        }

        const _listName: string[] = [];
        config.forEach((item: { id: number; name: string; value: string }) => {
          _listName.push(item.name);

          if (item.name === "siteName") setSiteName(item.value);
          if (item.name === "logo") setLogo(item.value);
          if (item.name === "paymentMethod") {
            setPaymentMethod(item.value);
            const methods = item.value.split(",");
            setCheckboxStates({
              promptpay: methods.includes("promptpay"),
              card: methods.includes("card"),
            });
          }
          if (item.name === "limitItems") {
            setLimitItems(Number(item.value));
          }
        });

        setListName(_listName);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // ✅ โหลดเสร็จ
      }
    };

    fetchConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent, id: number, name: string, value: string) => {
    e.preventDefault();

    if (name === "paymentMethod") {
      value = buildPaymentMethod();
    }

    try {
      if (!listName.includes(name)) {
        await axios.post(`/api/config`, { name, value });
      } else {
        await axios.put(`/api/config`, { name, value });
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const buildPaymentMethod = () => {
    const method: string[] = [];
    if (checkboxStates.promptpay) method.push("promptpay");
    if (checkboxStates.card) method.push("card");
    return method.join(",");
  };

  return (
    <>
      {isSuccess && (
        <div role="alert" className="alert text-green-500 fixed top-4 left-1/2 w-fit transition-all duration-500 animate-fade-in z-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>บันทึกสำเร็จ</span>
        </div>
      )}

      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">ตั้งค่า</h1>
        <div className="divider"></div>

        {loading ? (
          <div className="flex justify-center items-center w-full py-4 gap-3">
            <span className="loading loading-ring loading-xl"></span>
            <p className="text-base text-gray-600">กำลังโหลด...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <form onSubmit={(e) => handleSubmit(e, 1, "siteName", siteName)}>
              <label className="relative">
                <span className="text text-gray-600 mb-1 block">ชื่อเว็บไซต์</span>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="..." className="input input-bordered w-full max-w-sm" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
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
                  <input type="text" placeholder="<svg>...</svg>" className="input input-bordered w-full max-w-sm" value={logo} onChange={(e) => setLogo(e.target.value)} />
                  <button className="btn btn-neutral flex items-center gap-2">
                    <Image src="/save.svg" alt="Save" width={18} height={18} />
                    <span>บันทึก</span>
                  </button>
                </div>
              </label>
            </form>
            <form onSubmit={(e) => handleSubmit(e, 3, "paymentMethod", paymentMethod)}>
              <div className="mb-2">
                <span className="text text-gray-600 block mb-2">Payment Method</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 ml-4">
                <div className="flex items-center gap-4">
                  <input type="checkbox" name="promptpay" id="promptpay" className="checkbox" checked={checkboxStates.promptpay} onChange={handleCheckboxChange} />
                  <label htmlFor="promptpay" className="text-gray-700 cursor-pointer">
                    PromptPay
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <input type="checkbox" name="card" id="card" className="checkbox" checked={checkboxStates.card} onChange={handleCheckboxChange} />
                  <label htmlFor="card" className="text-gray-700 cursor-pointer">
                    Card
                  </label>
                </div>

                <button type="submit" className="btn btn-neutral flex items-center ml-[150px]">
                  <Image src="/save.svg" alt="Save" width={18} height={18} />
                  <span>บันทึก</span>
                </button>
              </div>
            </form>
            <form onSubmit={(e) => handleSubmit(e, 4, "limitItems", limitItems.toString())}>
              <label className="relative">
                <span className="text text-gray-600 mb-1 block">จำนวนสินค้าที่แสดง</span>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="" className="input input-bordered w-full max-w-sm" value={limitItems} onChange={(e) => setLimitItems(Number(e.target.value))} />
                  <button className="btn btn-neutral flex items-center gap-2">
                    <Image src="/save.svg" alt="Save" width={18} height={18} />
                    <span>บันทึก</span>
                  </button>
                </div>
              </label>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Setting;
