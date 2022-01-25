import { BlueBaseApp, getComponent } from '@bluebase/core';

import MUIplugin from '@bluebase/plugin-material-ui';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import Plugin from '../../../index';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const CameraPermissionDeniedView = getComponent('CameraPermissionDeniedView');
const stories = storiesOf('CameraPermissionDeniedView', module);

stories
	.add('Denied View', () => <CameraPermissionDeniedView />)
	.add('Denied View in urdu', () => (

		<BlueBaseApp plugins={[Plugin, MUIplugin, MaterialCommunityIcons]} configs={{ locale: 'ur' }}>
			<CameraPermissionDeniedView />
		</BlueBaseApp>
	)
	)
	.add('Denied View with customestyles', () => (
		<CameraPermissionDeniedView
			styles={{
				root: {
					justifyContent: 'center',
					padding: 30,
				},

				componentState: {
					root: {
						marginBottom: 10,
						paddingHorizontal: 10,
					},
					title: {
						color: 'red',
					},
				},
				image: {
					height: 250,
					resizeMode: 'contain',
					width: 250,
				},
			}}
		/>
	));
