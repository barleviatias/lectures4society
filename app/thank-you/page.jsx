import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">תודה רבה!</h2>
          <p className="text-center">הרישום בוצע בהצלחה.</p>
          <div className="card-actions justify-center mt-4">
            <Link href="/" className="btn btn-primary">
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;