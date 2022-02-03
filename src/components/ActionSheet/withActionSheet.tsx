import React from 'react';
import { useActionSheet } from './useActionSheet';

export function withActionSheet<T = any>(
	Component: React.ComponentType<T>
): React.ComponentType<T> {
	// eslint-disable-next-line react/display-name
	return (props: T) => {
		const sheet = useActionSheet();
		return <Component {...props} {...sheet} />;
	};
}
