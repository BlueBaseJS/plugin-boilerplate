import { Body2, List } from '@bluebase/components';
import { useIntl, useTheme } from '@bluebase/core';
import React from 'react';

export const ProductInfoEmptyState = () => {
	const { __ } = useIntl();
	const { theme } = useTheme();
	return (
		<List.Item
			title={__('Unknown Product')}
			description={
				<Body2 style={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
					{__('This thing has no product assosiated with it.')}
				</Body2>}
		/>
	);
};

ProductInfoEmptyState.displayName = 'ProductInfoEmptyState';
