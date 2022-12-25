const AVATAR_CONTROLLER = "avatars";

export const AVATAR_URLS = {
	user: `${ AVATAR_CONTROLLER }/user`,
	get_all: `${ AVATAR_CONTROLLER }`,
	get_by_id: (id: string) => `${ AVATAR_CONTROLLER }/${ id }`,
	save: `${ AVATAR_CONTROLLER }/save`,
} as const;
// eslint-disable-next-line no-redeclare
export type AVATAR_URLS = typeof AVATAR_URLS[keyof typeof AVATAR_URLS];
export interface IResponseGetMyAvatar {
	ref_link: string;
}

export interface IResponseGetAllAvatars {
	ref_name: string;
	base_link: string;
	_id: string;
}

export interface IAvatarProp {
	prop_name: string;
	values: string[];
	probability: string | null;
}

export interface IResponseGetAvatarById {
	ref_name: string;
	base_link: string;
	props: IAvatarProp[];
}

export interface IRequestParamsGetAvatarById {
	avatar_id: string;
}

export interface IRequestSaveAvatar {
	full_link: string;
	avatar: string;
}

export interface IResponseSaveAvatar {
	saved: boolean;
}
