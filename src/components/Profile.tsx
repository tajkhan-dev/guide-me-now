"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BiEdit } from "./Icons";
import { Formik } from "formik";
import axios from "axios";
import useSWR from "swr";

import { MyFormValues } from "@/types";

export default function Profile({ user }: any) {
  const [edit, setedit] = useState(true);

  const fetcher = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
        throw error;
      }  
}

  const { data, isLoading, error } = useSWR("/api/profile", fetcher);
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useSWR("/api/playlist", fetcher);
  const {
    data: data3,
    isLoading: isLoading3,
    error: error3,
  } = useSWR("/api/quiz", fetcher);
  function changeedit() {
    setedit(false);
  }



  const initialValues: MyFormValues = { about: "", edu: "", com: "" };

  return (
    <>
      <div className="flex ">
        <div className="mb-20 w-[300px] shadow-lg   mt-20">
          <div className="">
            <Image
              className="rounded-full"
              src={`${user?.profileImageUrl}`}
              width={100}
              height={200}
              alt=""
            />
          </div>
          <h6 className="text-2xl font-font font-bold">{user?.firstName}</h6>
          <h6 className="text-gray-500 ">@{user?.username}</h6>
          <h6 className="text-base font-medium">
            {user?.emailAddresses[0].emailAddress}
          </h6>
          <hr />

          {edit ? (
            isLoading ? (
              <div role="status" className="max-w-sm animate-pulse mt-5">
                <div className="h-[32px] bg-gray-200 rounded-full dark:bg-gray-300 max-w-[100px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[250px] mb-2.5"></div>
                <div className="h-[32px] mt-5 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[100px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[250px] mb-2.5"></div>
                <div className="h-[32px] mt-5 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[120px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[250px] mb-2.5"></div>

                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="mt-5 flex justify-between ">
                {data?.map((info: any, index: number) => (
                  <div>
                    <h6 className=" text-2xl font-semibold font-font ">
                      About
                    </h6>
                    {info.about}
                    <h6 className="mt-5  text-2xl font-semibold font-font ">
                      Education
                    </h6>
                    <p>{info.education}</p>
                    <h6 className="mt-5  text-2xl font-semibold font-font ">
                      Communication Skills
                    </h6>
                    <p>{info.skills}</p>
                  </div>
                ))}
                <div>
                  <BiEdit
                    onClick={changeedit}
                    className="cursor-pointer"
                    size={20}
                  />
                </div>
              </div>
            )
          ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, { resetForm }) => {
                try {
                  if (user.id !== data[0].userid) {
                    const res = await axios.post(
                      "/api/profile",
                      {
                        userid: user.id,
                        about: values.about,
                        education: values.edu,
                        communication: values.com,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    console.log(res.status);
                  } else {
                    const res = await axios.patch(
                      "/api/profile",
                      {
                        userid: user.id,
                        about: values.about,
                        education: values.edu,
                        communication: values.com,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    console.log(res.data);
                  }

                  setedit(true);
                } catch (error: any) {
                  if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                  } else if (error.request) {
                    console.log("network error");
                  } else {
                    console.log(error);
                  }
                }

                console.log(values);
              }}
            >
              {({
                values,
                resetForm,
                handleChange,

                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between items-baseline mt-5">
                    <h6 className=" text-2xl font-semibold font-font ">
                      About
                    </h6>
                    <BiEdit
                      onClick={changeedit}
                      className="cursor-pointer"
                      size={20}
                    />
                  </div>
                  <textarea
                    name="about"
                    onChange={handleChange}
                    value={values.about}
                    disabled={edit}
                    placeholder="Tell us About yourself"
                    className="mt-3 textarea textarea-bordered textarea-md w-[85%] max-w-xs"
                  ></textarea>
                  <h6 className="mt-5  text-2xl font-semibold font-font ">
                    Education
                  </h6>
                  <select
                    name="edu"
                    onChange={handleChange}
                     value={values.edu} 
                    disabled={edit}
                    className="mt-5 mb-5 select select-bordered w-   [85%] max-w-xs"
                  >
                    <option selected>choose one</option>
                    <option>Middle</option>
                    <option>Matriculation</option>
                    <option>Intermediate</option>
                    <option>Bachelors</option>
                  </select>

                  <h6 className="mt-5  text-2xl font-semibold font-font ">
                    Communication Skills
                  </h6>
                  <select
                    onChange={handleChange}
                    value={values.com}
                    name="com"
                    disabled={edit}
                    className="mt-5 mb-5 select select-bordered w-[85%] max-w-xs"
                  >
                    <option selected>choose one</option>
                    <option>Beginner</option>
                    <option>Elementary</option>
                    <option>Fluent</option>
                    <option>Expert</option>
                  </select>

                  <button type="submit" className="btn ">
                    save
                  </button>
                  <button
                    onClick={() => {
                      resetForm();
                      setedit(true);
                    }}
                    className="btn "
                  >
                    cancel
                  </button>
                </form>
              )}
            </Formik>
          )}
        </div>

         <div className="mx-auto h-screen mt-14  ">
         <h1 className="text-center font-font font-bold text-[40px] text-[#1877f2]">
            Courses
          </h1>
          {
             isLoading2? (
              <div className="grid grid-cols-3 gap-20 place-items-center">
              {[...Array(9).keys()].map((course: any, index: number) => (
                <div key={index} className="max-w-sm">
                  <div className="animate-pulse">
                    <div
                      className="mx-auto h-[100px] bg-gray-200 rounded-md dark:bg-gray-700 w-[80px] mb-4"
                      ></div>
                    <p className="mx-auto h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5 text-center font-font text-xl font-bold text-[#1877f2]">
                      {course.heading}
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-16">
                   
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-56">
                   
                   </div>
                  
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              ))}
            </div>
            
            

        
            
            
            
             )
          :  <div className="place-items-center gap-20 grid md:grid-cols-3">
      
            {data2?.map((course: any, index: number) => (
              <div key={index}>
                <Image
                  className="mx-auto"
                  src={course.url}
                  alt=""
                  width={50}
                  height={50}
                />
                <p className="text-center mt-2 font-font text-xl  font-bold text-[#1877f2] ">
                  {course.heading}
                </p>
<div>
  <p className="text-lg font-bold">
    {course.cpercent}%
  </p>
  <progress
                  className="progress progress-info w-56"
                  value={course.cpercent}
                  max="100"
                ></progress>
</div>
                
              </div>
            ))}
          </div>
          }
          {
            isLoading3?<div className="mt-96 flex-end justify-center items-center  ">
            <div className="text-center">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          </div>:
            <div className="">
          
              {data3?.map((quiz:any,index:number)=>(
              <div key={index} className="">

              {quiz.heading}
              </div>
            ))}
              
            </div>
          
        
              }
        </div>
      </div>
    </>
  );
}
