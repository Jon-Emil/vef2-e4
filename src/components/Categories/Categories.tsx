'use client';

import { QuestionsApi } from '@/api';
import { Category, UiState } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Categories.module.css';

type Props = {
  title: string;
  tag?: string;
  popular?: boolean;
};

export default function Categories({ title }: Props) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [categories, setCategories] = useState<Array<Category> | null>(
    null,
  );

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const categoriesResponse = await api.getCategories();

      if (!categoriesResponse.data) {
        setUiState('error');
      } else {
        setUiState('data');
        setCategories(categoriesResponse.data);
      }
    }
    fetchData();
  }, []);

  console.log("fetched categories: ", categories);

  return (
    <div className={styles.cats}>
      <h2>{title}</h2>

      {uiState === 'loading' && <p>Sæki flokka</p>}
      {uiState === 'error' && <p>Villa við að sækja flokka</p>}
      {uiState === 'data' && (
        <ul>
          {categories?.map((category, index) => (
            <li key={index}>
              <Link href={`/flokkar/${category.slug}`}>{category.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
