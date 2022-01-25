import { BlueBaseApp, getComponent } from '@bluebase/core';

import MUIplugin from '@bluebase/plugin-material-ui';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import { Platform } from 'react-native';
import Plugin from '../../../index';
import React from 'react';
import { Text } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';

const Permission = getComponent('Permission');

const getPermissionStatusUndetermined = () => ({ status: 'undetermined' });
const getPermissionStatusGranted = () => ({ status: 'granted' });
const getPermissionStatusDenied = () => ({ status: 'denied' });

const requestPermissionDenied = () => ({ status: 'denied' });
const requestPermissionGranted = () => ({ status: 'granted' });

const stories = storiesOf('Permission', module);

stories.add('Permission Undetermined => Granted', () => (
	<Permission
		getPermissionStatus={getPermissionStatusUndetermined}
		requestPermission={requestPermissionGranted}
	>
		<Text>Children Here!</Text>
	</Permission>
));
stories.add('Permission Undetermined => Granted in urdu', () => (
	<BlueBaseApp
		plugins={[
			Plugin,
			MaterialCommunityIcons,
			Platform.OS === 'web' ? MUIplugin : require('@bluebase/plugin-react-native-paper'),
		]}
		configs={{ locale: 'ur' }}
	>
		<Permission
			getPermissionStatus={getPermissionStatusUndetermined}
			requestPermission={requestPermissionGranted}
		>
			<Text>Children Here!</Text>
		</Permission>
	</BlueBaseApp>
));
stories.add('Permission Undetermined => Denied', () => (
	<Permission
		getPermissionStatus={getPermissionStatusUndetermined}
		requestPermission={requestPermissionDenied}
	>
		<Text>Children Here!</Text>
	</Permission>
));
stories.add('Permission Undetermined => Denied in urdu', () => (
	<BlueBaseApp
		plugins={[
			Plugin,
			MaterialCommunityIcons,
			Platform.OS === 'web' ? MUIplugin : require('@bluebase/plugin-react-native-paper'),
		]}
		configs={{ locale: 'ur' }}
	>
		<Permission
			getPermissionStatus={getPermissionStatusUndetermined}
			requestPermission={requestPermissionDenied}
		>
			<Text>Children Here!</Text>
		</Permission>
	</BlueBaseApp>
));

stories.add('Permission Granted', () => (
	<Permission getPermissionStatus={getPermissionStatusGranted}>
		<Text>Children Here!</Text>
	</Permission>
));
stories.add('Permission Granted in urdu', () => (
	<BlueBaseApp plugins={[Plugin, MaterialCommunityIcons, MUIplugin]} configs={{ locale: 'ur' }}>
		<Permission getPermissionStatus={getPermissionStatusGranted}>
			<Text>Children Here!</Text>
		</Permission>
	</BlueBaseApp>
));

stories.add('Permission Denied', () => (
	<Permission getPermissionStatus={getPermissionStatusDenied}>
		<Text>Children Here!</Text>
	</Permission>
));
stories.add('Permission Denied in urdu', () => (
	<BlueBaseApp plugins={[Plugin, MaterialCommunityIcons, MUIplugin]} configs={{ locale: 'ur' }}>
		<Permission getPermissionStatus={getPermissionStatusDenied}>
			<Text>Children Here!</Text>
		</Permission>
	</BlueBaseApp>
));

stories.add('Permission Denied (Prompt)', () => (
	<Permission getPermissionStatus={getPermissionStatusDenied} permissionDeniedAlert>
		<Text>Children Here!</Text>
	</Permission>
));
