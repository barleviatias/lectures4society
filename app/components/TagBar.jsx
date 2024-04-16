import React from 'react'
import tags from '../lib/tags.json'
export default function TagBar({searchObj,removeSkill}) {
    console.log(tags.tags);
  return (
    <>
				<div className="rounded-md flex justify-center items-center min-w-full min-h-7">
					{Array.from(tags.tags).map((item, index) => (
						<div
							value={item}
							key={index}
							className={`badge cursor-pointer ${searchObj.tags.has(item) ? 'bg-primary text-white' : 'badge-outline'} mx-2`}
							onClick={removeSkill}>
							{item}
						</div>
					))}
				</div>
    </>
  )
}
