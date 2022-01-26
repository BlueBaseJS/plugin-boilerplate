import { BlueBaseApp } from '@bluebase/core';
import BootOptions from '../../../../boot';
import React from 'react';
import { Text } from 'react-native';
import { VariantSelectorItemProps } from '../VariantSelector';
import { getItemComponent } from '../getItemComponent';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// const Noop = () => {
// 	return;
// };

// const NavigationActions = ({ children }: any) => children({ navigation: Noop });

describe('VariantSelector', () => {
	describe('getItemComponent', () => {
		it('should return an input as is if it is a Component', async () => {
			const Test = () => null;
			Test.displayName = 'Test';

			const Component = getItemComponent(Test);

			expect(Component.displayName).toBe('Test');
		});

		it('should return a bluebase component if input is a string', async () => {
			const Test = ({ index }: VariantSelectorItemProps) => (
				<Text testID="tester">Tester {index}</Text>
			);

			const Component = getItemComponent('Test');

			const wrapper = mount(
				<BlueBaseApp {...BootOptions} components={{ Test }}>
					<Component index={2} />
				</BlueBaseApp>
			);

			await waitForElement(wrapper, Test);

			expect(wrapper.find(Test).text()).toBe('Tester 2');

			wrapper.unmount();
		});

		it('should return a predefined component if input is a known string', async () => {
			const Component = getItemComponent('avatar');

			const wrapper = mount(
				<BlueBaseApp {...BootOptions}>
					<Component index={2} />
				</BlueBaseApp>
			);

			await waitForElement(wrapper, 'AvatarVariantSelectorItem_Noop');

			expect(wrapper.find('AvatarVariantSelectorItem_Noop').length).toBeGreaterThan(0);

			wrapper.unmount();
		});
	});
});
