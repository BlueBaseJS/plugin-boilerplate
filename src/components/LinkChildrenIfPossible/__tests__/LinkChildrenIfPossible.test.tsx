import { BlueBase, BlueBaseApp } from '@bluebase/core';

import BootOptions from '../../../../boot';
import { Link } from '@bluebase/components';
import { LinkChildrenIfPossible } from '../LinkChildrenIfPossible';
import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// const Noop = () => {
// 	return;
// };

// const NavigationActions = ({ children }: any) => children({ navigation: Noop });

const BBWrapper = ({ children }: any) => (
	<BlueBaseApp
		{...BootOptions}
		filters={{
			'bluebase.boot.end': async (_b: any, _c: any, BB: BlueBase) => {
				// await BB.Components.register('NavigationActions', NavigationActions);
				await BB.Components.register('Link', ({ children: c }: any) => c);
			},
		}}
	>
		{children}
	</BlueBaseApp>
);

describe('LinkChildrenIfPossible', () => {
	it('should not render the Link component', async () => {
		const wrapper = mount(
			<BBWrapper>
				<LinkChildrenIfPossible>
					<Text testID="test">Hello</Text>
				</LinkChildrenIfPossible>
			</BBWrapper>
		);

		await waitForElement(wrapper, 'Text[testID="test"]');

		expect(
			wrapper
				.find('Text[testID="test"]')
				.last()
				.text()
		).toBe('Hello');

		expect(wrapper.find('Link')).toHaveLength(0);
	});

	it('should render the Link component if path prop is given', async () => {
		const wrapper = mount(
			<BBWrapper>
				<LinkChildrenIfPossible path="/foo">
					<Text testID="test">Hello</Text>
				</LinkChildrenIfPossible>
			</BBWrapper>
		);

		await waitForElement(wrapper, 'Text[testID="test"]');

		expect(
			wrapper
				.find('Text[testID="test"]')
				.last()
				.text()
		).toBe('Hello');

		expect(wrapper.find(Link)).toHaveLength(1);
	});

	it('should render the Link component if routeName prop is given', async () => {
		const wrapper = mount(
			<BBWrapper>
				<LinkChildrenIfPossible routeName="/foo">
					<Text testID="test">Hello</Text>
				</LinkChildrenIfPossible>
			</BBWrapper>
		);

		await waitForElement(wrapper, 'Text[testID="test"]');

		expect(
			wrapper
				.find('Text[testID="test"]')
				.last()
				.text()
		).toBe('Hello');

		expect(wrapper.find(Link)).toHaveLength(1);
	});

	it('should render the Link component if onPress prop is given', async () => {
		const wrapper = mount(
			<BBWrapper>
				<LinkChildrenIfPossible onPress={() => null}>
					<Text testID="test">Hello</Text>
				</LinkChildrenIfPossible>
			</BBWrapper>
		);

		await waitForElement(wrapper, 'Text[testID="test"]');

		expect(
			wrapper
				.find('Text[testID="test"]')
				.last()
				.text()
		).toBe('Hello');

		expect(wrapper.find(Link)).toHaveLength(1);
	});
});
