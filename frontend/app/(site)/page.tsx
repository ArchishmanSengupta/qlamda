"use client"
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FormData {
  userText: string;
  aiModelQuality: string;
  difficultyLevel: string;
  generationType: string;
  mcqOptionsCount?: string;
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
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value
        
        const words = text.trim().split(/\s+/);
        if (words.length > 200) {
          setColorExceed(true);
          setUserText(words.slice(0, 200).join(' '));
          setWordCount(200);
        } else {
          setUserText(text);
          setWordCount(words.length);
          setColorExceed(false);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setQuestionType(value);
      if(value === "MCQ"){
        setShowMCQOptionsCount(true);
      }else{
        setShowMCQOptionsCount(false);
      }
  };

    const handleSubmit = () => {
      const formData: FormData = {
        userText,
        aiModelQuality: 'high_quality',
        difficultyLevel:diffLevel.toLowerCase(),
        generationType: questionType.toLowerCase(),
    };
    if (questionType === 'MCQ') {
        formData['mcqOptionsCount'] = mcqOptionsCount;
    }
    const jsonFormData = JSON.stringify(formData);
    console.log(jsonFormData);
        // to do 
    };

  return (
    <div className="flex-col w-[50%] p-10">
                <div className="flex justify-between items-center mb-4 mt-2">
                  <div className="flex items-center">
                    <div className="text-sm font-semibold text-red-500">
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
              <div className="w-1/2 pr-2">
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

    </div>
  );
}
