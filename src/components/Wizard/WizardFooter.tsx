import { useStyles, useTheme } from '@bluebase/core';

import React from 'react';
import { View } from '@bluebase/components';
import { ViewStyle } from 'react-native';

export interface WizardFooterStyles {
	footer: ViewStyle;
	footerItem: ViewStyle;
}

export interface WizardFooterProps {
	left?: React.ReactNode;
	right?: React.ReactNode;
	styles?: Partial<WizardFooterStyles>;
}

export const WizardFooter = (props: WizardFooterProps) => {
	const { theme } = useTheme();
	const styles = useStyles<WizardFooterStyles>('WizardFooter', props, {
		footer: {
			backgroundColor: theme.palette.background.card,
			borderTopColor: theme.palette.divider,
			borderTopWidth: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			padding: theme.spacing.unit / 2,
		},

		footerItem: {
			margin: theme.spacing.unit / 2,
		},
	});

	return (
		<View style={styles.footer}>
			<View style={styles!.footerItem}>{props.left}</View>
			<View style={styles!.footerItem}>{props.right}</View>
		</View>
	);
};

export default WizardFooter;
