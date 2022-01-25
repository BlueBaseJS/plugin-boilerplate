/* eslint-disable max-len */
import { BlueBaseApp, getComponent } from '@bluebase/core';

import { CameraPermissionAskView } from '../CameraPermissionAskView';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import { Platform } from 'react-native';
import Plugin from '../../../index';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const stories = storiesOf('CameraPermissionAskView', module);

function requestPermissionFn(){
	return {};
}

stories
	.add('Ask Permission View', function() { return ( <CameraPermissionAskView requestPermissionFn={requestPermissionFn} />);} )
	.add('Ask Permission View in urdu', () => (
		<BlueBaseApp
			plugins={[
				Plugin,
				Platform.OS === 'web' ? MUIplugin : require('@bluebase/plugin-react-native-paper'),
				MaterialCommunityIcons,
			]}
			configs={{ locale: 'ur' }}
		>
			<CameraPermissionAskView requestPermissionFn={requestPermissionFn} />
		</BlueBaseApp>
	))
	.add('Ask Permission View customestyles', () => (
		<CameraPermissionAskView
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
				},

				image: {
					height: 250,
					resizeMode: 'contain',
					width: 250,
				},

				button: {
					backgroundColor: 'red',
					marginVertical: 30,
				},
			}}
			requestPermissionFn={requestPermissionFn}
		/>
	));
