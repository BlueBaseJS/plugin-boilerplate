import { Button, Icon, List, View } from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';
import { getComponent, isMobile, useStyles, useTheme } from '@bluebase/core';

import React from 'react';
import { SkeletonListItemProps } from '../SkeletonListItem';

const SkeletonListItem = getComponent<SkeletonListItemProps>('SkeletonListItem');

export interface ListCarouselToolbarStyles {
	toolbar: ViewStyle;
	buttonContainer: ViewStyle;
	directionalButton: ViewStyle;
	directionalIcon: TextStyle;
}

export interface ListCarouselToolbarProps {
	/**
	 * Title text for the list item.
	 */
	title: React.ReactNode;
	/**
	 * Description text for the list item.
	 */
	description?: React.ReactNode;
	/**
	 * React element to display on the left side.
	 */
	left?: React.ReactNode;
	/**
	 * React element to display on the right side.
	 */
	right?: React.ReactNode;

	loading?: boolean;

	moveBack: () => void;
	moveNext: () => void;

	styles?: Partial<ListCarouselToolbarStyles>;
}

export const ListCarouselToolbar = (props: ListCarouselToolbarProps) => {
	const { title, description, left, right, loading, moveBack, moveNext } = props;
	const { theme } = useTheme();

	if (loading) {
		return <SkeletonListItem styles={{ title: { width: '80%' } }} />;
	}

	const styles = useStyles<ListCarouselToolbarStyles>('ListCarouselToolbar', props, {
		toolbar: {
			paddingBottom: 0,
			paddingRight: theme.spacing.unit,
			paddingTop: theme.spacing.unit,
		},

		buttonContainer: {
			flexDirection: 'row',
		},

		directionalButton: {
			minWidth: theme.spacing.unit * 5,
		},

		directionalIcon: {
			color: theme.palette.primary.main,
		},
	});

	return (
		<List.Item
			title={title}
			description={description}
			left={left}
			style={styles.toolbar}
			right={
				!isMobile() ? (
					<View style={styles.buttonContainer}>
						{right}
						<Button size="small" style={styles.directionalButton} variant="text" onPress={moveBack}>
							<Icon name="chevron-left" size={22} style={styles.directionalIcon} />
						</Button>
						<Button size="small" style={styles.directionalButton} variant="text" onPress={moveNext}>
							<Icon name="chevron-right" size={22} style={styles.directionalIcon} />
						</Button>
					</View>
				) : (
					<View style={styles.buttonContainer}>{right}</View>
				)
			}
		/>
	);
};
