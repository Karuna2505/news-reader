"use client"
import React,{useEffect, useState} from 'react'
import Link from 'next/link';
import Navbar from "../components/navbar";

function page() {
  const [newsData,setNewsData]=useState([]);
 
  async function handledelete(articleId) {
   
  }
  return (
    <div className='flex flex-col items-center'>
    <Navbar />
    <div className="flex flex-col items-center m-8 !mt-16 w-full">
            {newsData.map((article) => (
              <div
                key={article.title}
                className="max-w-max mx-12 my-6 rounded-2xl shadow-md shadow-white overflow-hidden md:max-w-6xl border-white border-2"
              >
              <div className='md:flex'>
                <div className="m-11 md:shrink-0">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="h-56 w-full object-cover md:h-full md:w-64"
                  />
                </div>
                <div className="p-8 flex flex-col">
                  <div className="flex justify-between">
                    <div className="block mt-1 text-lg leading-tight font-medium">
                      {article.title}
                    </div>
                    <button
                    className="mb-6 mx-2 h-6 w-6 shrink"
                    onClick={() => handledelete(article.title)}
                  >
                   <img src='/delete (1).png' alt="delete-icon" className='h-8 w-8'/>
                  </button>
                  </div>
                    <p className="mt-2">{article.description}</p>
                    <div className="py-6 text-blue-200">
                  <Link
              href={{
                pathname: "/NewsDetail",
                query: { ...article },
              }}
              key={article.title}
            >Read More</Link>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
          </div>
      
  )
}

export default page


