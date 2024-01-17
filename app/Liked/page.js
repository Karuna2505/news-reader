"use client"
import React,{useEffect, useState} from 'react'
import { collection, onSnapshot ,deleteDoc,doc } from "firebase/firestore";
import { db } from '../firebase';
import Link from 'next/link';
import { auth } from '../firebase';
import Navbar from "../components/navbar";

function page() {
  const [newsData,setNewsData]=useState([]);
  if(!auth.currentUser){
    return console.log("Login first");
  }
  const userEmail=auth.currentUser.email;
  const ref = collection(db, userEmail);  
  useEffect(() => {
    const unsub = onSnapshot(ref, (snapshot) => {
      setNewsData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub(); 
  }, []);
 
  async function handleDelete(articleId) {
    try {
      await deleteDoc(doc(db, userEmail, articleId));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  }
  return (
    <div className='flex flex-col items-center'>
    <Navbar />
    <div className="flex flex-col justify-center items-center flex-wrap m-8 !mt-12">
    <ul>
            {newsData.map((article) => (
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
                    <button onClick={() => handleDelete(article.title)}>
                    <img src='/delete (1).png' alt="delete-icon" className='h-8 w-8'/>
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
                       ...article
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
          </div>
  )
}

export default page


