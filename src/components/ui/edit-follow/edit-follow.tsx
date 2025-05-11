"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const EditFollow = ({ name }: { name: string }) => {
  const [followLink, setFollowLink] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const fetchLinkContacts = async () => {
      try {
        setLoading(true); // ⏳ เริ่มโหลด
        const res = await axios.get(`/api/link-contact?name=${name}`);
        if (!res.data.linkContact) {
          console.log("No content found");
          return;
        }
        setFollowLink(res.data.linkContact.link);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // ✅ โหลดเสร็จ
      }
    };

    fetchLinkContacts();
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (followLink) {
        await axios.post(`/api/link-contact`, {
          name,
          link: followLink,
        });
      } else {
        await axios.put(`/api/link-contact`, {
          name,
          link: followLink,
        });
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isSuccess && (
        <div
          role="alert"
          className="alert alert-soft text-green-400 fixed top-4 left-1/2 w-fit shadow-lg transition-all duration-500 animate-fade-in z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>บันทึกสำเร็จ</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center w-full py-4 gap-3">
          <span className="loading loading-ring loading-xl"></span>
          <p className="text-base text-gray-600">กำลังโหลด...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="relative">
            <span className="text text-gray-600 mb-1 block">{name}</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`https://${name}/your_page`}
                className="input input-bordered w-full max-w-md"
                value={followLink || ""}
                onChange={(e) => setFollowLink(e.target.value)}
              />
              <button className="btn btn-neutral flex items-center gap-2">
                <Image src="/save.svg" alt="Save" width={18} height={18} />
                <span>บันทึก</span>
              </button>
            </div>
          </label>
        </form>
      )}
    </>
  );
};

export default EditFollow;