"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowContent = ({ name, tag }: { name: string; tag: string }) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/content?tag=${tag}`);
        if (!res.data.content) {
          console.log("No content found");
          return;
        }

        setDescription(res.data.content.description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [tag]);

  // แยกข้อความตาม \n และแปลงเป็น <p> หรือ <br> เพื่อแสดงการเว้นบรรทัด
  const formatDescription = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ));
  };

  return (
    <div>
      <h1 className="text-2xl">{name}</h1>
      <div className="flex w-full flex-col">
        <div className="divider"></div>
        <div className="card bg-base-200 rounded-box grid h-auto place-items-start p-4 text-justify">
          {formatDescription(description)}
        </div>
      </div>
    </div>
  );
};

export default ShowContent;
