import { globalInstance } from '../globalInstance'
import {
  IResponseGetAllAvatars,
  IResponseGetMyAvatar,
  IResponseGetAvatarById,
  IRequestParamsGetAvatarById,
  IRequestSaveAvatar,
  IResponseSaveAvatar,
  AVATAR_URLS
} from './avatar.api.interfaces'

export const getMyAvatar = async (): Promise<
  IResponseGetMyAvatar | undefined
> => {
  try {
    const res = await globalInstance.get<IResponseGetMyAvatar>(
      AVATAR_URLS.user
    )
    if (!res) {
      throw new Error(`avatar response is ${res}`)
    }
    if (res.status === 200) {
      return res.data
    }
  } catch (e) {
    // pushToErrorHandler
  }
}

export const getAllAvatars = async (): Promise<
  IResponseGetAllAvatars[] | undefined
> => {
  try {
    const res = await globalInstance.get<IResponseGetAllAvatars[]>(
      AVATAR_URLS.get_all
    )
    if (!res) {
      throw new Error(`avatar response is ${res}`)
    }
    return res.data
  } catch (e) {
    // pushToErrorHandler
  }
}

export const getAvatarById = async (
  params: IRequestParamsGetAvatarById
): Promise<IResponseGetAvatarById | undefined> => {
  try {
    const res = await globalInstance.get<IResponseGetAvatarById>(
      AVATAR_URLS.get_by_id(params.avatar_id)
    )
    if (!res) {
      throw new Error(`avatar response is ${res}`)
    }
    return res.data
  } catch (e) {
    // pushToErrorHandler
  }
}

export const saveAvatar = async (
  data: IRequestSaveAvatar
): Promise<IResponseSaveAvatar | undefined> => {
  try {
    const res = await globalInstance.put<IResponseSaveAvatar>(
      AVATAR_URLS.save,
      {
        ...data
      }
    )
    if (!res) {
      throw new Error(`avatar response is ${res}`)
    }
    return res.data
  } catch (e) {
    // pushToErrorHandler
  }
}
