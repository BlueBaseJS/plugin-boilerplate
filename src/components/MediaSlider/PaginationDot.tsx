import { Platform, ViewStyle } from 'react-native';
import { Theme, applyStyles, isMobile } from '@bluebase/core';
import { TouchableItem, View } from '@bluebase/components';

import React from 'react';

export interface PaginationDotStyles {
	normal: {
		root: ViewStyle;
		dot: ViewStyle;
		active: ViewStyle;
	};

	small: {
		root: ViewStyle;
		dot: ViewStyle;
		active: ViewStyle;
	};
}

export interface PaginationDotProps {
	active?: boolean;
	index: number;
	small?: boolean;
	onPress: (index: number) => void;
	styles?: Partial<PaginationDotStyles>;
}

class PaginationDotComponent extends React.Component<PaginationDotProps> {
	static defaultProps: Partial<PaginationDotProps> = {
		active: false,
		small: false,
	};

	static defaultStyles: any = (theme: Theme): PaginationDotStyles => ({
		normal: {
			root: {
				borderWidth: 0,
				padding: theme.spacing.unit / 4,
			},

			dot: {
				backgroundColor: 'rgba(255, 255, 255, 0.15)',
				borderRadius: theme.spacing.unit * 2,
				height: theme.spacing.unit * 1.5,
				width: theme.spacing.unit * 1.5,
			},

			active: {
				backgroundColor: 'rgba(255, 255, 255 , 1)',
			},
		},

		small: {
			root: {
				borderWidth: 0,
				padding: theme.spacing.unit / 4,
			},

			dot: {
				backgroundColor: 'rgba(255, 255, 255, 0.15)',
				borderRadius: theme.spacing.unit * 2,
				height: theme.spacing.unit * 1,
				width: theme.spacing.unit * 1,
			},

			active: {
				backgroundColor: 'rgba(255, 255, 255 , 1)',
			},
		},
	});

	handlePress: any = () => {
		this.props.onPress(this.props.index);
	};

	render() {
		const { active, small } = this.props;

		const styles = small ? this.props.styles!.small! : this.props.styles!.normal!;
		const styleDot = { ...styles.dot, ...(active ? styles.active : {}) };
		const onPress = isMobile() ? undefined : this.handlePress;

		return Platform.OS === 'web' ? (
			<button
				type="button"
				style={{ ...styles.root, cursor: 'pointer', background: 'none' } as any}
				onClick={onPress}
			>
				<div style={styleDot as any} />
			</button>
		) : (
			<TouchableItem style={styles.root} onPress={onPress}>
				<View style={styleDot} testID="dot" />
			</TouchableItem>
		);
	}
}

export const PaginationDot: React.ComponentType<PaginationDotProps> = applyStyles({
	name: 'PaginationDot',
})(PaginationDotComponent as any);
