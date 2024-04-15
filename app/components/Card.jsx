import React from 'react';
import Modal from './Modal';
import Image from 'next/image';
export default function Card(props) {
    const addSkill = (skill) => {
        const skillValue = skill.currentTarget.getAttribute('value');
        console.log(skillValue);
        props.addSkill(skillValue);
    };
	return (
		<div className="card card-normal w-80 bg-base-100 shadow-xl my-8">
			<figure>
				{/* <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /> */}
				<div className="avatar mt-4">
					<div className="w-24 rounded-full">
						{/* <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
						<Image src={props.data.pic} width={200} height={200} />
					</div>
				</div>
			</figure>
			<div className="card-body flex items-center justify-center gap-6">
				<div className="flex justify-center items-center">
					<h2 className="card-title mr-2 ">{props.data.name}</h2>
					<a href={props.data.linkedin} className="pb-3">
						<svg
							className="fill-blue-500 text-xs	"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							width="24px"
							height="24px">
							<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
						</svg>
					</a>
				</div>
				<p className="text-center">{props.data.about_me}</p>

				<div className="card-actions">
					{props.data.tags.map((item, index) => (
						//   <Card  data={item}/>
						<div
							value={item}
							key={index}
							className={`badge cursor-pointer ${props.tags.has(item) ? 'bg-primary text-white' : 'badge-outline'}`}
							onClick={addSkill}>
							{item}
						</div>
					))}
				</div>
				{/* <button></button> */}
				{/* <button className="btn btn-primary">Book me!</button> */}
				<Modal data={props.data.name} />
			</div>
		</div>
	);
}
