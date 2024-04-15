import React from 'react'

export default function TagBar({searchObj,removeSkill}) {
    
  return (
    <>
        {searchObj.tags.size !== 0 ? (
				<div className="rounded-md flex justify-center items-center min-w-full min-h-7">
					{Array.from(searchObj.tags).map((item, index) => (
						<div
							value={item}
							key={index}
							className="badge cursor-pointer badge-outline mr-3 bg-primary text-white"
							onClick={removeSkill}>
							{item}
						</div>
					))}
				</div>
			) : (
				''
			)}
    </>
  )
}
