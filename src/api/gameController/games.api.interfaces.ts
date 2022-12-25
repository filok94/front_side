import { IPerson } from "../personController/persons.api.interfaces";

const GAMES_CONTROLLER = "games";

export const GAME_URLS = {
	get_all: `${ GAMES_CONTROLLER }`,
	get_questions: (id: string) => `${ GAMES_CONTROLLER }/${ id }`,
	calculate: (id: string) => `${ GAMES_CONTROLLER }/${ id }/calculate`,
	get_results: (id: string) => `${ GAMES_CONTROLLER }/${ id }/results`,
	post_create_game: `${ GAMES_CONTROLLER }/create`
} as const;
// eslint-disable-next-line no-redeclare
export type GAME_URLS = typeof GAME_URLS[keyof typeof GAME_URLS];

export interface IGetAllGamesResponse {
	_id: string;
	title: string;
	description: string;
	persons: string[];
	link: string;
}

export interface IGetQuestionsResponse {
	question: string;
	answers: string[];
	index: number;
}

export interface IGameIdParam {
	game_id: string;
}

export interface IPostCalculateAnswers {
	gameId: string;
	answers: {
		index: number;
		answer: number;
	}[];
}
export interface IResponseCalculateAnswers {
	person: IPerson;
	test_result: {
		right_answer: number;
		user_answer: number;
		is_right: boolean;
		index: number;
	}[];
}

export interface ITestData {
	right_answer: number;
	user_answer: number;
	is_right: boolean;
	index: number;
}
export interface IResponseGetResult {
	person: IPerson;
	game_id: string;
	test_data: ITestData[];
}
