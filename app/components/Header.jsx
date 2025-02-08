'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSearch } from '../../hooks/SearchContext';
import { useLecture } from '../../hooks/LectureContext';
import TagBar from './TagBar';
export default function Header() {
	const { searchObj, setSearchObj } = useSearch();
	const lectureContext = useLecture();
	const [isdark, setIsdark] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const storedIsDark = localStorage.getItem('isdark');
		const initialIsDark = storedIsDark ? JSON.parse(storedIsDark) : false;
		setIsdark(initialIsDark);
	}, []);

	useEffect(() => {
		localStorage.setItem('isdark', JSON.stringify(isdark));
	}, [isdark]);
	const search = () => {
		router.push('/');

		let lecturesCache = JSON.parse(localStorage.getItem('lectures')) || [];
		let filteredJson = lecturesCache.filter((person) => {
			const nameMatch = person.name
				.toLowerCase()
				.includes(searchObj.name.toLocaleLowerCase());
			const tagsMatch =
				searchObj.tags.size === 0 ||
				person.tags.some((tag) => searchObj.tags.has(tag));

			return nameMatch && tagsMatch;
		});

		lectureContext.setLectures(filteredJson);
	};
	const handleSearch = (e) => {
		const searchValue = e.target.value;
		let tmp = searchObj;
		tmp.name = searchValue;

		setSearchObj(tmp);
		search();

		// router.push('/'); // Navigate to the home page
	};

	const handleTag = (s) => {
		const tagValue = s.currentTarget.getAttribute('value');
		let tmp = searchObj;
		if (tmp.tags.has(tagValue)) {
			tmp.tags.delete(tagValue);
		} else {
			tmp.tags.add(tagValue);
		}
		setSearchObj(tmp);
		search();
	};

	return (
		<div className="navbar bg-base-100 flex flex-col rounded-md justify-between items-center shadow-md">
			<div className="navbar flex justify-between items-center">
				<div>
					<a href="/" className="btn btn-ghost md:text-xl font-bold">
						<span className="text-primary">#</span>מרצים_מתנדבים
					</a>
				</div>
				<div className="form-control w-fit mx-2">
					<input
						type="text"
						placeholder="חפש מרצה"
						className="input text-center w-full input-bordered md:w-96"
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
			<TagBar searchObj={searchObj} removeSkill={handleTag}></TagBar>
		</div>
	);
}
