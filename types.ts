export enum MbtiType {
  INTJ = 'INTJ',
  INTP = 'INTP',
  ENTJ = 'ENTJ',
  ENTP = 'ENTP',
  INFJ = 'INFJ',
  INFP = 'INFP',
  ENFJ = 'ENFJ',
  ENFP = 'ENFP',
  ISTJ = 'ISTJ',
  ISFJ = 'ISFJ',
  ESTJ = 'ESTJ',
  ESFJ = 'ESFJ',
  ISTP = 'ISTP',
  ISFP = 'ISFP',
  ESTP = 'ESTP',
  ESFP = 'ESFP',
}

export interface FortuneResult {
  fortuneLevel: string; // e.g., "大吉", "末吉"
  poem: string; // A 4-line poem
  poemExplanation: string; // Explanation of the poem
  generalAdvice: string; // General advice based on MBTI
  categories: {
    love: string;
    career: string;
    family: string;
    health: string;
  };
  luckyItem: string;
}

export interface UserInput {
  mbti: MbtiType | '';
  question: string;
}
