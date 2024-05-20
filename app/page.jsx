'use client';
import Card from './components/Card';
import React, { useState, useEffect } from 'react';
import { useSearch } from './hooks/SearchContext';
import { useLecture } from './hooks/LectureContext';
import * as animationData from './assets/img/no-found.json';
import Lottie from 'react-lottie';
import TagBar from './components/TagBar';
import Modal from './components/Modal';
import useFetchLectures from './hooks/useFetchLectures';


export default function Home() {
	const lectureContext = useLecture();
	const {isLoading,error}=useFetchLectures();
	// const [isLoading, setIsLoading] = useState(true);
	const { searchObj, setSearchObj } = useSearch();
	const [selectedCardData, setSelectedCardData] = useState();
	// console.log(selectedCardData);
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	const search = () => {
		let lecturesCache = JSON.parse(localStorage.getItem('lectures')) || [];
		let filteredJson = lecturesCache.filter((person) => {
			return (
				person.name
					.toLowerCase()
					.includes(searchObj.name.toLocaleLowerCase()) &&
				Array.from(searchObj.tags).every((tag) => person.tags.includes(tag))
			);
		});
		lectureContext.setLectures(filteredJson);
	};

	const addSkill = (s) => {
		let tmp = searchObj;
		if (tmp.tags.has(s)) {
			console.log('already');
			tmp.tags.delete(s);
		} else {
			tmp.tags.add(s);
		}
		setSearchObj(tmp);
		search(); // Search with the updated skills array
	};

	const removeSkill = (s) => {
		const skillValue = s.currentTarget.getAttribute('value');
		console.log(skillValue);
		let tmp = searchObj;
		tmp.tags.delete(skillValue);
		setSearchObj(tmp); // Search with the updated skills array
		search();
	};

	return (
		<main className="flex  bg-ghost min-h-screen flex-col items-center p-6 drop-shadow-lg ">
			{setSelectedCardData&&<Modal data={selectedCardData}></Modal>}
			{isLoading ? (
				<div className="flex justify-center center">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			) : lectureContext.lectures.length === 0 ? (
				<div className="">
					<div className="flex justify-center center">
						<Lottie options={defaultOptions} height={400} width={400} />
					</div>
					<h1 className="text-center text-xl font-black sm:text-4xl">
						מצטערים לא מצאנו את המרצה המתאים בשבילך 🙄
					</h1>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2  auto-cols-min mt-3 lg:grid-cols-3">
					{lectureContext.lectures.map((item, index) => (
						<Card
							key={index}
							addSkill={addSkill}
							data={item}
							tags={searchObj.tags}
							setCard={setSelectedCardData}
						/>
					))}
				</div>
			)}
		</main>
	);
}
