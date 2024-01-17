"use client"
import React, { useState, useEffect } from "react";
import { auth,db } from "./firebase";
import { setDoc,deleteDoc,doc, getDoc } from "firebase/firestore";
import Grid from "./components/grid";
import List from "./components/list";
import Navbar from "./components/navbar";


async function getData() {
  // const apiKey = "acda265f2a3046aca1e4b35aa2eacf2a"; //newapi.org
  // const apiKey = "pub_36563d277fc44137b7d3d550f5dc2cbbd712b";    //newsdata.io
  const res = await fetch(
    // `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&pageSize=40`
    `https://newsdata.io/api/1/news?apikey=pub_36563d277fc44137b7d3d550f5dc2cbbd712b&country=in&language=en`
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
        setNewsData(data.results);
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

  async function handleLiked(title,index) {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Login to add news articles");
        return;
      }
      const userEmail=user.email;
      const article=newsData[index];
    const articleRef = doc(db, userEmail,title);

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
      <div className="flex flex-col items-center">
      <Navbar />
        <button onClick={handleView} className="border rounded-xl p-2 mt-28">
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

