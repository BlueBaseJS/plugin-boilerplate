import {
	BlueBaseImageBackground,
	BlueBaseImageBackgroundProps,
	Body1,
	Body2,
	View,
} from '@bluebase/components';
import { Media, MediaType } from '../Media';
import { Placeholder, PlaceholderBody1, PlaceholderBody2 } from '../../imports';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, isMobile, useStyles } from '@bluebase/core';

import React from 'react';

export interface FeatureItemStyles {
	root: ViewStyle;
	media: ViewStyle;
	content: ViewStyle;
	title: ViewStyle;
	titleText: TextStyle;
	description: ViewStyle;
	descriptionText: TextStyle;
}

export interface FeatureItemType {
	title?: string;
	description?: string;
	media?: MediaType;
	background?: BlueBaseImageBackgroundProps;
	backgroundDesktop?: BlueBaseImageBackgroundProps;
}

export interface FeatureItemProps extends FeatureItemType {
	loading?: boolean;
	style?: ViewStyle;
	styles?: Partial<FeatureItemStyles>;
}

const defaultStyles = (theme: Theme): FeatureItemStyles => ({
	root: {
		flexDirection: isMobile() ? 'column' : 'row',
		padding: theme.spacing.unit * 2,
	},

	media: {
		alignItems: 'center',
		padding: theme.spacing.unit * 2,
	},

	content: {
		flex: 1,
		padding: theme.spacing.unit * 2,
	},

	title: {
		paddingBottom: theme.spacing.unit,
	},

	titleText: {
		fontWeight: 'bold',
	},

	description: {},
	descriptionText: {},
});

export const FeatureItem = (props: FeatureItemProps) => {
	const { title, description, media, loading, style, background, backgroundDesktop } = props;
	const styles = useStyles('FeatureItem', props, defaultStyles);

	if (loading) {
		return (
			<Placeholder>
				<View style={[styles.root, style]} testID="feature-item-root">
					<View style={styles.media} testID="feature-item-media-container">
						<Media height={150} width={200} loading {...media} />
					</View>

					<View style={styles.content} testID="feature-item-content-container">
						<View style={styles.title} testID="feature-item-title-container">
							<PlaceholderBody1 width={30} />
						</View>
						<View style={styles.description} testID="feature-item-description-container">
							<PlaceholderBody2 width={95} />
							<PlaceholderBody2 width={100} />
							<PlaceholderBody2 width={30} />
						</View>
					</View>
				</View>
			</Placeholder>
		);
	}

	const Wrapper = (wrapperProps: any) => {
		if (!isMobile() && backgroundDesktop) {
			return <BlueBaseImageBackground {...backgroundDesktop} {...wrapperProps} />;
		}

		if (background) {
			return <BlueBaseImageBackground {...background} {...wrapperProps} />;
		}

		return <View {...wrapperProps} />;
	};

	return (
		<Wrapper style={[styles.root, style]} testID="feature-item-root">
			<View style={styles.media} testID="feature-item-media-container">
				{media ? <Media height={200} width={200} {...media} /> : null}
			</View>

			<View style={styles.content} testID="feature-item-content-container">
				{title ? (
					<View style={styles.title} testID="feature-item-title-container">
						<Body1 style={styles.titleText} testID="feature-item-title">
							{title}
						</Body1>
					</View>
				) : null}
				{description ? (
					<View style={styles.description} testID="feature-item-description-container">
						<Body2 style={styles.descriptionText} testID="feature-item-description">
							{description}
						</Body2>
					</View>
				) : null}
			</View>
		</Wrapper>
	);
};

FeatureItem.defaultProps = {
	loading: false,
};

FeatureItem.displayName = 'FeatureItem';
