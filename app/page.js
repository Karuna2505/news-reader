"use client"
import React, { useState, useEffect } from "react";
import { auth,db } from "./firebase";
import { setDoc,deleteDoc,doc, getDoc } from "firebase/firestore";
import Grid from "./components/grid";
import List from "./components/list";


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
             <Grid newsData={newsData} likedArticles={likedArticles} handleLiked={handleLiked}/>
        ) : (
             <List newsData={newsData} likedArticles={likedArticles} handleLiked={handleLiked}/>
        )}
      </div>
    </main>
  );
}

