import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
	const [
		complete,
		setComplete
	] = useState(false);
	const [
		,
		forgotPassword
	] = useForgotPasswordMutation();
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ email: '' }}
				onSubmit={async (values, { setErrors }) => {
					await forgotPassword(values);
					setComplete(true);
				}}
			>
				{({ isSubmitting }) =>

						complete ? <Box>If an account with that email exists,we sent you an email!</Box> :
						<Form>
							<InputField name="email" placeholder="email address" label="Email" />
							<Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
								Forgot Password
							</Button>
						</Form>}
			</Formik>
		</Wrapper>
	);
};

export default ForgotPassword;
