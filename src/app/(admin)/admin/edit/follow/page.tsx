"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const EditFollowPage = () => {
  const [id, setId] = useState<number[]>([]);
  const [facebook, setFacebook] = useState("");
  const [line, setLine] = useState("");
  const [instagram, setInstagram] = useState("");
  
  const defualtName = ["facebool", "line", "instagram"];
  
  useEffect(() => {
    const fetchLinkContacts = async () => {
      try {
        const res = await axios.get(`/api/link-contact`);
        if (!res.data.linkContacts) {
          console.log("No content found");
          return;
        }

        const linkContacts = res.data.linkContacts
        const listId: number[] = []

        linkContacts.forEach((link: { id: number,name: string; link: string }) => {
          listId.push(link.id)

          if (link.name === "facebook") {
            setFacebook(link.link);
          }
          if (link.name === "line") {
            setLine(link.link);
          }
          if (link.name === "instagram") {
            setInstagram(link.link);
          }
        });

        listId.sort();
        setId(listId);

      } catch (error) {
        console.error(error);
      }
    };

    fetchLinkContacts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id.length === 0) {
        const defualtLink = [facebook, line, instagram];
        defualtName.forEach(async (name, i) => {
          await axios.put(`/api/link-contact`, {
            name,
            link: defualtLink[i],
          });
        });
        return;
      }

      if (id.length !== 0) {
        const link = [facebook, line, instagram];
        id.forEach(async (id, i) => {
          await axios.put(`/api/link-contact`, {
            id,
            link: link[i],
          });
        });
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4" >
      <h1 className="text-xl font-semibold mb-4">ติดตามเรา</h1>
      <div className="divider"></div>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit}>
          <label className="relative">
            <span className="text text-gray-600 mb-1 block">facebook</span>
            <input
              type="text"
              placeholder="https://facebook.com/yourpage"
              className="input input-bordered w-full max-w-md"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </label>
          <label className="relative">
            <span className="text text-gray-600 mb-1 block">line</span>
            <input
              type="text"
              placeholder="https://line.com/yourpage"
              className="input input-bordered w-full max-w-md"
              value={line}
              onChange={(e) => setLine(e.target.value)}
            />
          </label>
          <label className="relative">
            <span className="text text-gray-600 mb-1 block">instagram</span>
            <input
              type="text"
              placeholder="https://instagram.com/yourpage"
              className="input input-bordered w-full max-w-md"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button className="btn btn-neutral w-fit flex items-center gap-2">
            <Image src="/save.svg" alt="Save" width={18} height={18} />
            <span>บันทึก</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFollowPage;
