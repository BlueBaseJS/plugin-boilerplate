/* eslint-disable max-len */
import { BlueBaseImage, ComponentState, H5, Icon } from '@bluebase/components';
import { Theme, useStyles } from '@bluebase/core';

import { PermissionAskComponentProps } from '../Permission';
import React from 'react';

const defaultStyles = (theme: Theme): any => ({
	root: {
		justifyContent: 'center',
		padding: theme.spacing.unit * 2,
	},

	componentState: {
		root: {
			marginBottom: theme.spacing.unit,
			paddingHorizontal: theme.spacing.unit * 4,
		},
	},

	image: {
		height: 250,
		resizeMode: 'contain',
		width: 250,
	},

	button: {
		marginVertical: theme.spacing.unit,
	},
});

export const CameraPermissionAskView = (props: PermissionAskComponentProps) => {
	const { requestPermission, title, message } = props;
	const styles = useStyles('CameraPermissionAskView', props, defaultStyles);

	return (
		<ComponentState
			actionTitle="Grant Access"
			actionProps={{
				color: 'primary',
				size: 'small',
				variant: 'contained',
				style: styles.button,
			}}
			actionOnPress={requestPermission}
			image={<BlueBaseImage source="CameraPermissionAskViewImage" style={styles.image} />}
			styles={styles.componentState}
			title={
				<H5>
					<Icon name="camera" /> {title}
				</H5>
			}
			description={message}
		/>
	);
};

CameraPermissionAskView.displayName = 'CameraPermissionAskView';

CameraPermissionAskView.defaultProps = {
	title: 'Permission to access camera',
	message: 'Mevris requires camera access to scan QR odes to add devices and take pictures to update display picture of your account profile, things and places.',
};
