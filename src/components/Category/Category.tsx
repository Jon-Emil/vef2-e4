'use client';

import { QuestionsApi } from '@/api';
import { Category as CategoryType, Question as QuestionType, UiState } from '@/types';
import { useEffect, useState } from 'react';
import Question from '../Question/Question';

export function Category({ slug }: { slug: string }) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [questions, setQuestions] = useState<Array<QuestionType> | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const catResponse = await api.getCategory(slug);

      if (!catResponse.data) {
        setUiState('error');
        setError(catResponse.status < 500 ? `${catResponse.status}: flokkur fannst ekki` : `${catResponse.status}: Villa kom upp`)
        return
      }
      setCategory(catResponse.data);

      const qResponse = await api.getQuestionsFromCatID(catResponse.data.id);

      if (!qResponse.data) {
        setUiState("error");
      } else {
        setQuestions(qResponse.data);
        setUiState("data");
      }
    }
    fetchData();
  }, [slug]);

  return <div>
  <h1>{category?.title}</h1>
  {uiState === 'loading' && <p>Sæki flokk</p>}
  {uiState === 'error' && (error ? <p>{error}</p> : <p>500: Villa við að sækja flokk</p>)}
  {uiState === 'data' && (
    <ul>
      {questions?.length === 0 ? <p>engar spurningar fundust í þessum flokk</p> : questions?.map((question, index) => (
        <li key={index}>
          <Question question={question} ></Question>
        </li>
      ))}
    </ul>
  )}
  </div>
}
