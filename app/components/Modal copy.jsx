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
					<h1 className="font-black text-3xl">אם לא תשלח איך תקבע?</h1>
					<p className="py-4 text-center">
						אנא מלאו את הפרטים הבאים על מנת שהמרצה יקבל את כל המידע הדרוש ויוכל להחזיר תשובה בהתאם
					</p>
					<div className="modal-action flex flex-col justify-center items-center">
						<form className='flex-row gap-4 justify-center items-center' method="dialog">
							<label className="input input-bordered flex items-center gap-2 mt-2">
								<input type="text" className="grow" placeholder="שם מלא" />
							</label>
							<label className="input input-bordered flex items-center gap-2 mt-2">
								<input
									type="text"
									className="grow"
									placeholder="אימייל"
								/>
							</label>
							<label className="input input-bordered flex items-center gap-2 mt-2">
								<input type="number" className="grow" placeholder="מס משתתפים" />
							</label>
							<label className="input input-bordered flex items-center gap-2 mt-2">
								<input type="text" className="grow" placeholder="מיקום" />
								<span className="badge badge-info">מומלץ</span>
							</label>
							<label className="input input-bordered flex items-center gap-2 mt-2">
								<input type="date" className="grow" placeholder="Search" />
								{/* <span className="badge badge-info">Optional</span> */}
							</label>
							{/* if there is a button in form, it will close the modal */}
							<button className="btn mt-2 justify-center">שלח בקשה</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
}
