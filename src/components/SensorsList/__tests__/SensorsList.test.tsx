import 'cross-fetch/polyfill';

import { BlueBaseApp, isMobile } from '@bluebase/core';
import { EmptyState, Noop } from '@bluebase/components';

import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import MevrisPluginUI from '@mevris/client-plugin-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../..';
import React from 'react';
import { SensorsList } from '../SensorsList';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBasePluginApollo, MevrisPluginUI, Plugin];

describe('SensorsList', () => {
	it('should render MevrisUIView', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);
		const wrapper = mount(
			<MockedProvider>
				<BlueBaseApp
					configs={{
						'plugin.apollo.httpLinkOptions': {
							uri: 'https://api-qa.mevris.io/graphql',
						},
					}}
					plugins={plugins}
					components={{ MevrisUIView: Noop }}
				>
					<SensorsList id="123" />
				</BlueBaseApp>
			</MockedProvider>
		);

		await waitForElement(wrapper, 'MevrisUIView');

		// expect(wrapper.find('FlatList')).toMatchSnapshot();

		expect(wrapper.find('MevrisUIView').first().prop('ui')).toBe('SensorsList');

		expect(wrapper.find('MevrisUIView').first().prop('EmptyComponent')).toBe(EmptyState);
	});

	it('should not have an empty state on desktop', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const wrapper = mount(
			<MockedProvider>
				<BlueBaseApp
					configs={{
						'plugin.apollo.httpLinkOptions': {
							uri: 'https://api-qa.mevris.io/graphql',
						},
					}}
					plugins={plugins}
					components={{ MevrisUIView: Noop }}
				>
					<SensorsList id="123" />
				</BlueBaseApp>
			</MockedProvider>
		);

		await waitForElement(wrapper, 'MevrisUIView');

		// expect(wrapper.find('FlatList')).toMatchSnapshot();

		expect(wrapper.find('MevrisUIView').first().prop('EmptyComponent')).toBe(Noop);
	});
});
