import React from 'react';
import Modal from './Modal';
import Image from 'next/image';
import ProfileModal from './ProfileModal';
import { useState } from 'react';

export default function Card(props) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCardData, setSelectedCardData] = useState(null); // Add state for selected profile data

	const toggleExpand = () => {
		console.log('toggleExpand');
		setIsExpanded(!isExpanded);
		console.log(isExpanded);
	};

	const addSkill = (skill) => {
		const skillValue = skill.currentTarget.getAttribute('value');

		props.addSkill(skillValue);
	};
	const openModal = () => {
		setSelectedCardData(props.data); // Set the selected profile data
		setIsModalOpen(true); // Open the modal
	};

	const shouldShowButton = props.data.about_me.length > 200; // Adjust the length as needed

	return (
		<div className="card flex-start flex-basis: auto card-normal w-80 bg-base-100 shadow-xl my-8 hover:scale-105">
			<figure>
				<div className="avatar mt-4">
					<div className="w-24 rounded-full">
						<Image src={props.data.pic} width={200} height={200} alt="avatar" />
					</div>
				</div>
			</figure>
			<div className="card-body flex flex-col items-center justify-between gap-6">
				<div>
					<div className="flex justify-center items-center">
						<h2 className="card-title mr-2 ">{props.data.name}</h2>
						<a href={props.data.linkedin} className="pb-3">
							<svg
								className="fill-blue-500 text-xs mr-1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								width="24px"
								height="24px">
								<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
							</svg>
						</a>
					</div>
					<h3 className="text-center text-sm text-gray-600 mb-2">
						{props.data.title}
					</h3>
					<div>
						<p
							className={`cursor-pointer ${
								isExpanded ? 'line-clamp-none' : 'line-clamp-6'
							}`}>
							{props.data.about_me}
						</p>
						{shouldShowButton && (
							<button
								className="btn btn-xs btn-ghost mt-2"
								onClick={toggleExpand}>
								{isExpanded ? 'הסתר' : 'קרא עוד'}
							</button>
						)}
					</div>
				</div>
				<div>
					<div className="card-actions">
						{props.data.tags.map((item, index) => (
							<div
								value={item}
								key={index}
								className={`badge ${
									props.tags.has(item)
										? 'bg-primary text-white'
										: 'badge-outline'
								}`}
								// onClick={addSkill}
							>
								{item}
							</div>
						))}
					</div>

					<button
						className="btn btn-primary btn-outline btn-wide btn-sm mt-6"
						onClick={() => {
							document.getElementById('my_modal_2').showModal();
							props.setCard(props.data);
						}}>
						בואו נקבע!{' '}
					</button>
				</div>
			</div>
		</div>
	);
}
