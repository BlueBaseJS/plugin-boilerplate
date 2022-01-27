import { SafeAreaView, ScrollView, View } from '@bluebase/components';
import { StyleProp, ViewStyle } from 'react-native';

import React from 'react';
import { Theme } from '@bluebase/core';

export interface SidebarLayoutStyles {
	root: StyleProp<ViewStyle>;
	sidebar: StyleProp<ViewStyle>;
	sidebarContent: StyleProp<ViewStyle>;
	main: StyleProp<ViewStyle>;
	mainContent: StyleProp<ViewStyle>;
}

export interface SidebarLayoutProps {
	MainContentComponent: React.ComponentType<any> | React.ReactElement;
	SidebarContentComponent: React.ComponentType<any> | React.ReactElement;
	styles?: Partial<SidebarLayoutStyles>;
}

function render(El: React.ComponentType<any> | React.ReactElement) {
	return React.isValidElement(El) ? El : <El />;
}

export const SidebarLayout = ({
	SidebarContentComponent,
	MainContentComponent,
	styles = {} as any,
}: SidebarLayoutProps) => (
	<View style={styles.root}>
		{/* Sidebar */}
		<View style={styles.sidebar}>
			<ScrollView>
				<SafeAreaView>
					<View style={styles.sidebarContent}>{render(SidebarContentComponent)}</View>
				</SafeAreaView>
			</ScrollView>
		</View>

		{/* Main Area */}
		<View style={styles.main}>
			<ScrollView contentContainerStyle={styles.main}>
				<SafeAreaView style={styles.main}>
					<View style={styles.mainContent}>{render(MainContentComponent)}</View>
				</SafeAreaView>
			</ScrollView>
		</View>
	</View>
);

SidebarLayout.defaultStyles = (theme: Theme): SidebarLayoutStyles => ({
	root: {
		flex: 1,
		flexDirection: 'row',
	},

	sidebar: {
		backgroundColor: theme.palette.background.card,
		borderRightColor: theme.palette.divider,
		borderRightWidth: 1,
		width: 275,
	},

	sidebarContent: {
		padding: theme.spacing.unit * 2,
	},

	main: {
		flex: 1,
	},

	mainContent: {
		flex: 1,
		padding: theme.spacing.unit * 2,
	},
});
