import { Category, Paginated, Question } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000";

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error("error fetching from api", url, e);
      return null;
    }

    if (!response.ok) {
      console.error("non 2xx status from API", url);
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error("error parsing json", url, e);
      return null;
    }

    return json as T;
  }

  async getCategory(slug: string): Promise<Category | null> {
    const url = BASE_URL + `/categories/${slug}`;

    const response = await this.fetchFromApi<Category | null>(url);

    return response;
  }

  async getCategories(): Promise<Array<Category> | null> {
    const url = BASE_URL + "/categories";

    const response = await this.fetchFromApi<Array<Category>>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getQuestionsFromCatID(cat_id: string): Promise<Array<Question> | null> {
    const url = BASE_URL + "/questions/" + cat_id;

    const response = await this.fetchFromApi<Array<Question>>(url);

    return response;
  }
}
