import { BlueBaseApp, getComponent } from '@bluebase/core';

import Plugin from '../../../index';
import React from 'react';
import { SidebarLayoutProps } from '../SidebarLayout';
import { Text } from '@bluebase/components';
import bootOptions from '../../../../boot';
import storiesOf from '@bluebase/storybook-addon';

const SidebarLayout = getComponent<SidebarLayoutProps>('SidebarLayout');

const DummyContent = () => <Text>SideBar</Text>;
const DummyContentMain = () => <Text>Main Component</Text>;

storiesOf('SidebarLayout', module).add('Basic Example', () => (
	<BlueBaseApp {...bootOptions} plugins={[Plugin]}>
		<SidebarLayout SidebarContentComponent={DummyContent} MainContentComponent={DummyContentMain} />
	</BlueBaseApp>
));
