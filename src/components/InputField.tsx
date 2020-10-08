import { FormControl, FormLabel, FormErrorMessage, Input, Textarea } from '@chakra-ui/core';
import { useField } from 'formik';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	textarea?: boolean;
};

export const InputField: React.FC<InputProps> = ({ label, size: _, ...props }) => {
	const [
		field,
		{ error }
	] = useField(props);
	let C = Input;
	if (props.textarea) {
		C = Textarea;
	}
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<C {...field} {...props} id={field.name} placeholder={props.placeholder} />
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
};
