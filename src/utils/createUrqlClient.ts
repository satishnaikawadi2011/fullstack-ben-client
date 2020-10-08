import { LogoutMutation } from './../generated/graphql';
import { dedupExchange, fetchExchange ,Exchange} from 'urql';
import { LoginMutation, MeQuery, MeDocument, RegisterMutation } from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';
import { cacheExchange } from '@urql/exchange-graphcache';
import {pipe,tap} from 'wonka'
import Router from 'next/router'
// TODO: Global error handling
const errorExchange:Exchange = ({forward}) => ops$ => {
	return pipe(
		forward(ops$),
		tap(({error}) => {
			if(error?.message.includes("Not authenticated")){
				Router.replace('/login')
			}
		})
	)
}


export const createUrqlClient = (ssrExchange: any) => ({
	url: 'http://localhost:4000/graphql',
	fetchOptions:
		{
			credentials: 'include' as const
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
										betterUpdateQuery<LogoutMutation, MeQuery>(
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
			errorExchange,
			ssrExchange,
			fetchExchange
		]
});
