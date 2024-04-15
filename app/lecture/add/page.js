'use client';
import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { SingleImageDropzone } from '../../components/SingleImageDropzone';
import { useEdgeStore } from '../../hooks/edgestore';
const AddLecture = () => {
	const [password, setPassword] = useState('');
	const [file, setFile] = useState('');
	const { edgestore } = useEdgeStore();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		about_me: '',
		linkedin: '',
		tags: [],
		area: '',
		pic: '',
		email:''
	});

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		// Replace 'yourPassword' with the actual password
		if (password === 'noa') {
			setIsAuthenticated(true);
		} else {
			// alert('Incorrect password');
			toast.error('אופס.. נראה שהסיסמא לא נכונה :(');
		}
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
	  
		if (name === "tags") {
		  // Split the input value by comma, trim spaces, and convert to an array
		  const tags = value.split(",").map((tag) => tag.trim());
	  
		  setFormData({ ...formData, [name]: tags });
		  console.log(tags);
		} else {
		  setFormData({ ...formData, [name]: value });
		}
	  };

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (formData.pic===''){
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
					toast.success('Lecture added successfully');
				} else {
					toast.warning('Error adding lecture');
				}
			} catch (error) {
				toast.warning('Error adding lecture:', error);
			}
		}
		else{
			console.log(formData);
			toast.warning('מומלץ למלא את כל הטופס לפני השליחה')
		}
		// Send the formData object to the server or perform other actions
		//   console.log('Please fill in all fields');
		// Display an error message or handle the case when some fields are empty
	};
	// toast.success('הפעולה עברה בהצלחה!')

	const saveImg = async () => {
		if (file) {
			const res = await edgestore.publicFiles.upload({
				file,
				onProgressChange: (progress) => {
					// you can use this to show a progress bar
					console.log(progress);
				},
			});
			let tmp = formData;
			tmp.pic = res.url;
			setFormData(tmp);
		}
	};

	return (
		<div className="flex justify-center items-center my-6">
			<Toaster
				dir="rtl"
				visibleToasts={1}
				className="test-center"
				richColors
				position="bottom-center"
			/>
			{!isAuthenticated ? (
				<div className="card w-96 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Enter Password</h2>
						<form onSubmit={handlePasswordSubmit}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder="הכנס סיסמא"
									className="input input-bordered"
									value={password}
									onChange={handlePasswordChange}
								/>
							</div>
							<div className="card-actions justify-end">
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className="card w-96 bg-base-100 shadow-xl mt-4">
					<div className="card-body">
						<h2 className="card-title justify-center">הוספת מרצה</h2>
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
							<div className="form-control">
								<label className="label">
									<span className="label-text">Name</span>
								</label>
								<input
									type="text"
									placeholder="שם מלא"
									className="input input-bordered"
									name="name"
									value={formData.name}
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Name</span>
								</label>
								<input
									type="text"
									placeholder="מייל ליצירת קשר"
									className="input input-bordered"
									name="email"
									value={formData.name}
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Description</span>
								</label>
								<textarea
									className="textarea textarea-bordered"
									placeholder="קצת עלי"
									name="about_me"
									value={formData.description}
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Description</span>
								</label>
								<textarea
									className="textarea textarea-bordered"
									placeholder="קישור ללינקדאין"
									name="linkedin"
									value={formData.description}
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Description</span>
								</label>
								<textarea
									className="textarea textarea-bordered"
									placeholder="אזור בארץ"
									name="area"
									value={formData.description}
									onChange={handleFormChange}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Tags</span>
								</label>
								<input
									type="text"
									placeholder="תחומי עיסוק מופרדים בפסיק,"
									className="input input-bordered"
									name="tags"
									value={formData.tags}
									onChange={handleFormChange}
								/>
							</div>
							<div className="card-actions justify-center mt-3">
								<button type="submit" className="btn btn-primary">
									ש-גר
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddLecture;
