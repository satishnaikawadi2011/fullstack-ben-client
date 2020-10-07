import React from 'react';
import { Form, Formik } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

interface registerProps {}
const initialValues = {
	username: '',
	password: ''
};

const submitHandler = (values) => {
	console.log(values);
};

const Register: React.FC<registerProps> = ({}) => {
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
