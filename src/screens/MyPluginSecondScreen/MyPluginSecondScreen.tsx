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

export interface MyPluginSecondScreenStyles {
	root: ViewStyle;
	avatar: ViewStyle;
}

export const MyPluginSecondScreen = () => {
	const { push, navigate } = useNavigation();
	const { theme } = useTheme();

	const styles: MyPluginSecondScreenStyles = useStyles('MyPluginHomeScreen', {}, {
		root: {
			padding: theme.spacing.unit * 2
		},
		avatar: {
			backgroundColor: theme.palette.warning.main
		}
	});

	const goToFirst = useCallback(() => {
		push('MyPluginHome');
	}, [push]);

	const goToHome = useCallback(() => {
		navigate('Home');
	}, [navigate]);

	return (
		<Container style={styles.root}>
			<Card>
				<List.Item
					left={
						<List.Avatar
							type="icon"
							icon="file"
							style={styles.avatar}
						/>
					}
					title="Second page!"
					description="Noting to here, move along..."
				/>
				<Divider />
				<CardActions>
					<Button
						title="First Screen"
						size="small"
						variant="outlined"
						icon={{ type: 'icon', name: 'arrow-left' }}
						onPress={goToFirst}
					/>
					<Button
						title="Home Screen"
						size="small"
						variant="outlined"
						icon={{ type: 'icon', name: 'home' }}
						onPress={goToHome}
					/>
				</CardActions>
			</Card>
		</Container>
	);
};

MyPluginSecondScreen.displayName = 'MyPluginSecondScreen';
