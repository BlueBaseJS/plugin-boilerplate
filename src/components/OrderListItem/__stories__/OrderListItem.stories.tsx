import { BlueBaseApp, getComponent } from '@bluebase/core';

import BlueeastClientPluginUi from '@blueeast/client-plugin-ui';
import MUIplugin from '@bluebase/plugin-material-ui';
import { OrderListItemProps } from '../OrderListItem';
import Plugin from '../../../index';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const NaviationActions = ({ children }: any) => children({ push: () => {} });
const OrderListItem = getComponent<OrderListItemProps>('OrderListItem');

const stories = storiesOf('OrderListItem', module);
stories

	.add('OrderListItem without any prop', () => (
		<BlueBaseApp
			plugins={[BlueeastClientPluginUi, Plugin, MUIplugin]}
			components={{ NaviationActions }}
		>
			<OrderListItem />
		</BlueBaseApp>
	))
	.add('Loading State', () => (
		<BlueBaseApp
			plugins={[BlueeastClientPluginUi, Plugin, MUIplugin]}
			components={{ NaviationActions }}
		>
			<OrderListItem loading />
		</BlueBaseApp>
	))
	.add('OrderListItem with full props', () => (
		<BlueBaseApp
			plugins={[BlueeastClientPluginUi, Plugin, MUIplugin]}
			components={{ NaviationActions }}
		>
			<OrderListItem
				id="123"
				brand={{ name: 'Orient' }}
				name="Ultron Super"
				link
				placeholder="https://placeimg.com/400/400/any"
				avatar={{ uri: 'https://placeimg.com/400/400/any' }}
			/>
		</BlueBaseApp>
	))
	.add('OrderListItem without product Id ', () => (
		<BlueBaseApp
			plugins={[BlueeastClientPluginUi, Plugin, MUIplugin]}
			components={{ NaviationActions }}
		>
			<OrderListItem
				brand={{ name: 'Orient' }}
				name="Ultron Super"
				avatar={{ uri: 'https://placeimg.com/400/400/any' }}
			/>
		</BlueBaseApp>
	))
	.add('OrderListItem without brand name ', () => (
		<BlueBaseApp
			plugins={[BlueeastClientPluginUi, Plugin, MUIplugin]}
			components={{ NaviationActions }}
		>
			<OrderListItem
				id="123"
				name="Ultron Super"
				avatar={{ uri: 'https://placeimg.com/400/400/any' }}
			/>
		</BlueBaseApp>
	))
	.add('OrderListItem without name ', () => (
		<BlueBaseApp
			plugins={[BlueeastClientPluginUi, Plugin, MUIplugin]}
			components={{ NaviationActions }}
		>
			<OrderListItem
				id="123"
				brand={{ name: 'Orient' }}
				avatar={{ uri: 'https://placeimg.com/400/400/any' }}
			/>
		</BlueBaseApp>
	))
	.add('OrderListItem without product avatar ', () => (
		<BlueBaseApp
			plugins={[BlueeastClientPluginUi, Plugin, MUIplugin]}
			components={{ NaviationActions }}
		>
			<OrderListItem id="123" brand={{ name: 'Orient' }} name="Ultron Super" />
		</BlueBaseApp>
	));
