import React from 'react';
import { Form, Formik} from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from 'next/router'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link'

interface loginProps {}
const initialValues = {
	username: '',
	password: ''
};
const Login: React.FC<loginProps> = ({}) => {
	const router = useRouter()
	const [
		,
		login
	] = useLoginMutation();
	return (
		<Wrapper variant="small">
			<Formik initialValues={initialValues} onSubmit={async (values,{setErrors}) => {
		const response = await login(values);
		if(response.data?.login.errors){
			setErrors(toErrorMap(response.data.login.errors))
		}else if(response.data?.login.user){
			if(typeof router.query.next === 'string'){
				router.push(router.query.next)
			}else{
				
			router.push('/')
			}
		}}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField name="username" placeholder="Username" label="Username" />
						<Box mt={4}>
							<InputField name="password" placeholder="Password" label="Password" type="password" />
						</Box>
						<Flex mt={2}>
							<NextLink href="/forgot-password">
								<Link ml='auto'>Forgot Password ?</Link>
							</NextLink>
						</Flex>
						<Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
