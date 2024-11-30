export type StoryType = 'new' | 'top' | 'ask' | 'show' | 'jobs';
export interface Story {
  id: number;
  title: string;
  by: string;
  score: number;
  time: number;
  url: string;
}




