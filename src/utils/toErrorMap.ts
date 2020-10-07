import { Error } from './../generated/graphql';
export const toErrorMap = (errors: Error[]) => {
	const errorMap: Record<string, string> = {};
	errors.forEach((err) => {
		errorMap[err.field] = err.message;
	});
	return errorMap;
};
