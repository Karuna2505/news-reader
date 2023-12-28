'use client'
function NewsDetail({searchParams} ) {

  return (
    <div className='m-4  flex flex-col'>
      <div className='flex justify-between'>
        <p className='font-bold text-3xl m-6'>{searchParams.title}</p>
        <button className='m-6'><img src='/heart.png' alt="heart-icon" className='h-6'/></button>
      </div>
     
      <div className='border w-max mx-6 bg-[rgb(255,255,255,0.1)] rounded-lg'>
      <p className='text-xl p-4'>{searchParams.description}</p>
      </div>
      <img src={searchParams.img} alt={searchParams.title} className='h-[30rem] w-[45rem] m-10'/>
      <p className='font-medium text-xl mx-6 my-2'>{searchParams.content}</p>
      <div className='flex m-4 justify-between'>
      <span className='m-2 text-lg '>Published At: {searchParams.date}</span>
      <a href={searchParams.url} target='_blank' className='m-2 text-lg text-blue-300'>Read more</a>
      </div>
    </div>
  );
}
export default NewsDetail;



