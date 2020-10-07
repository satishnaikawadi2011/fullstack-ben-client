import React from 'react';
import { Form, Formik} from 'formik';
import { Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Exact, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from 'next/router'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}
const initialValues = {
	username: '',
	password: ''
};


// type Values = Exact<{ username: string; password: string }>;
const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter()
	const [
		,
		register
	] = useRegisterMutation();
	// const submitHandler = async (values,{setErrors}) => {
	// 	// console.log(values);
	// 	const response = await register(values);
	// 	if(response.data?.register.errors){
	// 		setErrors(toErrorMap(response.data.register.errors))
	// 	}
	// };
	return (
		<Wrapper variant="small">
			<Formik initialValues={initialValues} onSubmit={async (values,{setErrors}) => {
		// console.log(values);
		const response = await register(values);
		if(response.data?.register.errors){
			setErrors(toErrorMap(response.data.register.errors))
		}else if(response.data?.register.user){
			router.push('/')
		}}}>
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

export default withUrqlClient(createUrqlClient)(Register);
