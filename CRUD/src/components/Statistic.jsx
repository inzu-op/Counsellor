import { useParams, Link } from "react-router-dom";

export default function Statistic() {
  
    const { id, name } = useParams();

   
    const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

    if (!id || !name) {
        return (
            <div className="w-screen h-screen flex justify-center items-center bg-gray-600">
                <div className="p-8 bg-white rounded-2xl shadow-xl w-[500px] h-[500px] flex flex-col justify-center items-center text-red-600">
                    <h2 className="text-4xl font-bold text-center mb-[50px]">Error</h2>
                    <p className="text-lg">Invalid URL parameters.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-600 p-4 md:p-8">
            <div className="p-8 bg-white rounded-2xl shadow-xl w-[500px] h-[400px] md:h-[500px] flex flex-col justify-center items-center text-green-600">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-[50px]">Semesters</h2>
                <div className="grid grid-cols-2 gap-4 w-full px-4">
                    {semesters.map((semester) => (
                        <Link
                            key={semester}
                            to={`/statistic/sem/${semester}/${id}/${name}`} 
                            className="p-4 text-[11px] md:text-[17px] bg-green-500 text-white rounded-lg shadow-md text-center font-semibold transition transform hover:scale-110"
                        >
                            Semester {semester}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}