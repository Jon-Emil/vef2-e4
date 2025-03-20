import {
  apiResponse,
  Category,
  Question,
  QuestionToCreate,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000";

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<apiResponse<T>> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error("error fetching from api", url, e);
      return { data: null, status: 0 };
    }

    if (!response.ok) {
      console.error("non 2xx status from API", url);
      return { data: null, status: response.status };
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error("error parsing json", url, e);
      return { data: null, status: response.status };
    }

    return { data: json, status: response.status } as apiResponse<T>;
  }

  async createWithApi<T>(
    url: string,
    data: QuestionToCreate
  ): Promise<apiResponse<T>> {
    let response: Response | undefined;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error("error posting data to api", url, JSON.stringify(data), e);
      return { data: null, status: 0 };
    }

    if (!response.ok) {
      console.error("non 2xx status from API", url);
      return { data: null, status: response.status };
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error("error parsing json", url, e);
      return { data: null, status: response.status };
    }

    return { data: json, status: response.status } as apiResponse<T>;
  }

  async getCategory(slug: string): Promise<apiResponse<Category>> {
    const url = BASE_URL + `/categories/${slug}`;

    const response = await this.fetchFromApi<Category>(url);

    return response;
  }

  async getCategories(): Promise<apiResponse<Array<Category>>> {
    const url = BASE_URL + "/categories";

    const response = await this.fetchFromApi<Array<Category>>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getQuestionsFromCatID(
    cat_id: string
  ): Promise<apiResponse<Array<Question>>> {
    const url = BASE_URL + "/questions/" + cat_id;

    const response = await this.fetchFromApi<Array<Question>>(url);

    return response;
  }

  async makeQuestion(data: QuestionToCreate): Promise<apiResponse<Question>> {
    const url = BASE_URL + "/questions";

    const response = await this.createWithApi<Question>(url, data);

    return response;
  }
}
