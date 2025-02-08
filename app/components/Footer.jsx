import React from 'react';
import Image from 'next/image';
import barImg from '../../assets/img/bar.jpg';
export default function Footer() {
	return (
		<div>
			<footer className="footer p-10 bg-neutral text-neutral-content">
				<aside>
					<svg
						width="50"
						height="50"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						fillRule="evenodd"
						clipRule="evenodd"
						className="fill-current">
						<path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
					</svg>
					<p>
						פרויקט המרצים המתנדבים
						<br />
						של נועה זילברמן{' '}
					</p>
				</aside>
				<nav>
					<h6 className="footer-title">נוצר באהבה ע״י</h6>
					<div className="grid grid-flow-row gap-4">
						<div className="flex gap-2 items-center justify-center">
							<div className="avatar">
								<div className=" w-7 rounded-full">
									<Image src={barImg} alt="avatar" />
								</div>
							</div>
							<h1>בר לוי אטיאס</h1>
							<p className="font-black">פיתוח פרונט ובקאנד </p>
							<button className="">
								<svg
									className="fill-blue-500 text-xs	"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									width="24px"
									height="24px">
									<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
								</svg>
							</button>
						</div>
						<div>
							<h1>דביר </h1>
							<p>אוטומציה</p>
						</div>
					</div>
				</nav>
			</footer>
		</div>
	);
}
