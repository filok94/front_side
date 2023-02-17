import { defineStore } from 'pinia'
import {
  getAllAvatars,
  getAvatarById
} from '../api/avatarController/avatar.api'
import {
  IAvatarProp,
  IResponseGetAllAvatars
} from '../api/avatarController/avatar.api.interfaces'
import { Nullable } from '../types/testsTypes.interface'

interface AvatarState {
  avatarLink: null | string;
  allAvatarsList: Nullable<IResponseGetAllAvatars[]>;
  avatarImage: null | string;
  activeAvatarLink: string | null;
  options: IAvatarProp[] | null;
}

export const useAvatarStore = defineStore('avatar', {
  state: (): AvatarState => {
    return {
      avatarLink: null,
      allAvatarsList: null,
      avatarImage: null,
      activeAvatarLink: null,
      options: null
    }
  },
  actions: {
    async getAllAvatarsList () {
      const res = await getAllAvatars()
      if (res) {
        this.allAvatarsList = res
      }
    },

    async getAvatarOptions (params: { avatarId: string }) {
      const res = await getAvatarById({
        avatar_id: params.avatarId
      })
      if (res?.props) {
        this.options = res?.props
        this.activeAvatarLink = res.base_link
      }
    },
    setAvatarLink (link: string) {
      this.avatarLink = link
    }
  }
})
