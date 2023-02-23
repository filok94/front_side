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
  routeName: string
  constructor (params: { routeName: string; name: string }) {
    this.name = params.name
    this.routeName = params.routeName
  }
}

export class CircleZone {
  constructor (public fromX: Ref<number>, public toX: Ref<number>, public fromY: Ref<number>, public toY: Ref<number>, public zoneName: string) {
    this.fromX = fromX
    this.toX = toX
    this.fromY = fromY
    this.toY = toY
    this.zoneName = zoneName
  }
}

export type CircleGridArea = 'cb' | 'lb' | 'lc' | 'lt' | 'ct' | 'rt' | 'rc' | 'rb'

export type HTMLRef<T = HTMLElement> = Ref<null | T>;
