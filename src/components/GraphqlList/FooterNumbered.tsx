import { Theme, getComponent, useStyles } from '@bluebase/core';
import { View, ViewStyle } from 'react-native';

import { GraphqlListProps } from './types';
import { PaginationProps } from '@bluebase/components';
import { QueryResult } from 'react-apollo';
import React from 'react';
import get from 'lodash.get';

const Pagination = getComponent<PaginationProps>('Pagination', 'Noop');
Pagination.displayName = 'Pagination';

export interface GraphqlListFooterStyles {
	root: ViewStyle;
}

export interface GraphqlListFooterProps extends GraphqlListProps {
	result: QueryResult<any, Record<string, any>>;

	style?: ViewStyle;
	styles?: Partial<GraphqlListFooterStyles>;
}

const defaultProps = (theme: Theme): GraphqlListFooterStyles => ({
	root: {
		borderTopColor: theme.palette.divider,
		borderTopWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		padding: theme.spacing.unit,
	},
});

export const FooterNumbered = (props: GraphqlListFooterProps) => {
	const {
		page,
		itemsPerPage,
		result,
		mapQueryResultToConnection,
		onPageChange,
		loading,
		style,
	} = props;
	const styles = useStyles('GraphqlListFooter', props, defaultProps);

	const connection = mapQueryResultToConnection(result);
	const totalCount = get(connection, 'totalCount', 0);
	const totalPages = Math.ceil(totalCount / itemsPerPage);

	return (
		<View style={[styles.root, style]}>
			<Pagination count={totalPages} page={page} onChange={onPageChange} disabled={loading} />
		</View>
	);
};
FooterNumbered.displayName = 'FooterNumbered';
