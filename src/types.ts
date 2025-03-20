export type UiState = "initial" | "loading" | "error" | "data" | "empty";

export type Category = {
  id: string;
  slug: string;
  title: string;
};

export type Paginated<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};

export type Answer = {
  id: number;
  text: string;
  correct: boolean;
  q_id: number;
};

export type Question = {
  id: number;
  text: string;
  cat_id: number;
  answers: Answer[];
};

export type AnswerToCreate = {
  text: string;
  correct: boolean;
};

export type QuestionToCreate = {
  text: string;
  cat_id: number;
  answers: AnswerToCreate[];
};
