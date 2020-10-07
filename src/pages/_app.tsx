import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';

import theme from '../theme';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache';
import { LoginMutation, MeDocument, MeQuery, Query, RegisterMutation } from '../generated/graphql';

function betterUpdateQuery<Result, Query>(
	cache: Cache,
	qi: QueryInput,
	result: any,
	fn: (r: Result, q: Query) => Query
) {
	return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
	url: 'http://localhost:4000/graphql',
	fetchOptions:
		{
			credentials: 'include'
		},
	exchanges:
		[
			dedupExchange,
			cacheExchange({
				updates:
					{
						Mutation:
							{
								logout:
									(result, args, cache, info) => {
										betterUpdateQuery<LoginMutation, MeQuery>(
											cache,
											{ query: MeDocument },
											result,
											() => ({ me: null })
										);
									},
								login:
									(result, args, cache, info) => {
										betterUpdateQuery<LoginMutation, MeQuery>(
											cache,
											{ query: MeDocument },
											result,
											(result, query) => {
												if (result.login.errors) {
													return query;
												}
												else {
													return {
														me: result.login.user
													};
												}
											}
										);
									},
								register:
									(result, args, cache, info) => {
										betterUpdateQuery<RegisterMutation, MeQuery>(
											cache,
											{ query: MeDocument },
											result,
											(result, query) => {
												if (result.register.errors) {
													return query;
												}
												else {
													return {
														me: result.register.user
													};
												}
											}
										);
									}
							}
					}
			}),
			fetchExchange
		]
});

function MyApp({ Component, pageProps }: any) {
	return (
		<Provider value={client}>
			<ThemeProvider theme={theme}>
				<ColorModeProvider>
					<CSSReset />
					<Component {...pageProps} />
				</ColorModeProvider>
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
