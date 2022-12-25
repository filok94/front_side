import { PERSON_URLS } from "./persons.api.interfaces";
import { globalInstance } from "./../globalInstance";
export const getPersonById = async (params: { id: string }) => {
	try {
		const response = await globalInstance.get(PERSON_URLS.get_person, {
			params,
		});
		if (!response) {
			throw new Error(`person is ${ response }`);
		}
		return response.data;
	}
	catch (e) {
		//pushToErrorHandler
	}
};
