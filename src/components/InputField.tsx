import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/core';
import { useField } from 'formik';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
};

export const InputField: React.FC<InputProps> = ({ label, size: _, ...props }) => {
	const [
		field,
		{ error }
	] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Input {...field} {...props} id={field.name} placeholder={props.placeholder} />
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
};
