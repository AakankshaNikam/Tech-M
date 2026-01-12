
export interface Question {
  id: string;
  text: string;
  weight: number;
}

export interface SubVerticalQuestions {
  [subVerticalName: string]: Question[];
}

export interface VerticalData {
  top3: Question[];
  subVerticals: SubVerticalQuestions;
}

export interface DimensionData {
  [verticalName: string]: VerticalData;
}

export interface QuestionBank {
  [dimensionName: string]: DimensionData;
}

export interface JustificationLevel {
  level: number;
  title: string;
}

export interface DimensionScores {
  [dimensionName: string]: number;
}

export interface CustomWeights {
  [verticalName: string]: {
    [dimensionName: string]: number;
  };
}
