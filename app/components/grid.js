import React from "react";
import Link from "next/link";

function grid({ newsData, likedArticles }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center w-full">
      {newsData.map(
        (article, index) =>
          article.description &&
          article.image_url && (
            <Link
              href={{
                pathname: "./NewsDetail",
                query: { ...article },
              }}
              key={article.title}
            >
              <div className="h-[20rem] w-[25rem] m-4 border-2 rounded-xl flex flex-col p-6 items-center shadow-md shadow-white">
                <div className="flex justify-between w-full">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="h-28 w-44"
                  />
                  <button className="mb-6 mx-2">
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
                <h6 className="overflow-hidden">{article.description}</h6>
              </div>
            </Link>
          )
      )}
    </div>
  );
}

export default grid;
