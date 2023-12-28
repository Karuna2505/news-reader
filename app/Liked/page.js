"use client";
import React from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";
import {auth} from "../firebase";

async function page() {
  const q = query(collection(db,"karunamathur14@gmail.com"));
  const querySnapshot = await getDocs(q);
  const articles = Array.from(querySnapshot.docs).map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(articles);
  return <div className="flex flex-col justify-center items-center flex-wrap m-8 bg-lime-50 h-[40rem]">
      <ul>
            {articles.forEach((article) => (
              <li
                key={article.title}
                className="my-8 mx-20 border-2 flex justify-between h-[18rem] w-[80rem] rounded-xl"
              >
                <div className="m-11">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="h-[12rem] w-[22rem] rounded-xl"
                  />
                </div>
                <div className="h-[12rem] w-[50rem]  my-9 mr-6">
                  <div className="flex justify-between">
                    <h2 className="text-xl m-2 font-semibold">
                      {article.title}
                    </h2>
                    
                  </div>
                  <p className="m-2 ">{article.description}</p>
                  <p className="m-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {article.content}
                  </p>
                  <Link
                    href={{
                      pathname: "/NewsDetail",
                      query: {
                        title: article.title,
                        img: article.urlToImage,
                        description: article.description,
                        content: article.content,
                        url: article.url,
                        date: article.publishedAt,
                      },
                    }}
                    rel="noopener noreferrer"
                    className="text-blue-200 m-2"
                  >
                    Read more
                  </Link>
                </div>
              </li>
            ))}
          </ul>
  </div>
}

export default page;
