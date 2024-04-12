"use client"
import { questionDataStore } from '@/store/dataStore';
import Card from '../(site)/components/Card';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from 'next/navigation'
const page = () => {
    const [ currentIndex,setCurrentIndex ] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [toggleCheckContinue, setToggleCheckContinue] = useState<boolean>(false)
    const [percentage, setPercentage] = useState<number>(0);
    const router = useRouter();
    let corretIndex=0;
    const questionStore = questionDataStore();
    const data = questionStore.questionData;
    // console.log("quesiton data",questionData);


    const handleCheck= async()=>{
        const correctIndex = data[currentIndex]?.correct_answer_indices[0];
        corretIndex=data[currentIndex]?.correct_answer_indices[0];
        setIsCorrect(selectedOption === correctIndex);

        setToggleCheckContinue(!toggleCheckContinue);

    }

    const handleSelect = async (answerIndex: number) => {
        setSelectedOption(answerIndex);
    }
    const handleContinue=()=>{
        let newPrcnt = ( 100 / data.length) *( currentIndex+1);
        setPercentage(newPrcnt);
        setToggleCheckContinue(!toggleCheckContinue);
        setCurrentIndex(currentIndex => currentIndex+1);
        setSelectedOption(null);
        setIsCorrect(null);
    }
    const handleQuit=()=>{
        router.push('/');
    }
    useEffect(() => {
        let newPrcnt = (100 / data.length) * (currentIndex + 1);
        setPercentage(newPrcnt);
    }, [currentIndex, data.length]);

    return (
        <div className='quiz_area h-full justify-between flex-col'>
            
            <div className='header w-1/2'>
                <div  className='bar' >
                    <ProgressBar height='12px' completed={percentage}bgColor='#0ced2a' baseBgColor='#e5f0ff' isLabelVisible={false} />
                </div>
                 <span className='spanHeader'>

                    {currentIndex+1}
                    /
                    {data.length}
                 </span>
            </div>
            <div className='q_main_section'>
                <div className='flex-row'>
                    <div className='question_head mb-10'>
                        <h1>{data[currentIndex]?.question}</h1>
                    </div>
                    {
                        data[currentIndex]?.answers.map((answer, answerIndex) => (
                            <div key={answerIndex} onClick={() => handleSelect(answerIndex)} className={`option w-full ${selectedOption === answerIndex ? 'selected' : ''}`}>
                                <div className="optionChar">
                                    {String.fromCharCode(65 + answerIndex)}
                                </div>
                                <h1>{answer}</h1>
                            </div>
                        ))
                    }
                </div>
                
            </div>

            <div className={`footer mt-56 ${isCorrect === true ? 'bg-green-200' : isCorrect === false ? 'bg-red-300' : ''}`}>
                <Button className='w-64 mt-10 h-12 text-xl'>Option</Button>
                {isCorrect === false ?<div className='mt-10 flex text-xl'>
                    {`Option ${String.fromCharCode(65 + data[currentIndex]?.correct_answer_indices[0])}. ${data[currentIndex]?.answers[corretIndex]}`}
                    
                </div>
                :<></> }
                 {toggleCheckContinue == false ?
                    <Button className='w-64 h-12 mt-10 text-xl' onClick={handleCheck}>Check</Button>
                    :
                    currentIndex < data.length - 1 ?
                        <Button className='w-64 mt-10 h-12 text-xl' onClick={handleContinue}>Continue</Button>
                        :
                        <Button className='w-64 mt-10 h-12 text-xl' onClick={handleQuit}>Quit</Button>
                }
            </div>
        </div>
    )
}

export default page