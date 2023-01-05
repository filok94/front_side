import { PERSON_URLS, IPerson } from "./persons.api.interfaces";
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

export const getAllPersons = async (): Promise<IPerson[] | undefined > => {
	try {
		const response = await globalInstance.get<IPerson[]>(PERSON_URLS.get_all);
		if (!response) {
			throw new Error(`persons is ${ response }`);
		}
		return response.data;

	}
	catch (e) {
		//pushToErrorHandler
	}
};
