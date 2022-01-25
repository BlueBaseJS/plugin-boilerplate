import { BlueBaseApp, getComponent } from '@bluebase/core';

import MUIplugin from '@bluebase/plugin-material-ui';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import { Platform } from 'react-native';
import Plugin from '../../../index';
import React from 'react';
import { Text } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';

const CameraPermission = getComponent('CameraPermission');
const stories = storiesOf('CameraPermission', module);

stories
	.add('Full Flow', () => (
		<CameraPermission>
			<Text>children</Text>
		</CameraPermission>
	))
	.add('Full Flow in urdu', () => (
		<BlueBaseApp
			plugins={[
				Plugin,
				Platform.OS === 'web' ? MUIplugin : require('@bluebase/plugin-react-native-paper'),
				MaterialCommunityIcons,
			]}
			configs={{ locale: 'ur' }}
		>
			<CameraPermission>
				<Text>children</Text>
			</CameraPermission>
		</BlueBaseApp>
	));
