import React from 'react';
import tags from '../../lib/tags.json';

export default function TagBar({ searchObj, removeSkill }) {
	return (
		<div className="rounded-md flex justify-center items-center w-full">
			{/* <Slider> */}
			<div className="flex items-center justify-center horizontal-scroll-list w-full whitespace-nowrap overflow-y-hidden">
				{Array.from(tags.tags).map((item, index) => (
					<div
						value={item}
						key={index}
						className={`badge cursor-pointer ${
							searchObj.tags.has(item)
								? 'bg-primary text-white'
								: 'badge-outline'
						} mx-2`}
						onClick={removeSkill}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
}
