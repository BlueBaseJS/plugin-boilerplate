import { BlueBase, BlueBaseApp, getComponent, isMobile } from '@bluebase/core';

import BootOptions from '../../../../boot';
import React from 'react';
import { TextVariantSelectorItemProps } from '../TextVariantSelectorItem';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn(),
}));

const TextVariantSelectorItem = getComponent<TextVariantSelectorItemProps>(
	'TextVariantSelectorItem'
);

// jest.mock('react-native/Libraries/Utilities/Platform', () => {
// 	const Platform = require.requireActual('react-native/Libraries/Utilities/Platform');
// 	Platform.OS = 'android';
// 	return Platform;
// });

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

describe('TextVariantSelectorItem', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should execute onPress prop fn when TouchableItem is pressed', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<TextVariantSelectorItem
					title='Foo'
					description='A detailed description'
					index={3}
					onPress={onPress}
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, TextVariantSelectorItem);

		// expect(wrapper.find('TextVariantSelectorItem').prop('index')).toBe(3);
		expect(wrapper.find('TextVariantSelectorItem TouchableItem').length).toBeGreaterThanOrEqual(1);

		const handlePress: any = wrapper
			.find('TextVariantSelectorItem TouchableItem')
			.first()
			.prop('onPress');

		expect(handlePress).toBeTruthy();

		handlePress();

		expect(onPress).toHaveBeenCalledTimes(1);
		expect(onPress).toHaveBeenCalledWith(3);

		wrapper.unmount();
	});

	it('should not do anything of there is no onPress prop and TouchableItem is pressed', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<TextVariantSelectorItem
					title='Foo'
					description='A detailed description'
					index={3}
					onPress={null as any}
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, TextVariantSelectorItem);

		// expect(wrapper.find('TextVariantSelectorItem').prop('index')).toBe(3);
		expect(wrapper.find('TextVariantSelectorItem TouchableItem').length).toBeGreaterThanOrEqual(1);

		const handlePress: any = wrapper
			.find('TextVariantSelectorItem TouchableItem')
			.first()
			.prop('onPress');

		expect(handlePress).toBeTruthy();

		handlePress();

		expect(onPress).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});

	it('should have primary borderColor when active is true', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<TextVariantSelectorItem
					title='Foo'
					description='A detailed description'
					active
					index={1}
					onPress={onPress}
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, TextVariantSelectorItem);

		expect(
			wrapper
				.find('[testID="selector-item-root"]')
				.first()
				.prop('style')!.borderColor
		).toBe('#3f51b5');

		wrapper.unmount();
	});

	it('should have title and description', async () => {
		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<TextVariantSelectorItem
					title='Foo'
					description='A detailed description'
					index={1}
					onPress={onPress}
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, TextVariantSelectorItem);

		expect(
			wrapper
				.find('[testID="selector-item-root"] Body1')
				.last()
				.text()
		).toBe('Foo');

		expect(
			wrapper
				.find('[testID="selector-item-root"] Body2')
				.last()
				.text()
		).toBe('A detailed description');

		wrapper.unmount();
	});

	it('should have title only', async () => {
		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<TextVariantSelectorItem title='Foo' index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, TextVariantSelectorItem);

		expect(
			wrapper
				.find('[testID="selector-item-root"] Body1')
				.last()
				.text()
		).toBe('Foo');

		expect(wrapper.find('[testID="selector-item-root"] Body2')).toHaveLength(0);

		wrapper.unmount();
	});

	it('should have grey borderColor when hovering is true', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<TextVariantSelectorItem
					title='Foo'
					description='A detailed description'
					hovering
					index={1}
					onPress={onPress}
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, TextVariantSelectorItem);

		expect(
			wrapper
				.find('[testID="selector-item-root"]')
				.first()
				.prop('style')!.borderColor
		).toBe('#aaa');

		wrapper.unmount();
	});

	it('should use a touchable item on native', async () => {
		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<TextVariantSelectorItem
					title='Foo'
					description='A detailed description'
					index={1}
					onPress={onPress}
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, TextVariantSelectorItem);

		// expect(wrapper.find('TextVariantSelectorItem').prop('index')).toBe(1);
		expect(wrapper.find('TextVariantSelectorItem TouchableItem').length).toBeGreaterThanOrEqual(1);
		expect(wrapper.find('TextVariantSelectorItem button').length).toBe(0);

		wrapper.unmount();
	});
});
