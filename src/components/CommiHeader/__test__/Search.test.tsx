import { BlueBaseApp, NavigationContext } from '@bluebase/core';

import BlueBaseMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import Plugin from '../../..';
import React from 'react';
import { Search } from '../Search';
import { StyleSheet } from 'react-native';
import { mount } from 'enzyme';
import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, BlueBaseMaterialUI, Plugin];

describe('Search', () => {
	it('should show search field', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Search />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Search);

		// Should change color
		const onMouseEnter: any = wrapper
			.find('Searchbar')
			.first()
			.prop('onMouseEnter');
		const onMouseLeave: any = wrapper
			.find('Searchbar')
			.first()
			.prop('onMouseLeave');

		expect(
			(StyleSheet.flatten(
				wrapper
					.find('Searchbar')
					.first()
					.prop('style') as any
			) as any).backgroundColor
		).toBe('rgba(0,0,0,.05)');

		onMouseEnter({ currentTarget: { event: 'onMouseEnter' } });
		wrapper.update();

		expect(
			(StyleSheet.flatten(
				wrapper
					.find('Searchbar')
					.first()
					.prop('style') as any
			) as any).backgroundColor
		).toBe('rgba(0,0,0,.1)');

		onMouseLeave({ currentTarget: { event: 'onMouseLeave' } });
		wrapper.update();

		expect(
			(StyleSheet.flatten(
				wrapper
					.find('Searchbar')
					.first()
					.prop('style') as any
			) as any).backgroundColor
		).toBe('rgba(0,0,0,.05)');

		wrapper.unmount();
	});

	it('should change width on focus', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Search />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Search);

		// Should change color
		const onFocus: any = wrapper
			.find('Searchbar')
			.first()
			.prop('onFocus');
		const onBlur: any = wrapper
			.find('Searchbar')
			.first()
			.prop('onBlur');

		expect(
			(wrapper
				.find('[testID="search-animated-view"]')
				.first()
				.prop('style') as any).width._value
		).toBe(250);

		onFocus();
		await wait(500);
		wrapper.update();

		expect(
			(wrapper
				.find('[testID="search-animated-view"]')
				.first()
				.prop('style') as any).width._value
		).toBe(500);

		onBlur();
		await wait(500);
		wrapper.update();

		expect(
			(wrapper
				.find('[testID="search-animated-view"]')
				.first()
				.prop('style') as any).width._value
		).toBe(250);

		wrapper.unmount();
	});

	it('should navigate to search when enter is pressed', async () => {
		const navigate = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={{ navigate } as any}>
					<Search />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Search);

		expect(wrapper.find('Searchbar').exists()).toBe(true);

		const onChangeText: any = wrapper
			.find('Searchbar')
			.first()
			.prop('onChangeText');

		onChangeText('foo');

		wrapper.update();

		const onKeyPress: any = wrapper
			.find('Searchbar')
			.first()
			.prop('onKeyPress');

		onKeyPress({ nativeEvent: { key: 'Enter' } });

		expect(navigate).toHaveBeenCalledTimes(1);
		expect(navigate).toHaveBeenCalledWith('Search', { query: 'foo' });

		wrapper.unmount();
	});

	it('should not do anything when any other key is pressed', async () => {
		const navigate = jest.fn();

		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<NavigationContext.Provider value={{ navigate } as any}>
					<Search />
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Search);

		expect(wrapper.find('Searchbar').exists()).toBe(true);

		const onKeyPress: any = wrapper
			.find('Searchbar')
			.first()
			.prop('onKeyPress');

		onKeyPress({ nativeEvent: { key: 'a' } });

		expect(navigate).toHaveBeenCalledTimes(0);

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Search loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Search);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
