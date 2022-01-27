import { PaginationDot } from './PaginationDot';
import React from 'react';
import { View } from '@bluebase/components';
import { ViewStyle } from 'react-native';

export interface PaginationProps {
	dots: number;
	index: number;
	onChangeIndex: (index: number) => void;
	small?: boolean;
	style?: ViewStyle;
}

export const Pagination = ({ index, dots, small, onChangeIndex, style }: PaginationProps) => {
	const children = [];

	for (let i = 0; i < dots; i += 1) {
		children.push(
			<PaginationDot key={i} index={i} active={i === index} small={small} onPress={onChangeIndex} />
		);
	}

	return (
		<View
			style={{
				backgroundColor: 'rgba(0, 0 , 0, .15)',
				borderRadius: 16,
				flexDirection: 'row',
				padding: 4,
				...style,
			}}
		>
			{children}
		</View>
	);
};
