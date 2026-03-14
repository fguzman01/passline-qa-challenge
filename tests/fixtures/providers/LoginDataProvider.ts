import loginData from '../data/loginData.json';

export interface LoginTestData {
  tag: string;
  email: string;
  password: string;
  expectedResult: string;
  username: string;
}

export class LoginDataProvider {
  static getByTag(tag: string): LoginTestData {
    const data = (loginData as LoginTestData[]).find(item => item.tag === tag);

    if (!data) {
      throw new Error(`No existe data de login para el tag: ${tag}`);
    }

    return data;
  }
}
