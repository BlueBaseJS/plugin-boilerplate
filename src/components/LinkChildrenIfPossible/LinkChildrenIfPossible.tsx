import { Link, LinkProps } from '@bluebase/components';

import React from 'react';

export interface LinkChildrenIfPossibleProps extends LinkProps {
	children: React.ReactNode;
}

/**
 * Wraps a children with a Link component if routeName, path or onPress
 * is passed as props. Otherwise renders children as is.
 */
export const LinkChildrenIfPossible = (props: LinkChildrenIfPossibleProps) => {
	const { routeName, path, onPress, params, children, ...rest } = props;

	const hasLink = routeName || path || onPress;

	if (hasLink) {
		return <Link {...{ routeName, path, onPress, params, ...rest }}>{children}</Link>;
	}

	return children as React.ReactElement;
};
