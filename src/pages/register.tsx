import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { Exact, useRegisterMutation } from '../generated/graphql';

interface registerProps {}
const initialValues = {
	username: '',
	password: ''
};

type Values = Exact<{ username: string; password: string }>;
const Register: React.FC<registerProps> = ({}) => {
	const [
		,
		register
	] = useRegisterMutation();
	const submitHandler = async (values: Values) => {
		// console.log(values);
		const response = await register(values);
	};
	return (
		<Wrapper variant="small">
			<Formik initialValues={initialValues} onSubmit={submitHandler}>
				{({ values, handleChange, isSubmitting }) => (
					<Form>
						<InputField name="username" placeholder="Username" label="Username" />
						<Box mt={4}>
							<InputField name="password" placeholder="Password" label="Password" type="password" />
						</Box>
						<Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
