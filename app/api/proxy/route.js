// pages/api/proxy.js
import { NextResponse } from 'next/server';

export async function POST(request) {
	try {
		const body = await request.json();

		// Verify reCAPTCHA token first
		const recaptchaResponse = await fetch(
			'https://www.google.com/recaptcha/api/siteverify',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${body.recaptchaToken}`,
			}
		);

		const recaptchaData = await recaptchaResponse.json();

		// Check if reCAPTCHA verification passed
		if (!recaptchaData.success || recaptchaData.score < 0.5) {
			return NextResponse.json(
				{ error: 'reCAPTCHA verification failed' },
				{ status: 400 }
			);
		}

		// Forward the request to the webhook
		const response = await fetch(
			'https://hook.eu1.make.com/lm4shyky6f1oicslb745cccoleqe8v9l',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
		);

		if (!response.ok) {
			throw new Error('Webhook request failed');
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Proxy error:', error);
		return NextResponse.json(
			{ error: 'Error processing request' },
			{ status: 500 }
		);
	}
}
