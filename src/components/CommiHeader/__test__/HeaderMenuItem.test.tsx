import { BlueBaseApp } from '@bluebase/core';
import BlueBaseMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { HeaderMenuItem } from '../HeaderMenuItem';
import Plugin from '../../..';
import { Popper } from '../lib';
import React from 'react';
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

const data = {
	href: '/',
	title: 'Outwear',

	items: [
		{
			href: '/',
			items: [],
			title: 'Tops & T-Shirts',
		},
		{
			href: '/',
			items: [],
			title: 'Kurtas',
		},
		{
			href: '/',
			items: [],
			title: 'Shalwar Kameez',
		},
		{
			href: '/',
			items: [],
			title: 'Pret Wear',
		},
		{
			href: '/',
			items: [],
			title: 'Bridal',
		},
	],
};

const plugins = [BlueBaseRnPlaceholder, BlueBaseMaterialUI, Plugin];

describe('HeaderMenuItem', () => {
	it('should show menu item with simple dropdown menu', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<HeaderMenuItem {...data} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, HeaderMenuItem);

		expect(
			wrapper
				.find('[testID="header-menu-item-title"]')
				.last()
				.text()
		).toBe('Outwear');
		expect(wrapper.find('HeaderMenuSubList').exists()).toBe(true);

		const onMouseEnter: any = wrapper
			.find('[testID="header-menu-item-root"]')
			.first()
			.prop('onMouseEnter');

		const onMouseLeave: any = wrapper
			.find('[testID="header-menu-item-root"]')
			.first()
			.prop('onMouseLeave');

		expect(wrapper.find(Popper).prop('open')).toBe(false);
		expect(wrapper.find('[testID="header-menu-item-hover-bar"]').exists()).toBe(false);

		onMouseEnter({ currentTarget: { event: 'onMouseEnter' } });
		await wait(500);
		wrapper.update();

		expect(wrapper.find(Popper).prop('open')).toBe(true);
		expect(wrapper.find('[testID="header-menu-item-hover-bar"]').exists()).toBe(true);

		onMouseLeave({ currentTarget: { event: 'onMouseLeave' } });
		await wait(500);
		wrapper.update();

		// expect(wrapper.find(Popper).prop('open')).toBe(false);
		// expect(wrapper.find('[testID="header-menu-item-hover-bar"]').exists()).toBe(false);

		wrapper.unmount();
	});

	it('should show menu item with mega menu', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<HeaderMenuItem items={[data]} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, HeaderMenuItem);

		expect(wrapper.find('MegaMenu').exists()).toBe(true);

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<HeaderMenuItem loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, HeaderMenuItem);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
