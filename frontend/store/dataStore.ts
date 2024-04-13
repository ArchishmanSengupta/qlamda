import { create } from 'zustand'

interface Question {
    question: string;
    answers: string[];
    correct_answer_indices: number[];
    
}

interface QuestionStore{
  questionData : Question[],
  setQuestionData: (data: Question[]) => void;
}

export const questionDataStore = create<QuestionStore>((set) => ({
    questionData: [],
    setQuestionData: (data) => set({ questionData: data }),
}));
