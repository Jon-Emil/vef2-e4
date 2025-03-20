'use client'

import { QuestionsApi } from "@/api";
import { Category, UiState } from "@/types";
import { useEffect, useState } from "react";

export default function CreationForm() {
    const [uiState, setUiState] = useState<UiState>('initial');
    const [categories, setCategories] = useState<Array<Category> | null>(
        null,
    );
    const [questionToMake, setQuestionToMake] = useState({
        text: '',
        cat_id: 0,
        answers: Array(4).fill({ text: '', correct: false }),
    });

    useEffect(() => {
        async function fetchData() {
          setUiState('loading');
    
          const api = new QuestionsApi();
          const categoriesResponse = await api.getCategories();
    
          if (!categoriesResponse) {
            setUiState('error');
          } else {
            setUiState('data');
            setCategories(categoriesResponse);
          }
        }
        fetchData();
      }, []);

    const handleAnswerChange = (index: number, key: keyof typeof questionToMake['answers'][0], value: string | boolean) => {
        const updatedAnswers = [...questionToMake.answers];
        updatedAnswers[index] = { ...updatedAnswers[index], [key]: value };
        setQuestionToMake((prev) => ({ ...prev, answers: updatedAnswers }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const api = new QuestionsApi();
    console.log(questionToMake);
    api.makeQuestion(questionToMake);
  };

  return (
    <div>
        <h2>Búa til nýja spurningu</h2>
        {uiState === 'loading' && <p>Sæki gögn</p>}
        {uiState === 'error' && <p>Villa við að sækja gögn</p>}
        {uiState === 'data' && (
        <form onSubmit={handleSubmit}>
          <label>
            Flokkur:
            <select
              value={questionToMake.cat_id || ''}
              onChange={(e) => setQuestionToMake({ ...questionToMake, cat_id: parseInt(e.target.value, 10) })}
            >
              <option value="">Veldu flokk</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Spurning:
            <input
              type="text"
              value={questionToMake.text}
              onChange={(e) => setQuestionToMake({ ...questionToMake, text: e.target.value })}
            />
          </label>

          <h3>Svör:</h3>
          {questionToMake.answers.map((answer, index) => (
            <div key={index}>
              <label>
                Svar {index + 1}:
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
                />
              </label>
              <label>
                Er þetta rétt svar?
                <input
                  type="checkbox"
                  checked={answer.correct}
                  onChange={(e) => handleAnswerChange(index, 'correct', e.target.checked)}
                />
              </label>
            </div>
          ))}

          <button type="submit">Senda</button>
        </form>
        )}
    </div>
  );
}