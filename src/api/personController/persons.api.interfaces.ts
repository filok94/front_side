const PERSON_CONTROLLER = "persons";

export const PERSON_URLS = {
	get_person: `${ PERSON_CONTROLLER }`,
	get_all: `admin/${ PERSON_CONTROLLER }`
} as const;
// eslint-disable-next-line no-redeclare
export type PERSON_URLS = typeof PERSON_URLS[keyof typeof PERSON_URLS];
export interface IPerson {
  _id: string;
  name: string;
  description: string;
  link: string;
  count: number;
}
