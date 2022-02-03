import { ApolloErrorComponent } from './ApolloErrorComponent';
import { ErrorStateProps } from '@bluebase/components';
import React from 'react';

export function withApolloError(Component: React.ComponentType<ErrorStateProps & any>) {
	// eslint-disable-next-line react/display-name
	return (props: ErrorStateProps) => (
		<ApolloErrorComponent {...props}>
			<Component {...props} />
		</ApolloErrorComponent>
	);
}
