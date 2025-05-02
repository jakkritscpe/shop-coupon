"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const EditContent = ({ name, tag }: { name: string; tag: string }) => {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/content?tag=${tag}`);
        if (!res.data.content) {
          console.log("No content found");
          return;
        }

        setId(res.data.content.id);
        setDescription(res.data.content.description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [tag]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!id) {
        await axios.post(`/api/content`, {
          title: tag,
          description,
          tag,
        });
      } else {
        await axios.put(`/api/content`, {
          id,
          title: tag,
          description,
          tag,
        });
      }

      setIsSuccess(true); // ✅ แสดง modal สำเร็จ

      // ✅ ซ่อน alert หลัง 3 วินาที
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>{name}</div>
      <div className="divider"></div>

      {isSuccess && (
        <div role="alert" className="alert text-green-500 fixed top-4 left-1/2 w-fit shadow-lg transition-all duration-500 animate-fade-in z-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>บันทึกสำเร็จ</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea textarea-bordered w-full resize-y"
          placeholder="แก้ไขข้อมูล"
          value={description}
          rows={10}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="btn btn-neutral mt-2">
          <Image src="/save.svg" alt="Line" width={18} height={18} />
          บันทึก
        </button>
      </form>
    </div>
  );
};

export default EditContent;