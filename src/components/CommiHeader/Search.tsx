import { Animated, ViewStyle } from 'react-native';
import { Placeholder, PlaceholderMedia } from '../../imports';
import React, { useRef, useState } from 'react';
import { Searchbar, SearchbarProps, TextInputProps, View } from '@bluebase/components';
import { Theme, useIntl, useNavigation, useStyles, useTheme } from '@bluebase/core';

import { useComponentLayout } from '@blueeast/client-plugin-ui';

export interface SearchStyles {
	root: ViewStyle;
	searchbar: ViewStyle;
	hover: ViewStyle;
	focus: ViewStyle;
}

const defaultStyles = (theme: Theme): SearchStyles => ({
	root: {
		alignItems: 'flex-end',
		flex: 1,
	},

	searchbar: {
		backgroundColor: 'rgba(0,0,0,.05)',
		...theme.elevation(0),
	},

	hover: {
		backgroundColor: 'rgba(0,0,0,.1)',
	},

	focus: {
		// backgroundColor: theme.palette.background.card,
		...theme.elevation(1),
	},
});

export interface SearchProps extends SearchbarProps {
	loading?: boolean;
	styles?: Partial<SearchStyles>;
}

export const Search = (props: SearchProps) => {
	const { style, styles: _styles, loading, ...rest } = props;

	const styles = useStyles('Search', props, defaultStyles);
	const { __ } = useIntl();
	const { navigate } = useNavigation();
	const { theme } = useTheme();

	if (loading) {
		return (
			<View style={[styles.root, style]}>
				<View style={[{ width: 250, height: 39 }]}>
					<Placeholder>
						<PlaceholderMedia style={[{ width: 250, height: 39 }]} />
					</Placeholder>
				</View>
			</View>
		);
	}

	const [value, setValue] = useState();
	const [isHovering, setHovering] = useState(false);
	const [isFocused, setFocusedState] = useState(false);
	const { layout, onLayout } = useComponentLayout();

	const width = useRef(new Animated.Value(250)).current;
	const layoutWidth = layout.width || 500;

	const color = width.interpolate({
		inputRange: [250, layoutWidth],
		outputRange: ['rgba(0,0,0,.1)', theme.palette.background.card],
	});

	const webProps: any = {
		onMouseEnter: () => setHovering(true),
		onMouseLeave: () => setHovering(false),
	};

	function onFocus() {
		Animated.timing(width, {
			duration: 250,
			toValue: layoutWidth, // or whatever value
			useNativeDriver: true
		}).start(() => setFocusedState(true));
	}

	function onBlur() {
		Animated.timing(width, {
			duration: 250,
			toValue: 250, // or whatever value
			useNativeDriver: true
		}).start(() => setFocusedState(false));
	}

	function search() {
		navigate('Search', { query: value });
	}

	const onKeyPress: TextInputProps['onKeyPress'] = e => {
		if (e.nativeEvent.key === 'Enter') {
			search();
		}
	};

	return (
		<View style={[styles.root, style]} onLayout={onLayout} testID="search-root">
			<Animated.View style={{ width }} testID="search-animated-view">
				<Searchbar
					placeholder={__('Search')}
					value={value}
					style={[
						styles.searchbar,
						isHovering && styles.hover,
						isFocused && { ...styles.focus, backgroundColor: color },
					]}
					{...webProps}
					onFocus={onFocus}
					onBlur={onBlur}
					onChangeText={setValue}
					onKeyPress={onKeyPress}
					onIconPress={search}
					{...rest}
				/>
			</Animated.View>
		</View>
	);
};

Search.defaultProps = {};

Search.displayName = 'Search';
