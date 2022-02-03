import { getComponent, useConfig, useNavigation } from '@bluebase/core';

import { ApolloError } from '@apollo/client';
import React from 'react';
import { Redirect } from '@bluebase/components';
import get from 'lodash.get';

const ForbiddenError = getComponent('ForbiddenError');
const NetworkError = getComponent('NetworkError');
const NotFoundError = getComponent('NotFoundError');

export interface ApolloErrorComponentProps {
	[key: string]: any;
	error?: any;
	retry?: () => void;
	children: React.ReactNode;
}

export const ApolloErrorComponent = (props: ApolloErrorComponentProps) => {
	const { children, ...rest } = props;
	const error = props.error as ApolloError;
	const { state } = useNavigation();
	const [, setUserId] = useConfig('user.id');
	const [, setAccessToken] = useConfig('user.accessToken');

	if (error) {
		if (error.networkError) {
			return <NetworkError {...rest} />;
		}

		if (error.graphQLErrors && error.graphQLErrors.length > 0) {
			// Unauthenticated
			const unauthenticated = error.graphQLErrors.find(
				(e) => get(e, 'extensions.code') === 'UNAUTHENTICATED'
			);

			if (unauthenticated) {
				setUserId(null);
				setAccessToken(null);
				return <Redirect routeName="Logout" params={{ ...state.params, redirect: state }} />;
			}

			// Forbidden
			const forbidden = error.graphQLErrors.find((e) => get(e, 'extensions.code') === 'FORBIDDEN');

			if (forbidden) {
				return <ForbiddenError {...rest} />;
			}

			// 404
			const notFound = error.graphQLErrors.find((e) => get(e, 'extensions.code') === 'NOT_FOUND');

			if (notFound) {
				return <NotFoundError {...rest} />;
			}
		}
	}

	return children as any;
};
