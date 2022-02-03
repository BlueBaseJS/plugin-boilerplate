import { BlueBaseApp, getComponent } from '@bluebase/core';

import Plugin from '../../../index';
import React from 'react';
import { Text } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';

const Widget = getComponent('Widget');
const Content = () => <Text>Content</Text>;
const Childern = () => <Text>Childern</Text>;
const styles = {
	content: {
		alignItems: 'center',
	},
	root: {
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
	},
};

storiesOf('Widget', module)
	.add('Basic Example if child given', () => (
		<BlueBaseApp plugins={[Plugin]}>
			<Widget title="Widget">
				<Childern />
			</Widget>
		</BlueBaseApp>
	))
	.add('Basic Example using content prop', () => (
		<BlueBaseApp plugins={[Plugin]}>
			<Widget title="Widget" content={Content} />
		</BlueBaseApp>
	))
	.add('with some styles', () => (
		<BlueBaseApp plugins={[Plugin]}>
			<Widget title="Widget" content={Content} styles={styles} />
		</BlueBaseApp>
	));
