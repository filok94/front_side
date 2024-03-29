import { globalInstance } from '../globalInstance'
import {
  GAME_URLS,
  IGetQuestionsResponse,
  IGameIdParam,
  IPostCalculateAnswers,
  IResponseCalculateAnswers,
  IResponseGetResult,
  IGetAllGamesResponse,
  IPostCreateGame
} from './games.api.interfaces'

async function getAllGames (): Promise<
	IGetAllGamesResponse[] | undefined
	> {
  try {
    const response = await globalInstance.get<IGetAllGamesResponse[]>(
      GAME_URLS.get_all
    )
    if (!response) {
      throw new Error(`games response is ${response}`)
    }
    return response.data
  } catch (e) {
    // pushToErrorToast()
  }
}

const getQuestions = async (
  params: IGameIdParam
): Promise<IGetQuestionsResponse[] | undefined> => {
  try {
    const response = await globalInstance.get<IGetQuestionsResponse[]>(
      GAME_URLS.get_questions(params.game_id),
      {
        params: {
          game_id: params.game_id
        }
      }
    )
    if (!response) {
      throw new Error(`question response is ${response}`)
    }
    return response.data
  } catch (e) {
    // pushToErrorToast()
  }
}

const postCalculate = async (
  data: IPostCalculateAnswers
): Promise<IResponseCalculateAnswers | undefined> => {
  try {
    const response = await globalInstance.put(GAME_URLS.calculate(data.gameId), {
      answers: data.answers
    })
    if (!response) {
      throw new Error(`calculation response is ${response}`)
    }
    return response.data
  } catch (e) {
    // pushToErrorToast()
  }
}

const getResultData = async (params: {
	gameId: string;
}): Promise<IResponseGetResult | undefined> => {
  try {
    const response = await globalInstance.get(GAME_URLS.get_results(params.gameId))
    if (!response) {
      throw new Error(`results response is ${response}`)
    }
    return response.data
  } catch (e) {
    // pushToErrorToast()
  }
}

const postCreateGame = async (data: IPostCreateGame): Promise<IResponseGetResult | undefined> => {
  try {
    const response = await globalInstance.post(GAME_URLS.post_create_game, {
      ...data
    })
    if (!response) {
      throw new Error(`create game response is ${response}`)
    }
    return response.data
  } catch (e) {
    // pushToErrorToast()
  }
}

const deleteGame = async (gameId: string) => {
  try {
    const response = await globalInstance.delete(GAME_URLS.deleteGame(gameId))
    if (!response) {
      throw new Error(`results response is ${response}`)
    }
    return response.data
  } catch (e) {
    // pushToErrorToast()
  }
}

export { getAllGames, postCreateGame, getResultData, postCalculate, getQuestions, deleteGame }
