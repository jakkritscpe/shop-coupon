"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const EditContent = ({ name, tag }: {  name: string,tag: string }) => {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");

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

        return;
      }

      await axios.put(`/api/content`, {
        id,
        title: tag,
        description,
        tag,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>{name}</div>
      <div className="divider"></div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea textarea-bordered w-full resize-y"
          placeholder="แก้ไขข้อมูล"
          value={description}
          rows={10}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="btn btn-neutral">
          <Image src="/save.svg" alt="Line" width={18} height={18} />
          บันทึก
        </button>
      </form>
    </div>
  );
};

export default EditContent;
