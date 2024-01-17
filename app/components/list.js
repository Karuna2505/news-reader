import React from "react";
import Link from "next/link";

function list({ newsData, likedArticles, handleLiked }) {
  return (
    <div className="w-full flex flex-col items-center">
      {newsData.map(
        (article, index) =>
          article.description &&
          article.image_url && (
            <Link
              href={{
                pathname: "/NewsDetail",
                query: { ...article },
              }}
              key={article.title}
            >
              <div className="max-w-max mx-12 my-6 rounded-2xl shadow-md shadow-white overflow-hidden md:max-w-6xl border-white border-2">
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <img
                      className="h-56 w-full object-cover md:h-full md:w-64"
                      src={article.image_url}
                      alt={article.title}
                    />
                  </div>
                  <div className="p-8">
                    <div className="block mt-1 text-lg leading-tight font-medium">
                      {article.title}
                    </div>
                    <p className="mt-2">{article.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
      )}
    </div>
  );
}

export default list;
