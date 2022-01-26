import { Body2, List, ListItemProps } from '@bluebase/components';
import { Linking, TextStyle, ViewStyle } from 'react-native';
import React, { useCallback } from 'react';
import { Theme, isMobile, useStyles } from '@bluebase/core';

import { PlaceholderListItem } from '../../imports';
import { or } from '../../helpers';

export interface StoreInfoProps extends Omit<ListItemProps, 'description' | 'left'> {
	avatar?: string;
	loading?: boolean;
	url: string;
	title: string;
	styles?: Partial<StoreInfoStyles>;
}

export interface StoreInfoStyles {
	url: TextStyle;
	avatar: ViewStyle;
	container: ViewStyle;
}

const defaultStyles =(theme: Theme): StoreInfoStyles => ({
	container: {
		margin: or(isMobile(), theme.spacing.unit, 0),
		padding: or(isMobile(), 0, theme.spacing.unit * 2),
	},
	url: {
		textDecorationLine: 'underline',
	},

	avatar: {},
});

export const StoreInfo = (props: StoreInfoProps) => {
	const { avatar, loading, title, url, ...rest } = props;
	const styles= useStyles('StoreInfo', props, defaultStyles);

	if (loading === true) {
		return (<PlaceholderListItem avatar description />);
	}

	const onUrlPress = useCallback(() => Linking.openURL(url), [url]);

	return (
		<List.Item
			title={title}
			description={
				!!url && (
					<Body2 style={styles.url} testID="ClickMe" onPress={onUrlPress}>
						{url}
					</Body2>
				)
			}
			left={
				<List.Avatar
					style={styles.avatar}
					type="image"
					image={avatar ? { uri: avatar } : 'StorePlaceholder'}
				/>
			}
			{...rest}
			style={styles.container}
		/>
	);
};

StoreInfo.defaultProps = {};
StoreInfo.displayName = 'StoreInfo';
