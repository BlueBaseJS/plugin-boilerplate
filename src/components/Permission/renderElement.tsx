import React from 'react';

export function renderElement(
	Component: React.ComponentType<any> | React.ReactElement,
	props: any
) {
	return React.isValidElement(Component) ? Component : <Component {...props} />;
}
