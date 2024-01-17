import React from "react";
import Link from "next/link";

function list({ newsData, likedArticles, handleLiked }) {
  return (
    <ul>
      {newsData.map((article, index) => (
        <li
          key={article.title}
          className="my-8 border-2 h-[17vw] w-[72vw] rounded-xl shadow-white shadow-md"
        >
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
              },
            }}
            className="flex"
          >
            <div className="m-11">
              <img
                src={article.image_url}
                alt={article.title}
                className="h-[12vw] w-[22vw] rounded-xl"
              />
            </div>
            <div className="h-[12vw] w-[50vw]  my-9 mr-6">
              <div className="flex justify-between">
                <h2 className="text-[1.3vw] m-2 font-semibold">{article.title}</h2>
                <button
                  className="mb-6 mx-2"
                  onClick={() => handleLiked(article.title, index)}
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
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default list;

{
  /* <Link
href={{
  pathname: "/NewsDetail",
  query: {
    title: article.title,
    img: article.image_url,
    description: article.description,
    content: article.content,
    url: article.link,
    date: article.pubDate,
  },
}}
rel="noopener noreferrer"
className="text-blue-200 m-2"
>
Read more
</Link> */
}
