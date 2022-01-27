import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import { Icon, Overline, TextProps, TouchableItem, View } from '@bluebase/components';
import React, { useCallback, useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

import { Theme } from '@bluebase/core';
import { resolveComponent } from '../../helpers';

export interface CollapsibleStyles {
	root: ViewStyle;
	titleWrapper: ViewStyle;
	title: TextStyle;
	titleLineHeight: number;
}

export interface CollapsibleProps {
	title: string;
	TitleComponent?: string | React.ComponentType<TextProps>;
	open?: boolean;
	loading?: boolean;
	children?: React.ReactNode;
	onChangeState?: (value: any) => void;
	style?: ViewStyle;
	styles?: Partial<CollapsibleStyles>;
}

export const Collapsible = (props: CollapsibleProps) => {
	const {
		open: initialOpen,
		title,
		TitleComponent: titleComponent,
		onChangeState,
		loading,
		children,
		style,
		styles,
	} = props;

	const TitleComponent = resolveComponent(titleComponent!);

	const [isOpen, collapse] = useState(initialOpen);

	if (loading === true) {
		return (
			<View style={{ ...styles!.root, ...style }} testID="collapsible-skeleton">
				<Placeholder Animation={Fade}>
					<View style={{ ...styles!.titleWrapper, justifyContent: 'space-between' }}>
						<PlaceholderLine
							width={16}
							height={styles!.titleLineHeight}
							noMargin
							testID="skeleton-title"
						/>
						<PlaceholderMedia isRound={false} size={23} />
					</View>
				</Placeholder>
				{isOpen && children}
			</View>
		);
	}

	const toggle = useCallback(() => {
		collapse(!isOpen);

		if (onChangeState) {
			onChangeState(!isOpen);
		}
	}, []);

	return (
		<View style={{ ...styles!.root, ...style }}>
			<TouchableItem onPress={toggle}>
				<View style={styles!.titleWrapper}>
					<TitleComponent style={styles!.title}>{title}</TitleComponent>
					<Icon size={20} name={!isOpen ? 'chevron-down' : 'chevron-up'} />
				</View>
			</TouchableItem>
			{isOpen && children}
		</View>
	);
};

const defaultProps: Partial<CollapsibleProps> = {
	TitleComponent: Overline,
	open: true,
};

const defaultStyles = (theme: Theme): CollapsibleStyles => ({
	root: {},

	titleWrapper: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: theme.spacing.unit * 2,
		paddingVertical: theme.spacing.unit,
	},

	title: {
		flex: 1,
		fontWeight: 'bold',
	},

	titleLineHeight: theme.typography.overline.fontSize! + 2,
});

Collapsible.defaultProps = defaultProps;
Collapsible.defaultStyles = defaultStyles;
