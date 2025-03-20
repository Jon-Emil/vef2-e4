import { Question as QuestionType } from '@/types';
import { useState } from "react";
import styles from "./Question.module.css";

export default function Question({ question }: { question: QuestionType }) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleSelection = (answerId: number) => {
    setSelectedAnswer(answerId);
  };
  
  return (
    <div>
      <h3>{question.text}</h3>
      <ul>
        {question.answers.map((answer) => {
          const isSelected = selectedAnswer === answer.id;
          const className = isSelected ? (answer.correct ? styles.correct : styles.incorrect) : "";

          return (
            <li key={answer.id} className={styles.answers}>
              <label className={className}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={answer.id}
                  onChange={() => handleSelection(answer.id)}
                />
                {answer.text}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}