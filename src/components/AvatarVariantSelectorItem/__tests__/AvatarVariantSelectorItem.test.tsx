import { BlueBase, BlueBaseApp, getComponent, isMobile } from '@bluebase/core';

import { AvatarVariantSelectorItemProps } from '../AvatarVariantSelectorItem';
import BootOptions from '../../../../bluebase/storybook/bluebase';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn(),
}));

const AvatarVariantSelectorItem = getComponent<AvatarVariantSelectorItemProps>(
	'AvatarVariantSelectorItem'
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

describe('AvatarVariantSelectorItem', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should execute onPress prop fn when TouchableItem is pressed', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem index={3} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		// expect(wrapper.find('AvatarVariantSelectorItem').prop('index')).toBe(3);
		expect(wrapper.find('AvatarVariantSelectorItem TouchableItem').length).toBeGreaterThanOrEqual(
			1
		);

		const handlePress: any = wrapper
			.find('AvatarVariantSelectorItem TouchableItem')
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
				<AvatarVariantSelectorItem index={3} onPress={null as any} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		// expect(wrapper.find('AvatarVariantSelectorItem').prop('index')).toBe(3);
		expect(wrapper.find('AvatarVariantSelectorItem TouchableItem').length).toBeGreaterThanOrEqual(
			1
		);

		const handlePress: any = wrapper
			.find('AvatarVariantSelectorItem TouchableItem')
			.first()
			.prop('onPress');

		expect(handlePress).toBeTruthy();

		handlePress();

		expect(onPress).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});

	it('should be medium size if no size is given', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		expect(
			wrapper
				.find('AvatarVariantSelectorItem Avatar')
				.last()
				.prop('size')
		).toBe(36);

		wrapper.unmount();
	});

	it('should be small size', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem size="small" index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		expect(
			wrapper
				.find('AvatarVariantSelectorItem Avatar')
				.first()
				.prop('size')
		).toBe(16);

		wrapper.unmount();
	});

	it('should be normal size', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem size="medium" index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		expect(
			wrapper
				.find('AvatarVariantSelectorItem Avatar')
				.first()
				.prop('size')
		).toBe(36);

		wrapper.unmount();
	});

	it('should be large size', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem size="large" index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		expect(
			wrapper
				.find('AvatarVariantSelectorItem Avatar')
				.first()
				.prop('size')
		).toBe(48);

		wrapper.unmount();
	});

	it('should have primary borderColor when active is true', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem active index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		expect(
			wrapper
				.find('[testID="selector-item-root"]')
				.first()
				.prop('style')!.borderColor
		).toBe('#3f51b5');

		wrapper.unmount();
	});

	it('should have transparent borderColor when active is false', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		expect(
			wrapper
				.find('[testID="selector-item-root"]')
				.first()
				.prop('style')!.borderColor
		).toBe('transparent');

		wrapper.unmount();
	});

	it('should have grey borderColor when hovering is true', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem hovering index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		expect(
			wrapper
				.find('[testID="selector-item-root"]')
				.first()
				.prop('style')!.borderColor
		).toBe('#aaa');

		wrapper.unmount();
	});

	it('should be have transparent borderColor when hovering is false', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		expect(
			wrapper
				.find('[testID="selector-item-root"]')
				.first()
				.prop('style')!.borderColor
		).toBe('transparent');

		wrapper.unmount();
	});

	it('should use a touchable item on native', async () => {
		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<AvatarVariantSelectorItem index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, AvatarVariantSelectorItem);

		// expect(wrapper.find('AvatarVariantSelectorItem').prop('index')).toBe(1);
		expect(wrapper.find('AvatarVariantSelectorItem TouchableItem').length).toBeGreaterThanOrEqual(
			1
		);
		expect(wrapper.find('AvatarVariantSelectorItem button').length).toBe(0);

		wrapper.unmount();
	});
});
