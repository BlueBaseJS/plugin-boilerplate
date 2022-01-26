import { BlueBase, BlueBaseApp, isMobile } from '@bluebase/core';

import BootOptions from '../../../../bluebase/storybook/bluebase';
import { PaginationDot } from '../PaginationDot';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn(),
}));

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

describe('PaginationDot', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should not have onPress callback on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<PaginationDot index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, PaginationDot);

		expect(wrapper.find('PaginationDotComponent').prop('index')).toBe(1);
		expect(wrapper.find('PaginationDotComponent TouchableItem').length).toBeGreaterThanOrEqual(1);
		expect(
			wrapper
				.find('PaginationDotComponent TouchableItem')
				.first()
				.prop('onPress')
		).toBeUndefined();

		wrapper.unmount();
	});

	it('should have onPress callback on desktop', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<PaginationDot index={3} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, PaginationDot);

		expect(wrapper.find('PaginationDotComponent').prop('index')).toBe(3);
		expect(wrapper.find('PaginationDotComponent TouchableItem').length).toBeGreaterThanOrEqual(1);

		const onPressProp: any = wrapper
			.find('PaginationDotComponent TouchableItem')
			.first()
			.prop('onPress');

		expect(onPressProp).toBeTruthy();

		onPressProp();

		expect(onPress).toHaveBeenCalledTimes(1);
		expect(onPress).toHaveBeenCalledWith(3);

		wrapper.unmount();
	});

	it('should be normal size', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<PaginationDot index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, PaginationDot);

		expect(wrapper.find('PaginationDotComponent').prop('index')).toBe(1);
		expect(wrapper.find('PaginationDotComponent TouchableItem').length).toBeGreaterThanOrEqual(1);
		expect(
			wrapper
				.find('[testID="dot"]')
				.first()
				.prop('style')!.width
		).toBe(12);

		wrapper.unmount();
	});

	it('should be small size', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<PaginationDot small index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, PaginationDot);

		expect(wrapper.find('PaginationDotComponent').prop('index')).toBe(1);
		expect(wrapper.find('PaginationDotComponent TouchableItem').length).toBeGreaterThanOrEqual(1);
		expect(
			wrapper
				.find('[testID="dot"]')
				.first()
				.prop('style')!.width
		).toBe(8);

		wrapper.unmount();
	});

	it('should not be active', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<PaginationDot index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, PaginationDot);

		expect(wrapper.find('PaginationDotComponent').prop('index')).toBe(1);
		expect(wrapper.find('PaginationDotComponent TouchableItem').length).toBeGreaterThanOrEqual(1);
		expect(
			wrapper
				.find('[testID="dot"]')
				.first()
				.prop('style')!.backgroundColor
		).toBe('rgba(255, 255, 255, 0.15)');

		wrapper.unmount();
	});

	it('should be active', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<PaginationDot active index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, PaginationDot);

		expect(wrapper.find('PaginationDotComponent').prop('index')).toBe(1);
		expect(wrapper.find('PaginationDotComponent TouchableItem').length).toBeGreaterThanOrEqual(1);
		expect(
			wrapper
				.find('[testID="dot"]')
				.first()
				.prop('style')!.backgroundColor
		).toBe('rgba(255, 255, 255 , 1)');

		wrapper.unmount();
	});

	it('should use a touchable item on native', async () => {
		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<PaginationDot index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, PaginationDot);

		expect(wrapper.find('PaginationDotComponent').prop('index')).toBe(1);
		expect(wrapper.find('PaginationDotComponent TouchableItem').length).toBeGreaterThanOrEqual(1);
		expect(wrapper.find('PaginationDotComponent button').length).toBe(0);

		wrapper.unmount();
	});

	it('should use a button item on web', async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
			Platform.OS = 'web';
			return Platform;
		});

		const onPress = jest.fn();

		const wrapper = mount(
			<BBWrapper>
				<PaginationDot index={1} onPress={onPress} />
			</BBWrapper>
		);

		await waitForElement(wrapper, PaginationDot);

		expect(wrapper.find('PaginationDotComponent').prop('index')).toBe(1);
		expect(wrapper.find('PaginationDotComponent TouchableItem').length).toBe(0);
		expect(wrapper.find('PaginationDotComponent button').length).toBeGreaterThanOrEqual(1);

		// jest.mock('react-native/Libraries/Utilities/Platform', () => {
		// 	const Platform = require.requireActual('react-native/Libraries/Utilities/Platform');
		// 	Platform.OS = 'ios';
		// 	return Platform;
		// });

		jest.resetAllMocks();
		wrapper.unmount();
	});
});
