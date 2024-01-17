import React from 'react'
import Link from 'next/link'

function grid({newsData,likedArticles,handleLiked}) {
  return (
    <div className="flex flex-wrap gap-4 justify-center" role="status">
       {newsData.map((article,index) => (
              <div
                key={article.title}
                className="h-[20rem] w-[25rem] m-8 border-2 rounded-xl flex flex-col p-6 items-center"
              >
                <div className="flex justify-between w-full">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="h-28 w-44"
                  />
                 <button
                    className="mb-6 mx-2"
                    onClick={() => handleLiked(article.title,index)}
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
                      img: article.image_url,
                      description: article.description,
                      content: article.content,
                      url: article.link,
                      date: article.pubDate,
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
  )
}

export default grid
