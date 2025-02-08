// pages/api/proxy.js
import { NextResponse } from 'next/server';

export async function POST(request) {
	try {
		const body = await request.json();

		if (!body.recaptchaToken) {
			console.error('No reCAPTCHA token provided');
			return NextResponse.json(
				{ error: 'No reCAPTCHA token provided' },
				{ status: 400 }
			);
		}

		// Verify reCAPTCHA token first
		try {
			const recaptchaResponse = await fetch(
				'https://www.google.com/recaptcha/api/siteverify',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.recaptchaToken}`,
				}
			);

			const recaptchaData = await recaptchaResponse.json();
			console.log('reCAPTCHA response:', recaptchaData);

			if (!recaptchaData.success) {
				console.error(
					'reCAPTCHA verification failed:',
					recaptchaData['error-codes']
				);
				return NextResponse.json(
					{
						error: 'reCAPTCHA verification failed',
						details: recaptchaData['error-codes'],
					},
					{ status: 400 }
				);
			}

			if (recaptchaData.score < 0.5) {
				console.error('reCAPTCHA score too low:', recaptchaData.score);
				return NextResponse.json(
					{ error: 'reCAPTCHA score too low' },
					{ status: 400 }
				);
			}
		} catch (recaptchaError) {
			console.error('reCAPTCHA verification error:', recaptchaError);
			return NextResponse.json(
				{ error: 'reCAPTCHA verification error' },
				{ status: 500 }
			);
		}

		// Remove recaptcha token before forwarding
		const { recaptchaToken, ...formData } = body;

		// Forward the request to the webhook
		try {
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

			if (!response.ok) {
				console.error(
					'Webhook response not OK:',
					response.status,
					response.statusText
				);
				throw new Error(
					`Webhook request failed: ${response.status} ${response.statusText}`
				);
			}

			return NextResponse.json({ success: true });
		} catch (webhookError) {
			console.error('Webhook request error:', webhookError);
			return NextResponse.json(
				{ error: 'Webhook request failed' },
				{ status: 502 }
			);
		}
	} catch (error) {
		console.error('General proxy error:', error);
		return NextResponse.json(
			{ error: 'Error processing request', message: error.message },
			{ status: 500 }
		);
	}
}
