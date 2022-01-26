import { BlueBaseApp, NavigationContext } from '@bluebase/core';

import BlueBaseMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import Plugin from '../../..';
import { Popper } from '../lib';
import React from 'react';
import { UserMenu } from '../UserMenu';
// import mockMuiPopper from '@material-ui/core/Popper';
import { mount } from 'enzyme';
import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

// jest.mock('../lib', () => {
// 	const MuiPopper = jest.requireActual('@material-ui/core/Popper').default;
// 	return {
// 		Popper: MuiPopper,
// 	};
// });

// jest.mock('react-native/Libraries/Utilities/Platform', () => {
// 	const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
// 	Platform.OS = 'web';
// 	return Platform;
// });

const plugins = [BlueBaseRnPlaceholder, BlueBaseMaterialUI, Plugin];

describe('UserMenu', () => {
	it('should show login button', async () => {
		const navigate = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={{ navigate } as any}>
					<UserMenu />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, UserMenu);

		expect(wrapper.find('Button[title="Login"]').exists()).toBe(true);

		const onPress: any = wrapper
			.find('Button[title="Login"]')
			.first()
			.prop('onPress');

		onPress();
		expect(navigate).toHaveBeenCalledTimes(1);
		expect(navigate).toHaveBeenCalledWith('Login');

		wrapper.unmount();
	});

	it('should show avatar without image', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<UserMenu loggedIn />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, UserMenu);

		expect(wrapper.find('Avatar').exists()).toBe(true);
		expect(
			wrapper
				.find('Avatar')
				.first()
				.prop('type')
		).toBe('icon');
		expect(
			wrapper
				.find('Avatar')
				.first()
				.prop('icon')
		).toBe('account');

		wrapper.unmount();
	});

	it('should show avatar with image', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<UserMenu
					loggedIn
					name="Abdul Rehman"
					email="rehman@blueeast.com"
					avatar="https://placeimg.com/100/100/people"
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, UserMenu);

		expect(wrapper.find('Avatar').exists()).toBe(true);
		expect(
			wrapper
				.find('Avatar')
				.first()
				.prop('type')
		).toBe('image');
		expect(
			wrapper
				.find('Avatar')
				.first()
				.prop('image')
		).toMatchObject({ uri: 'https://placeimg.com/100/100/people' });

		wrapper.unmount();
	});

	it('should show dropdown on hover', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<UserMenu
					loggedIn
					name="Abdul Rehman"
					email="rehman@blueeast.com"
					avatar="https://placeimg.com/100/100/people"
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, UserMenu);

		const onMouseEnter: any = wrapper
			.find('[testID="user-avatar-root"]')
			.first()
			.prop('onMouseEnter');
		const onMouseLeave: any = wrapper
			.find('[testID="user-avatar-root"]')
			.first()
			.prop('onMouseLeave');

		expect(wrapper.find(Popper).prop('open')).toBe(false);

		onMouseEnter({ currentTarget: { event: 'onMouseEnter' } });
		await wait(500);
		wrapper.update();

		expect(wrapper.find(Popper).prop('open')).toBe(true);

		onMouseLeave({ currentTarget: { event: 'onMouseLeave' } });
		await wait(500);
		wrapper.update();

		// expect(wrapper.find(Popper).prop('open')).toBe(false);

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<UserMenu loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, UserMenu);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
