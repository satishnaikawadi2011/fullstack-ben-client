import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const initialValues = {
	title: '',
	text: ''
};

const CreatePost: React.FC<{}> = ({}) => {
	const router = useRouter();
	useIsAuth();
	const [
		,
		createPost
	] = useCreatePostMutation();
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={initialValues}
				onSubmit={async (values, { setErrors }) => {
					// console.log(values);
					const { error } = await createPost({ ...values });
					if (!error) {
						router.push('/');
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField name="title" placeholder="title" label="Title" />
						<Box mt={4}>
							<InputField name="text" placeholder="text...." label="Body" textarea />
						</Box>
						<Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
							Create Post
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default withUrqlClient(createUrqlClient)(CreatePost);
