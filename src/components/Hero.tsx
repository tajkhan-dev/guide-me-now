import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <>
    <div className='h-screen  flex justify-around items-center'>
        <div className='max-w-[450px] pt-[100px] ml-5  '>
            <h1 className='font-font text-[#1877f2] font-semibold  text-[65px] leading-none'>
                Guide <span className=''>Me</span>  Now
            </h1>
            <p className='text-2xl    mt-2 '>
                The Perfect Guide for the future of <span className='font-font text-[#1877f2] font-semibold'>Young Generation</span> 
            </p>
            <p className='mt-5   '>Your Ultimate IT Career Navigator Discover your ideal path in the world of technology with our interactive platform, tailored specifically for young students. Explore various IT careers, receive personalized recommendations, and embark on a journey to a successful future in the rapidly evolving IT industry.</p>
           <Link href={"/queries"}> <button type="button" className="btn bg-gradient-to-br from-[#fed32c] via-[#fed32e] to-[#fed32f] text-black  hover:bg-gradient-to-br focus:outline-none focus:ring-white dark:focus:ring-black shadow-lg  hover:dark:shadow-lgfont-medium rounded-lg text-sm   transition-all duration-300 ease-in-out mr-2 mb-2 mt-2">get the ultimate guide now</button> </Link>


{/* Old Taj Button */}

{/* <button className='bg-[#1877f2]  mt-10 text-white font-semibold text-lg px-4 py-2 rounded hover:bg-[#1877f9] transition-all duration-300 ease-in-out '>get the ultimate guide now</button> */}


{/* Old Hassaan Button */}

{/* text-white bg-gradient-to-r from-[#1877f2] via-[#1877f2] to-[#1868d1] hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 */}

        </div>
        <div className='mt-10'>
             <Image src={"/pr4.png"} alt='' width={550} height={500} />
        </div>

    </div>
    
    </>
  )
}
