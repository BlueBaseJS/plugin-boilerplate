import {
	Button,
	Card,
	CardActions,
	Container,
	Divider,
	List
} from '@bluebase/components';
import { useNavigation, useStyles, useTheme } from '@bluebase/core';
import React, { useCallback } from 'react';
import { ViewStyle } from 'react-native';

export interface MyPluginHomeScreenStyles {
	root: ViewStyle;
	avatar: ViewStyle;
}

export const MyPluginHomeScreen = () => {
	const { push } = useNavigation();
	const { theme } = useTheme();

	const styles: MyPluginHomeScreenStyles = useStyles('MyPluginHomeScreen', {}, {
		root: {
			padding: theme.spacing.unit * 2
		},
		avatar: {
			backgroundColor: theme.palette.success.main
		}
	});

	const goToSecond = useCallback(() => {
		push('MyPluginSecond');
	}, [push]);

	return (
		<Container style={styles.root}>
			<Card>
				<List.Item
					left={
						<List.Avatar
							type="icon"
							icon="rocket"
							style={styles.avatar}
						/>
					}
					title="Hello, World!"
					// eslint-disable-next-line max-len
					description="This is a boilerplate of a typical BlueBase project. This repo can be used to publish as app, or a BlueBase plugin to be used in another BlueBase project."
				/>
				<Divider />
				<CardActions>
					<Button title="Go to Second Screen" size="small" variant="outlined" onPress={goToSecond} />
				</CardActions>
			</Card>
		</Container>
	);
};

MyPluginHomeScreen.displayName = 'MyPluginHomeScreen';
