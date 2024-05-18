'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { SingleImageDropzone } from '../../components/SingleImageDropzone';
import { useEdgeStore } from '../../hooks/edgestore';
import tags from '../../lib/tags.json';
// import { log } from 'console';
const AddLecture = () => {
	const [password, setPassword] = useState('');
	const [file, setFile] = useState('');
	const { edgestore } = useEdgeStore();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		about_me: '',
		linkedin: '',
		tags: [],
		area: '',
		pic: '',
		email: '',
		phone:'',
	});

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handlePasswordSubmit = (e) => {
		e.preventDefault();

		if (password === 'noa') {
			setIsAuthenticated(true);
		} else {
			toast.error('אופס.. נראה שהסיסמא לא נכונה :(');
		}
	};

	const handleFormChange = (e) => {
		console.log(formData);
		const { name, value } = e.target;

		if (name === 'tags') {
			// Split the input value by comma, trim spaces, and convert to an array
			const tags = value.split(',').map((tag) => tag.trim());

			setFormData({ ...formData, [name]: tags });
			console.log(tags);
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (formData.pic === '') {
			await saveImg(); // Handle form submission logic here
		}
		const isFormValid = Object.values(formData).every((value) => {
			if (Array.isArray(value)) {
				// For arrays (like tags), check if the array is not empty
				return value.length > 0;
			} else {
				// For other values, check if the trimmed value is not an empty string
				return value.trim() !== '';
			}
		});
		if (isFormValid) {
			console.log(formData);

			try {
				const response = await fetch('/api/lectures', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});

				if (response.ok) {
					console.log('ok');
					setIsLoading(false);
					toast.success('מרצה נוסף בהצלחה');
				} else {
					toast.warning('אופס משהו השתבש');
				}
			} catch (error) {
				toast.warning('Error adding lecture:', error);
			}
		} else {
			console.log(formData);
			// toast.warning('מומלץ למלא את כל הטופס לפני השליחה');
		}
	};
	// toast.success('הפעולה עברה בהצלחה!')
	//TODO: add validation
	const handleTag = (s) => {
		const tagValue = s.currentTarget.getAttribute('value');
		console.log(tagValue);
		let tmp = { ...formData }; // Assuming formData is an object
		if (tmp.tags.includes(tagValue)) {
			// console.log('already');
			tmp.tags = tmp.tags.filter(tag => tag !== tagValue);
		} else {
			tmp.tags.push(tagValue);
		}
		// Assuming you want to update formData
		setFormData(tmp); // Update formData with the modified value
	};
	

	const saveImg = async () => {
		if (file) {
			const res = await edgestore.publicFiles.upload({
				file,
				onProgressChange: (progress) => {
					console.log(progress);
				},
			});
			let tmp = formData;
			tmp.pic = res.url;
			setFormData(tmp);
		}
	};

	return (
		<div className="flex justify-center items-center my-6 min-h-[70vh]">
			{!isAuthenticated ? (
				<div className="card w-96 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title text-center">אם הגעת עד לכאן אז סימן שנועה שלחה אותך😉</h2>
						<form onSubmit={handlePasswordSubmit}>
							<div className="form-control">
								<input
									type="password"
									placeholder="קוד - אם אתה לא יודע תשאל את נועה :)"
									className="input input-bordered"
									value={password}
									onChange={handlePasswordChange}
								/>
							</div>
							<div className="card-actions justify-center mt-4">
								<button type="submit" className="btn btn-primary justify-center">
									שליחה
								</button>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className="card w-96 bg-base-100 shadow-xl mt-4">
					<div className="card-body">
						<h2 className="card-title justify-center">הוספת מרצה</h2>
						{isLoading ? (
				<div className="flex justify-center center  min-h-[70vh]">
					<span className="loading loading-spinner loading-lg"></span>
				</div>):(

					<form onSubmit={handleFormSubmit}>
							<div className="form-control justify-center items-center">
								<SingleImageDropzone
									width={200}
									height={200}
									value={file}
									onChange={(file) => {
										setFile(file);
									}}
									/>
							</div>
							<div className="form-control mt-4">
							
								<input
									type="text"
									placeholder="שם מלא"
									className="input input-bordered"
									name="name"
									value={formData.name}
									onChange={handleFormChange}
									/>
							</div>
							<div className="form-control mt-4">
							
								<input
									type="email"
									placeholder="מייל ליצירת קשר"
									className="input input-bordered"
									name="email"
									value={formData.email}
									onChange={handleFormChange}
									/>
							</div>
							<div className="form-control mt-4">
							
								<input
									type="phone"
									placeholder="מספר ליצירת קשר"
									className="input input-bordered"
									name="phone"
									value={formData.phone}
									onChange={handleFormChange}
									/>
							</div>
							<div className="form-control mt-4">
						
								<textarea
									className="textarea textarea-bordered"
									placeholder="קצת עלי"
									name="about_me"
									value={formData.description}
									onChange={handleFormChange}
									/>
							</div>
							<div className="form-control mt-4">
						
								<input
									className="input input-bordered"
									placeholder="קישור ללינקדאין"
									name="linkedin"
									value={formData.description}
									onChange={handleFormChange}
									/>
							</div>
							<div className="form-control mt-4">
				
								<input
									className="textarea textarea-bordered"
									placeholder="אזור בארץ"
									name="area"
									value={formData.description}
									onChange={handleFormChange}
									/>
							</div>
							<div className="form-control mt-4">
							<label className="label">
									<span className="label-text font-bold">תגיות</span>
								</label>
							</div>
							<div className="form-control flex-wrap flex-row justify-center items-center">
								{Array.from(tags.tags).map((item, index) => (
									<div
									value={item}
									key={index}
									className={`badge cursor-pointer ${
										formData.tags.includes(item)
										? 'bg-primary text-white'
										: 'badge-outline'
									} mx-1 my-1`}
									onClick={handleTag}
									>
										{item}
									</div>
								))}
							</div>
							<div className="card-actions justify-center mt-3">
								<button type="submit" className="btn btn-primary">
									ש-גר
								</button>
							</div>
						</form>
						)}
					</div>
					</div>
				)}
		</div>
	);
};

export default AddLecture;
