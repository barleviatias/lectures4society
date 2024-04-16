import React from 'react'
import tags from '../lib/tags.json'


export default function TagBar({searchObj,removeSkill}) {
    // console.log(tags.tags);
	// var settings = {
		// dots: true,
		// infinite: false,
		// speed: 500,
		// slidesToShow: 4,
		// slidesToScroll: 4,
		// initialSlide: 0,
		// responsive: [
		//   {
		// 	breakpoint: 1024,
		// 	settings: {
		// 	  slidesToShow: 3,
		// 	  slidesToScroll: 3,
		// 	  infinite: true,
		// 	  dots: true
		// 	}
		//   },
		//   {
		// 	breakpoint: 600,
		// 	settings: {
		// 	  slidesToShow: 2,
		// 	  slidesToScroll: 2,
		// 	  initialSlide: 2
		// 	}
		//   },
		//   {
		// 	breakpoint: 480,
		// 	settings: {
		// 	  slidesToShow: 1,
		// 	  slidesToScroll: 1
		// 	}
		//   }
		// ]
	//   };
  return (
    <>
				<div className="rounded-md flex-wrap flex justify-center items-center min-w-full min-h-7">
					{/* <Slider> */}
					{Array.from(tags.tags).map((item, index) => (

						<div
							value={item}
							key={index}
							className={`badge cursor-pointer ${searchObj.tags.has(item) ? 'bg-primary text-white' : 'badge-outline'} mx-2`}
							onClick={removeSkill}>
							{item}
						</div>
					))}
					{/* </Slider> */}
				</div>
    </>
  )
}
