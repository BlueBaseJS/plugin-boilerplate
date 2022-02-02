import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import { ThingDeleteMutation, ThingNodeQuery } from '../../../graphql';

import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueEastClientPluginUI from '@blueeast/client-plugin-ui';
import { DeleteSetting } from '../DeleteSetting';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import MevrisClientPluginUI from '@mevris/client-plugin-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../../index';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const plugins = [
	BlueBasePluginApollo,
	BlueBasePluginJsonSchemaComponents,
	BlueBasePluginMaterialUI,
	BlueEastClientPluginUI,
	MaterialCommunityIcons,
	MevrisClientPluginUI,
	Plugin,
];

storiesOf('DeleteSetting', module)
	.add('Basic Example', () => {
		const navigate = (component: any) => {
			if (component === 'Home') {
				return;
			}
			return;
		};

		return (
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={{ navigate } as any}>
					<MockedProvider
						mocks={[ThingDeleteMutation.success, ThingNodeQuery.success]}
						addTypename={true}
					>
						<DeleteSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);
	})
	.add('Basic Example in urdu', () => {
		const navigate = (component: any) => {
			if (component === 'Home') {
				return;
			}
			return;
		};

		return (
			<BlueBaseApp plugins={plugins} configs={{ locale: 'ur' }}>
				<NavigationContext.Provider value={{ navigate } as any}>
					<MockedProvider
						mocks={[ThingDeleteMutation.success, ThingNodeQuery.success]}
						addTypename={true}
					>
						<DeleteSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);
	})
	.add('Error in getting thing', () => {
		const navigate = () => null;

		return (
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={{ navigate } as any}>
					<MockedProvider mocks={[ThingNodeQuery.error]} addTypename={true}>
						<DeleteSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);
	})
	.add('Error in delete thing', () => {
		const navigate = () => null;

		return (
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={{ navigate } as any}>
					<MockedProvider
						mocks={[ThingDeleteMutation.error, ThingNodeQuery.success]}
						addTypename={true}
					>
						<DeleteSetting thingId="123" />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);
	});
