import React from "react";
import Link from "next/link";

function list({ newsData, likedArticles}) {
  return (
    <div className="w-full flex flex-col items-center">
      {newsData.map(
        (article, index) =>
          article.description &&
          article.image_url && (
            <div className="max-h-full max-w-full mx-12 my-6 rounded-2xl shadow-md shadow-white md:max-w-6xl border-white border-2 overflow-hidden">
              <div className="md:flex">
                <div className="md:shrink-0">
                  <img
                    className="h-56 w-full object-cover md:h-full md:w-64"
                    src={article.image_url}
                    alt={article.title}
                  />
                </div>
                <div className="p-8 flex flex-col">
                  <div className="flex justify-between">
                    <div className="block m-1 text-lg leading-tight font-medium">
                      {article.title}
                    </div>
                    <button
                      className="h-6 w-fit contents"
                    >
                      {likedArticles[index] ? (
                        <img
                          src="/red heart.png"
                          alt="liked-icon"
                          className="h-6"
                        />
                      ) : (
                        <img
                          src="/heart.png"
                          alt="heart-icon"
                          className="h-6"
                        />
                      )}
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
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default list;
