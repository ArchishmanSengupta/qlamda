// "use client"
interface CardProps {
    question: string;
    answers: string[];
    noOfQuestions: number;
    index: number;
    correct_answer_indices: number[];
    checked: boolean;
}
export default function Card ({ question, answers,noOfQuestions,index,correct_answer_indices , checked}: CardProps) {

    return (
        
        <div className="mb-6 bg-white shadow-lg rounded p-6 relative flex flex-col space-y-4">   
            <div className="absolute top-0 left-0 bg-gray-50 p-1 rounded text-sm text-gray-600 m-1">
                {index+1}/{noOfQuestions}
            </div>
            <h5 className="font-semibold text-lg mb-4 ">{question}</h5>
            <div className="text-black">
                <ul className="list-inside space-y-2">
                {answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className={`grid grid-cols-12 items-center gap-4 ${correct_answer_indices[0] === answerIndex && checked ? 'text-green-600 font-bold' : ''}`}>
                            <div className="col-span-1 flex justify-center items-center">
                                <span className="font-semibold">{String.fromCharCode(65 + answerIndex)}</span>
                            </div>
                            <div className="col-span-11 items-center">{answer}</div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

