'use client';
import React, { useState } from 'react';
import { SingleImageDropzone } from '../../components/SingleImageDropzone';
import { useEdgeStore } from '../../hooks/edgestore';
const AddLecture = () => {
	const [password, setPassword] = useState('');
	const [file, setFile] = useState('');
	const { edgestore } = useEdgeStore();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [url, setUrl] = useState('')
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		tags: '',
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
			alert('Incorrect password');
		}
	};

	const handleFormChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log(formData);
	};

	return (
		<div className="flex justify-center items-center h-screen">
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
				<div className="card w-96 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Add Lecture</h2>
						<form onSubmit={handleFormSubmit}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Name</span>
								</label>
								<input
									type="text"
									placeholder="Enter name"
									className="input input-bordered"
									name="name"
									value={formData.name}
									onChange={handleFormChange}
								/>
							</div>
              <div className="form-control justify-center items-center">

              <SingleImageDropzone
									width={200}
									height={200}
									value={file}
									onChange={(file) => {
                    setFile(file);
									}}
                  />
								<button
									onClick={async () => {
                    if (file) {
                      const res = await edgestore.publicFiles.upload({
                        file,
												onProgressChange: (progress) => {
                          // you can use this to show a progress bar
													console.log(progress);
												},
											});
											// you can run some server action or api here
											// to add the necessary data to your database
											console.log(res.url);
                      setUrl(res.url)
                      console.log(url)
										}
									}}>
									Upload
								</button>
                    </div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Description</span>
								</label>
								<textarea
									className="textarea textarea-bordered"
									placeholder="Enter description"
									name="description"
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
									placeholder="Enter tags separated by commas"
									className="input input-bordered"
									name="tags"
									value={formData.tags}
									onChange={handleFormChange}
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
			)}
		</div>
	);
};

export default AddLecture;
