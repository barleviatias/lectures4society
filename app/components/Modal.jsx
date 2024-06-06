import React, { useState, useEffect } from 'react';
import {toast } from 'sonner';

import Lecture from '../lib/models/Lecture';

export default function Modal({ data, isOpen, onClose }) {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		participants: '',
		location: '',
		date: '',
		lectureName: data?.name || '',
		lectureEmail: data?.email || '',
		lecturePhone: data?.phone || '' ,
	});

	const [formErrors, setFormErrors] = useState({
		fullName: '',
		email: '',
		participants: '',
		location: '',
		date: '',
	});
	useEffect(() => {
		setFormData((prevFormData) => ({
		  ...prevFormData,
		  lectureName: data?.name || '',
		  lectureEmail: data?.email || '',
		  lecturePhone: data?.phone || '',
		}));
	  }, [data]);

	  const clearForm = () => {
		setFormData({
		  fullName: '',
		  email: '',
		  participants: '',
		  location: '',
		  date: '',
		  lectureName: data?.name || '',
		  lectureEmail: data?.email || '',
		  lecturePhone: data?.phone || '',
		});
		setFormErrors({
		  fullName: '',
		  email: '',
		  participants: '',
		  location: '',
		  date: '',
		});
	  };
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validateForm = () => {
		let errors = {};
		let isValid = true;

		if (!formData.fullName.trim()) {
			errors.fullName = 'שם מלא לא יכול להיות ריק';
			isValid = false;
		}

		if (!formData.email.trim()) {
			errors.email = 'נא למלא אימייל';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'אימייל לא חוקי';
			isValid = false;
		}

		if (!formData.participants.trim()) {
			errors.participants = 'מספר משתמשים לא יכול להיות ריק';
			isValid = false;
		} else if (isNaN(formData.participants) || formData.participants <= 0) {
			errors.participants = 'אופס מספר משתתפים לא יכול להיות שלילי..';
			isValid = false;
		}

		if (!formData.location.trim()) {
			errors.location = 'נא למלא לוקיישן';
			isValid = false;
		}

		if (!formData.date.trim()) {
			errors.date = 'נא למלא תאריך';
			isValid = false;
		}

		setFormErrors(errors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				// Send form data using the webhook URL
				const response = await fetch(
					'https://hook.eu1.make.com/lm4shyky6f1oicslb745cccoleqe8v9l',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(formData),
					}
				);

				if (response.ok) {
					
					
					toast.success('הפרטים נשלחו בהצלחה');
					// Clear the form fields after successful submission
					setFormData({
						fullName: '',
						email: '',
						participants: '',
						location: '',
						date: '',
					});
					setFormErrors({
						fullName: '',
						email: '',
						participants: '',
						location: '',
						date: '',
					});
				} else {
					console.error('Error sending form data');
				}
			} catch (error) {
				console.error('Error sending form data', error);
			}
		}
	};
	const handleModalClose = () => {
		// onClose();
		
		clearForm();
		// toast.success('נסגר');
	  };
	
	return (
		<div>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<dialog id="my_modal_2" className={`modal ${isOpen ? 'modal-open' : ''}`}>
				{' '}
				<div className="modal-box flex flex-col justify-center items-center">
					<h1 className="font-black text-3xl text-center">אם לא תשלח איך תקבע?</h1>
					<p className="py-4 text-center">
						אנא מלאו את הפרטים הבאים על מנת שהמרצה יקבל את כל המידע הדרוש ויוכל
						להחזיר תשובה בהתאם
					</p>
					<div className="modal-action flex flex-col justify-center items-center">
						<form
							className="flex-row gap-4 min-w-[800px]: justify-center items-center"
							onSubmit={handleSubmit}>
							<label className="input input-bordered flex items-center gap-2 mt-2">
								<input
									type="text"
									name="fullName"
									value={formData.fullName}
									onChange={handleChange}
									className={`grow ${formErrors.fullName ? 'input-error' : ''}`}
									placeholder="שם מלא"
								/>
							</label>
							{formErrors.fullName && (
								<p className="text-red-500 text-sm">{formErrors.fullName}</p>
							)}
							<label className="input input-bordered flex items-center gap-2 mt-2">
								<input
									type="text"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className={`grow ${formErrors.email ? 'input-error' : ''}`}
									placeholder="אימייל"
								/>
							</label>
							{formErrors.email && (
								<p className="text-red-500 text-sm">{formErrors.email}</p>
							)}
							<label className="input input-bordered flex items-center gap-2 mt-2">
								<input
									type="number"
									name="participants"
									value={formData.participants}
									onChange={handleChange}
									className={`grow ${
										formErrors.participants ? 'input-error' : ''
									}`}
									placeholder="מס משתתפים"
								/>
							</label>
							{formErrors.participants && (
								<p className="text-red-500 text-sm">
									{formErrors.participants}
								</p>
							)}
							<label className="input input-bordered flex items-center gap-2 mt-2 min-w-[280px]">
								<input
									type="text"
									name="location"
									value={formData.location}
									onChange={handleChange}
									className={`grow ${formErrors.location ? 'input-error' : ''}`}
									placeholder="מיקום"
								/>
								{/* <span className="badge badge-info"></span> */}
							</label>
							{formErrors.location && (
								<p className="text-red-500 text-sm">{formErrors.location}</p>
							)}
							<label className="input input-bordered flex items-center gap-2 mt-2">
								<input
									type="date"
									name="date"
									value={formData.date}
									onChange={handleChange}
									className={`grow ${formErrors.date ? 'input-error' : ''}`}
									placeholder="Search"
								/>
							</label>
							{formErrors.date && (
								<p className="text-red-500 text-sm">{formErrors.date}</p>
							)}
							<button type="submit" className="btn mt-2 justify-center">
								שלח בקשה
							</button>
						</form>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
				<button onClick={handleModalClose}>close</button>
				</form>
			</dialog>
		</div>
	);
}
