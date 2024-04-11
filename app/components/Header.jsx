'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSearch } from '../hooks/SearchContext';
import { useLecture } from '../hooks/LectureContext';
import TagBar from './TagBar';
export default function Header() {
	const { searchObj, setSearchObj } = useSearch();
	const lectureContext = useLecture();
	const [isdark, setIsdark] = useState(false);
	useEffect(() => {
		const storedIsDark = localStorage.getItem('isdark');
		const initialIsDark = storedIsDark ? JSON.parse(storedIsDark) : false;
		setIsdark(initialIsDark);
	}, []); // Run only once on component mount

	useEffect(() => {
		localStorage.setItem('isdark', JSON.stringify(isdark));
	}, [isdark]);
	const search = () => {
		console.log('search');
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
	const handleSearch = (e) => {
		const searchValue = e.target.value;
		let tmp = searchObj;
		tmp.name = searchValue;
		setSearchObj(tmp);
		search();
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
		<div className='navbar bg-base-100 flex flex-col rounded-md flex justify-between items-center shadow-md'>
			<div className="navbar flex justify-between items-center" >
				<div >
					<a href="/" className="btn btn-ghost text-xl font-bold">
						<span className="text-primary">#</span>מרצים_מתנדבים
					</a>
				</div>
				<div className="form-control">
					<input
						type="text"
						placeholder="חפש מרצה"
						className="input text-center input-bordered w-24 md:w-auto"
						onChange={handleSearch}
					/>
				</div>
				<label className="cursor-pointer grid place-items-center">
					<input
						type="checkbox"
						value="dark"
						checked={isdark}
						onChange={() => setIsdark(!isdark)}
						className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
					/>
					<svg
						className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<circle cx="12" cy="12" r="5" />
						<path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
					</svg>
					<svg
						className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
					</svg>
				</label>
			</div>
			<TagBar searchObj={searchObj} removeSkill={removeSkill}></TagBar>
		</div>
	);
}
