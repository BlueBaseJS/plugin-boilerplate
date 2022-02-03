import {
	ActivityIndicator,
	BlueBaseImageProps,
	Body2,
	List,
	ListItemProps,
} from '@bluebase/components';
import { TextStyle, ViewStyle } from 'react-native';
import { Theme, applyStyles } from '@bluebase/core';

import React from 'react';

export interface ProfilePictureStyles {
	/** Root container styles */
	root: ViewStyle;

	/** error state style */
	error: TextStyle;
}

export interface AvatarSettingViewProps {
	onPress?: () => void;

	error?: Error;

	title?: string;
	description?: string;

	source?: BlueBaseImageProps['source'];
	placeholder?: BlueBaseImageProps['source'];

	loading?: boolean;

	testID?: string;

	/** styles */
	style?: ListItemProps['style'];
	styles?: Partial<ProfilePictureStyles>;
}

export interface AvatarSettingViewState {}

class AvatarSettingViewComponent extends React.PureComponent<
	AvatarSettingViewProps,
	AvatarSettingViewState
> {
	static defaultProps: Partial<AvatarSettingViewProps> = {
		// description: 'Image file should be of max 1MB',
		placeholder: 'PersonPlaceholder',
		title: 'Display Picture',
	};
	state: AvatarSettingViewState = {};
	static defaultStyles: any = (theme: Theme): ProfilePictureStyles => ({
		root: {
			alignItems: 'center',
			flexDirection: 'row',
			// paddingLeft: theme.spacing.unit,
		},

		error: {
			color: theme.palette.error.main,
			marginTop: theme.spacing.unit / 2,
		},
	});

	/**
	 * These are default styles given to ProfilePicture
	 * if no styles are given then these will apply.
	 */

	render() {
		const { description, error, onPress, title, styles, style, loading, ...thumb } = this.props;

		return (
			<List.Item
				title={title}
				description={
					!error ? (
						description
					) : (
						<Body2 testID="avatar-setting-view-error" style={styles!.error}>
							{error.message}
						</Body2>
					)
				}
				left={
					<List.Avatar
						type="image"
						variant="rounded"
						image={thumb.source ? thumb.source : thumb.placeholder}
						{...thumb}
					/>
				}
				right={loading && <ActivityIndicator />}
				disabled={loading}
				onPress={onPress}
				style={{ ...styles!.root, ...style }}
			/>
		);
	}
}

export const AvatarSettingView: React.ComponentType<AvatarSettingViewProps> = applyStyles({
	name: 'AvatarSettingView',
})(AvatarSettingViewComponent as any);
