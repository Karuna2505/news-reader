'use client'
import Navbar from "../components/navbar";
function NewsDetail({searchParams} ) {
  return (
    <>
    <Navbar />
    <div className='pt-16 flex flex-col w-full'>
      <div className='flex justify-between'>
        <p className='font-bold text-3xl m-6'>{searchParams.title}</p>
        <button className='m-6'><img src='/heart.png' alt="heart-icon" className='h-6'/></button>
      </div>
     
      <div className='border mx-6 bg-[rgb(255,255,255,0.1)] rounded-lg'>
      <p className='text-xl p-4'>{searchParams.description}</p>
      </div>
      <img src={searchParams.image_url} alt={searchParams.title} className='h-[30rem] w-[45rem] m-10'/>
      <p className='font-medium text-xl mx-6 my-2'>{searchParams.full_description}</p>
      <div className='flex m-4 justify-between'>
      <span className='m-2 text-lg '>Published At: {searchParams.pubDate}</span>
      <a href={searchParams.link} target='_blank' className='m-2 text-lg text-blue-300'>Read more</a>
      </div>
    </div>
    </>
  );
}
export default NewsDetail;



