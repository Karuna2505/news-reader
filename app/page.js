"use client"
import React, { useState, useEffect } from "react";
import Grid from "./components/grid";
import List from "./components/list";
import Navbar from "./components/navbar";


async function getData() {
  const res = await fetch(
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
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []); 

  

  function handleView() {
    setGrid(!isGrid);
  }



  return (
    <main>
      <div className="flex flex-col items-center">
      <Navbar />
        <button onClick={handleView} className="border rounded-xl p-2 mt-28">
          {isGrid ? "List View" : "Grid View"}
        </button>
        {isGrid ? (
             <Grid newsData={newsData} likedArticles={likedArticles} />
        ) : (
             <List newsData={newsData} likedArticles={likedArticles} />
        )}
      </div>
    </main>
  );
}

