import React from 'react';

export default function Modal(props) {

	return (
		<div>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<button
				className="btn btn-primary"
				onClick={() => document.getElementById('my_modal_1').showModal()}>
				בוא נקבע!
			</button>
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box flex flex-col justify-center items-center">
					<h3 className="font-bold text-lg">Hello!</h3>
					<p className="py-4">
						Press ESC key or click the button below to close
					</p>
					<div className="modal-action flex flex-col justify-center items-center">
						<form className='flex-row gap-4 justify-center items-center' method="dialog">
							<label className="input input-bordered flex items-center gap-2">
								<input type="text" className="grow" placeholder="Daisy" />
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<input
									type="text"
									className="grow"
									placeholder="daisy@site.com"
								/>
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<input type="number" className="grow" placeholder="מס משתתפים" />
							</label>
							<label className="input input-bordered flex items-center gap-2">
								<input type="date" className="grow" placeholder="Search" />
								<span className="badge badge-info">Optional</span>
							</label>
							{/* if there is a button in form, it will close the modal */}
							<button className="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
}
