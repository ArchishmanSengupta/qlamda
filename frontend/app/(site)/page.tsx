"use client"
import { Button } from "@/components/ui/button";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { useCallback, useState } from "react";
import Card from "./components/Card";
import Loader from "./components/Loader";
import { getData } from "./util/helper";
import { useRouter } from 'next/navigation'
// import Button from '@mui/material/Button';
// import axios from "axios";
import { questionDataStore } from "@/store/dataStore";
interface FormData {
  userText: string;
  aiModelQuality: string;
  difficultyLevel: string;
  generationType: string;
  mcqOptionsCount?: string;
}
interface Question {
  question: string;
  answers: string[];
  correct_answer_indices: number[];
}


export default function Home() {
    const [userText, setUserText] = useState<string>('');
    const [questionType, setQuestionType] = useState<string>('MCQ');
    const [mcqOptionsCount, setMCQOptionsCount] = useState<string>('2');
    const [questionCount, setQuestionCount] = useState<string>('1');
    const [diffLevel, setDifficultyLevel] = useState<string>('Easy');
    const [showMCQOptionsCount, setShowMCQOptionsCount] = useState<boolean>(true);
    const [colorExceed, setColorExceed] = useState<boolean>(false);
    const [wordCount, setWordCount] = useState<number>(0);
    const [checked,setChecked] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Question[]>([]);
    const router = useRouter();
    const questionStore = questionDataStore();

    const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value
        
        const words = text.trim().split(/\s+/);
        if (words.length > 200) {
          setColorExceed(true);
          const temp = words.slice(0, 200).join(' ');
          setUserText(temp);
          setWordCount(200);
        } else {
          setUserText(text);
          setWordCount(words.length);
          setColorExceed(false);
        }
    },[setUserText]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setQuestionType(value);
      if(value === "mcq"){
        setShowMCQOptionsCount(true);
      }else{
        setShowMCQOptionsCount(false);
      }
  };
  const dataa=[
    {
        "question": "Why did Tesla announce that it will not accept payments in Bitcoin?",
        "answers": [
            "Environmental concerns",
            "Decreasing value of Bitcoin",
            "Rapid increase in Dogecoin popularity",
            "Lack of transaction efficiency"
        ],
        "correct_answer_indices": [
            0
        ],
        "correct_answers": [
            "Environmental concerns"
        ]
    },
    {
        "question": "What effect did Elon Musk's tweet about Dogecoin have on its value?",
        "answers": [
            "Decreased by 20 percent",
            "Remained stable",
            "Rallied by about 20 percent",
            "Increased by 10 percent"
        ],
        "correct_answer_indices": [
            2
        ],
        "correct_answers": [
            "Rallied by about 20 percent"
        ]
    },
    {
        "question": "Why did Musk state that Tesla was suspending vehicle purchases using Bitcoin?",
        "answers": [
            "Decrease in crypto popularity",
            "Lack of transaction efficiency",
            "Fears of Bitcoin becoming the world's future currency",
            "Concern about the use of fossil fuels for mining and transactions"
        ],
        "correct_answer_indices": [
            3
        ],
        "correct_answers": [
            "Concern about the use of fossil fuels for mining and transactions"
        ]
    }
];
  const handleStudySubmit = async()=>{
    // const QuestionsData = await getData();
  
    
     questionStore.setQuestionData(dataa);
    router.push('/Study');
  }
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
  const handleSubmit = async() => {
    setLoading(true);
    const formData: FormData = {
      userText,
      aiModelQuality: 'high_quality',
      difficultyLevel: diffLevel.toLowerCase(),
      generationType: questionType.toLowerCase(),
    };

    if (questionType === 'MCQ') {
      formData['mcqOptionsCount'] = mcqOptionsCount;
    }

    const jsonFormData = JSON.stringify(formData);
    let QuestionsData: Question[] = [];
    try {
      // const QuestionsData = await getData();
      
      
      if (questionType === 'MCQ') {
        
        QuestionsData = dataa.map(question => {
            const { correct_answer_indices, ...rest } = question;
            const correctIndex = correct_answer_indices[0];
            const newOptionsCount = parseInt(mcqOptionsCount);
            const correctAns =question.answers[correctIndex];
            
            let updatedCorrectIndex = Math.min(correctIndex, newOptionsCount - 1);
            let updatedAns ;
            console.log(updatedAns);
            if(correctIndex<newOptionsCount){
              updatedAns =question.answers.slice(0, newOptionsCount);
            }else{
              updatedAns =question.answers.slice(0, newOptionsCount-1);
              updatedAns.push(correctAns);
              
              const shuffledArray = shuffleArray(updatedAns);
                updatedAns=shuffledArray;
                const newCorrectIndex = shuffledArray.indexOf(question.answers[correctIndex]);
                updatedCorrectIndex=newCorrectIndex;
            }
            return {
                ...rest,
                answers: updatedAns,
                correct_answer_indices: [updatedCorrectIndex]
            };
        });
    } else {
        
        QuestionsData = dataa;
    }



      questionStore.setQuestionData(QuestionsData);
      setData(QuestionsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  // const label = { inputProps: { 'aria-label': 'Show Answers' } };
  const handleCheckAnswer=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setChecked(e.target.checked);
  }
  return (
    <div className="bg-white-900  rounded-lg  h-full  w-full  overflow-hidden  overflow-y-auto ">
      
      <div className="flex w-full">    
        <div className="flex-col w-1/2 pr-2">
                    <div className="flex justify-between items-center mb-4 mt-2">
                      <div className="flex items-center">
                        <div className={`text-lg font-semibold ${colorExceed ? 'text-red-600':'text-green-500'} `}>
                          Word Count: {wordCount}
                        </div>
                      </div>
                    </div>
                    <textarea id="userText" className="w-full rounded-md p-2" rows={15} cols={70} value={userText} onChange={handleTextChange}></textarea><br />
                    {colorExceed && <span id="wordCountError" className="text-red-600" >Max limit exceeded (200 words)</span>}
                

                      <select className="w-full p-2 mt-2 border rounded" id="questionType" onChange={handleChange}>
                          <option value="mcq">MCQ</option>
                          <option value="truefalse">True/False</option>
                          <option value="fillblanks">Fill in the Blanks</option>
                      </select>
                  
                <div className="flex mt-2">
                  <div className="w-1/2 pr-2"> 
                  <label htmlFor="questionCount">Question Count:</label><br/>
                      <select className="w-full p-2 rounded-md" id="questionCount" value={questionCount} onChange={(e) => setQuestionCount(e.target.value)}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                      </select>
                  </div>
                  <div className="w-1/2 ">
                  <label htmlFor="difficultyLevel">Difficulty Level:</label><br />
                      <select className="w-full p-2 rounded-md" id="difficultyLevel" value={diffLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                      </select>
                      
                </div>
                </div>

                  <div className="w-full mt-2">
                      
                      {showMCQOptionsCount &&
                          <div>
                              <label htmlFor="mcqOptionsCount">MCQ Options Count:</label><br />
                              <select className="w-full p-2 rounded-md" id="mcqOptionsCount" value={mcqOptionsCount} onChange={(e) => setMCQOptionsCount(e.target.value)}>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                              </select>
                          </div>
                      }
                  </div>

                  <Button className="w-full mt-2 p-2" onClick={handleSubmit}>Submit</Button>
                  <Button className="w-full bg-green-900 mt-2 p-2" onClick={handleStudySubmit}>Study</Button>

        </div>
        
        <div className="w-1/2 pr-2 relative">
          
          {
            loading? <Loader/>:(
              <div>
            <div className="flex text-black w-50 flex-wrap justify-end space-x-3 mb-4">
              <Box>
                <FormControlLabel label="Show Answers" control={<Switch color="warning" checked={checked} onChange={handleCheckAnswer}/>}/>
              </Box>
              <Button className="w-25 gap-8" >Edit</Button>
              <Button className="w-25 " >Export</Button>
            </div>

            <div className="flex items-center mb-4">
                <h2 className="mr-1 text-lg font-semibold">Title :</h2>
                <h2 className="mr-10 text-lg font-semibold">About Elon</h2>
            </div>
            
              {
                data.map((item,i)=>{
                  return <Card key={i} index = {i} question={item.question} answers={item.answers} correct_answer_indices={item.correct_answer_indices} noOfQuestions={data.length} checked={checked}/>
                })
              }

          </div>
            )
          }
          
          
        </div>

      </div>
    </div>
  );
}
