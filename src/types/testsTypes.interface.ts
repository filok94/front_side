import { Ref } from 'vue'

export interface ChooseSjwAnswer {
  answer: number;
  number: number;
}

export interface WarriorCardType {
  answers: number[];
  id: number;
  imageUrl: string;
  name: string;
}

export interface TriggerPerson {
  description: string;
  image: string;
  level: number;
  link: string;
  title: string;
}

export interface OptionEmit {
  optionTitle: string;
  optionVariant: string | number;
}

export interface IInputError {
  message: string;
  showSeconds: number;
}

export interface IAnswersList {
  answer: 0 | 1 | 2 | 3;
  index: number;
}

export type Nullable<T> = T | null | undefined;
export class Tab {
  name: string
  id: number
  constructor (params: { id: number; name: string }) {
    this.name = params.name
    this.id = params.id
  }
}

export type HTMLRef<T = HTMLElement> = Ref<null | T>;
