"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchplaylist } from "../../sanity/lib/client";
import { Playlist } from "@/types";
import axios from "axios";

interface Play {
  props: string;
}

const PlayList = ({ props }: Play): React.JSX.Element => {
  const [show, setshow] = useState(true);
  const [data, setData] = useState<Playlist[]>([]);
  const [list, setList] = useState<string>("");
  const [videoCount, setVideoCount] = useState(0);
  const [percent, setPercent] = useState(0);

  const xt = async (index: number, heading: string) => {
    if (
      data.length > 0 &&
      videoCount < data.length &&
      data[index] !== data[videoCount]
    ) {
      setVideoCount(videoCount + 1);
      const per = (videoCount / data.length) * 100;
      if (percent <= 100) {
        setPercent(per);
      }
    }

    const res = await axios.patch("/api/playlist", {
      cpercent: Math.floor(percent),
      heading: heading,
    });
    console.log(res.status);
    console.log(res.data);
  }

  const setdata = (url: string) => {
    setList(url);
  }

  const compareByProperty = (property: keyof Playlist) => {
    return (a: Playlist, b: Playlist) =>
      a[property].toUpperCase().localeCompare(b[property].toUpperCase());
  }

  useEffect(() => {
    const fetchData = async () => {
      const play = props;
      const fetchedPlaylist = await fetchplaylist(play);
      const data = fetchedPlaylist.sort(compareByProperty("id"));
      setData(data);

      setList(data.length > 0 ? data[0].url : "");
    }
    fetchData();
  }, [props]);

  const showbtn = async (title: string) => {
    if (data && title === data[data.length - 1].title) {
      setshow(false);
    }
  }

  return (
    <>
      <div className="flex justify-around">
        {/* #fed32e */}

        <div className="mt-24 max-w-[450px] flex flex-col h-[500px] gap-10 p-4   rounded-xl overflow-auto scrollbar-thin scrollbar-thumb-[#1877f2] scrollbar-track-[#fed32e]">
          {data?.map((item: Playlist, index: number) => (
            <div
              className=" font-font text-lg  rounded-md font-bold shadow-xl p-2 "
              key={item.id}
            >
              <button
                onClick={() => {
                  setdata(item.url);
                  showbtn(item.title), xt(index, item.heading);
                }}
              >
                {item.title}
              </button>
            </div>
          ))}
        </div>

        {/*  #2F0743 */}

        <div className="mt-14 ">
          <h1 className="text-4xl font-font font-extrabold    text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1877f2] to-[#1877f9] ">
              {props}
            </span>
            &nbsp;
            <span className="underline underline-offset-4 decoration-6  decoration-[#fed32e] text-[#6c00a5]">
              Course
            </span>
          </h1>

          <iframe
            className="mt-2 rounded-2xl drop-shadow-2xl "
            width={800}
            height={500}
            src={list}
            allowFullScreen
            allow="poster"
          ></iframe>

          {show ? (
            <div className="alert mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Please Watch full playlist</span>
            </div>
          ) : (
            <div className="alert mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Start Quiz Now</span>
            </div>
          )}

          {/* Old Taj Design */}

          {/* btn bg-gradient-to-r from-[#1877f2] to-[#1877f9] text-white hover:text-[#fed32e] rounded-lg px-4 py-2  font-bold text-lg
  transition ease-in duration-300 mt-5 mb-20 */}

          <button
            className="btn bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 text-black  hover:bg-gradient-to-br focus:outline-none focus:ring-white dark:focus:ring-black shadow-lg  hover:dark:shadow-lgfont-medium rounded-lg text-sm   transition-all duration-300 ease-in-out mr-2 mb-2 mt-2"
            disabled={show}
          >
            <Link href={`/quiz/${props}`}>Start Quiz</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default PlayList;
