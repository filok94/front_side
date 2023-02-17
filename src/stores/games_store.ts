import {
  IGetAllGamesResponse,
  IGetQuestionsResponse,
  IPostCalculateAnswers
} from '../api/gameController/games.api.interfaces'
import { defineStore } from 'pinia'
import {
  getAllGames,
  getQuestions,
  postCalculate,
  getResultData
} from '../api/gameController/games.api'
import { IAnswersList, Nullable } from '../types/testsTypes.interface'

import { IPerson } from '../api/personController/persons.api.interfaces'

type Result = {
	right_answer: number;
	user_answer: number;
	is_right: boolean;
	index: number;
}[];
interface GamesState {
	games: Nullable<IGetAllGamesResponse[]>;
	activeGame: Nullable<{
		id: string;
		title: string;
		questions: Nullable<IGetQuestionsResponse[]>;
	}>;
	anserwsList: IAnswersList[];
	gameResult: Result;
	person: IPerson | null;
}

export const useGamesStore = defineStore('games', {
  state: (): GamesState => {
    return {
      games: null,
      activeGame: null,
      anserwsList: [],
      gameResult: [],
      person: null
    }
  },
  actions: {
    async setActiveGame (gameName: string) {
      const activeGame = this.games?.filter((e) => e.title === gameName)[0]
      if (activeGame) {
        const questions = await getQuestions({
          game_id: activeGame._id
        })
        this.activeGame = this.activeGame = {
          id: activeGame._id,
          title: activeGame.title,
          questions
        }
      }
    },
    async getAllGames () {
      this.games = await getAllGames()
    },

    pushAnswerToList (param: IAnswersList) {
      this.anserwsList.push(param)
    },

    async pushToCalculate (data: IPostCalculateAnswers) {
      await postCalculate(data)
    },

    async setResultData (gameId: string) {
      const result = await getResultData({
        gameId
      })
      this.gameResult = result?.test_data ?? []
      this.person = result?.person || null
    }
  }
})
