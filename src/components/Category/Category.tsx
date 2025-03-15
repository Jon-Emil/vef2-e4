'use client';

import { QuestionsApi } from '@/api';
import { Category as CategoryType, Question as QuestionType, UiState } from '@/types';
import { useEffect, useState } from 'react';
import Question from '../Question/Question';

export function Category({ slug }: { slug: string }) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [questions, setQuestions] = useState<Array<QuestionType> | null>(null);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const catResponse = await api.getCategory(slug);

      if (!catResponse) {
        setUiState('error');
        return
      }
      setCategory(catResponse);

      const qResponse = await api.getQuestionsFromCatID(catResponse.id);

      if (!qResponse) {
        setUiState("error");
      } else {
        setQuestions(qResponse);
        setUiState("data");
      }
    }
    fetchData();
  }, [slug]);

  return <div>
  <h1>{category?.title}</h1>
  {uiState === 'loading' && <p>Sæki flokk</p>}
  {uiState === 'error' && <p>Villa við að sækja flokk</p>}
  {uiState === 'data' && (
    <ul>
      {questions?.map((question, index) => (
        <li key={index}>
          <Question question={question} ></Question>
        </li>
      ))}
    </ul>
  )}
  </div>
}
