import { Open_Sans } from 'next/font/google';
import Footer from './components/Footer';
import Header from './components/Header';
import { Toaster, toast } from 'sonner';
import { SearchProvider } from '../hooks/SearchContext';
import { LectureProvider } from '../hooks/LectureContext';
import { EdgeStoreProvider } from '../hooks/edgestore';
import './globals.css';
const open_sans = Open_Sans({ subsets: ['hebrew'] });

export const metadata = {
	title: 'פרויקט מרצים מתנדבים של נועה זילברמן',
	description: `
  מחפשים מרצה מומחה להעשרת הידע שלכם או של קהל היעד שלכם? פרויקט המרצים המתנדבים של נועה זילברמן הוא המקום בשבילכם! באתר הפרויקט תוכלו למצוא מגוון רחב של מרצים מהטופ של התעשייה, המתנדבים לחלוק את הידע והניסיון שלהם במגוון תחומים.
  
  פשוט עיינו בקטלוג המרצים, בחרו את המרצה המתאים לכם ביותר, ושלחו לו בקשה לקביעת הרצאה. כל ההרצאות ניתנות בהתנדבות, ללא עלות.
  `,
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/../images/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/../images/favicon-16x16.png',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/../images/apple-touch-icon.png',
		},
	],
	openGraph: {
		images: [
			{
				url: '/../images/logo.png',
				width: 1200,
				height: 630,
				alt: 'פרויקט מרצים מתנדבים',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		images: [
			{
				url: '/../images/logo.png',
				width: 1200,
				height: 630,
				alt: 'פרויקט מרצים מתנדבים',
			},
		],
	},
};

export default function RootLayout({ children }) {
	return (
		<html data-theme="light" lang="he">
			<body dir="rtl" className={open_sans.className}>
				<link rel="shortcut icon" href="/images/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/images/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/images/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/images/favicon-16x16.png"
				/>
				<LectureProvider>
					<SearchProvider>
						<Header />
						<Toaster
							dir="rtl"
							visibleToasts={1}
							toastOptions={{ duration: 2000 }}
							className="test-center"
							richColors
							position="bottom-center"
						/>
						<EdgeStoreProvider>{children}</EdgeStoreProvider>
						{/* {children} */}
						<Footer />
					</SearchProvider>
				</LectureProvider>
			</body>
		</html>
	);
}
