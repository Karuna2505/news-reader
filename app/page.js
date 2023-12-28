"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth,db } from "./firebase";
import { setDoc,deleteDoc,doc, getDoc } from "firebase/firestore";


async function getData() {
  const apiKey = "acda265f2a3046aca1e4b35aa2eacf2a";
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&pageSize=40`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  const [newsData, setNewsData] = useState([]);
  const [isGrid, setGrid] = useState(false);
  const [likedArticles, setLikedArticles] = useState(Array(newsData.length).fill(false));
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setNewsData(data.articles);
        setLikedArticles(new Array(data.articles.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []); 

  function handleView() {
    setGrid(!isGrid);
  }

  async function handleLiked(index) {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Login to add news articles");
        return;
      }
      const userEmail=user.email;
      const article=newsData[index];
    const articleId = index.toString();
    const articleRef = doc(db, userEmail,articleId);

    const articleDoc = await getDoc(articleRef);

    if (articleDoc.exists()) {
      await deleteDoc(articleRef);
    } else {
      await setDoc(articleRef, article);
    }
      setLikedArticles((prevLikedArticles) => {
        const newLikedArticles = [...prevLikedArticles];
        newLikedArticles[index] = !newLikedArticles[index];
        return newLikedArticles;
      });
      
    } catch (error) {
      console.error("Error adding/removing:", error);
    }
  }


  return (
    <main>
      <div className="flex flex-col justify-center items-center flex-wrap m-8">
        <button onClick={handleView} className="border rounded-xl p-2">
          {isGrid ? "List View" : "Grid View"}
        </button>
        {isGrid ? (
          <div className="flex flex-wrap gap-4 justify-center" role="status">
            {newsData.map((article,index) => (
              <div
                key={article.title}
                className="h-[20rem] w-[25rem] m-8 border-2 rounded-xl flex flex-col p-6 items-center"
              >
                <div className="flex justify-between w-full">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="h-28 w-44"
                  />
                 <button
                    className="mb-6 mx-2"
                    onClick={() => handleLiked(index)}
                  >
                    {likedArticles[index] ? (
                      <img
                        src="/red heart.png"
                        alt="liked-icon"
                        className="h-6 w-6"
                      />
                    ) : (
                      <img
                        src="/heart.png"
                        alt="heart-icon"
                        className="h-6 w-6"
                      />
                    )}
                  </button>
                </div>
                <h3 className="font-semibold p-4">{article.title}</h3>
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
                    }
                  }}
                  rel="noopener noreferrer"
                  className="text-blue-200 m-2"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <ul>
            {newsData.map((article,index) => (
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
                    <button
                    className="mb-6 mx-2"
                    onClick={() => handleLiked(index)}
                  >
                    {likedArticles[index] ? (
                      <img
                        src="/red heart.png"
                        alt="liked-icon"
                        className="h-6 w-6"
                      />
                    ) : (
                      <img
                        src="/heart.png"
                        alt="heart-icon"
                        className="h-6 w-6"
                      />
                    )}
                  </button>
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
        )}
      </div>
    </main>
  );
}

