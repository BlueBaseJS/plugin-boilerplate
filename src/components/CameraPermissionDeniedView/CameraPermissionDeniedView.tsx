/* eslint-disable max-len */
import { BlueBaseImage, ComponentState, H5, Icon } from '@bluebase/components';
import { Theme, useStyles } from '@bluebase/core';

import { PermissionDeniedComponentProps } from '../Permission';
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
});

export const CameraPermissionDeniedView = (props: PermissionDeniedComponentProps) => {
	const { title, message } = props;
	const styles = useStyles('CameraPermissionDeniedView', props, defaultStyles);

	return (
		<ComponentState
			image={<BlueBaseImage resolve="CameraPermissionDeniedViewImage" style={styles.image} />}
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

CameraPermissionDeniedView.displayName = 'CameraPermissionDeniedView';

CameraPermissionDeniedView.defaultProps = {
	title: 'Permission denied',
	message: 'Without this permission, the app is unable to access your photo gallery to take or update pictures for your profile, things and places.',
};
