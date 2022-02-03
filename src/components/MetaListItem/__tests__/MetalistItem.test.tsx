import { BlueBaseApp, getComponent } from '@bluebase/core';

import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MetaListItemProps } from '..';
import { Placeholder } from '../../imports';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

const MetaListItem = getComponent<MetaListItemProps>('MetaListItem');

describe('MetalistItem', () => {
	it('should return metalistItem title', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<MetaListItem title="Foo" description="Bar" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MetaListItem);

		expect(
			wrapper
				.find('View Body1[testID="title_id"] Text[testID="title_id"]')
				.last()
				.text()
		).toBe('Foo');
		expect(
			wrapper
				.find('View Body1[testID="description_id"] Text[testID="description_id"]')
				.last()
				.text()
		).toBe('Bar');
	});

	it('should render placeholders when loading is true', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<MetaListItem title="Foo" description="Bar" loading divider />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MetaListItem);

		expect(wrapper.find(Placeholder).exists()).toBe(true);
	});

	it('should not throw exception, even when BlueBase styles are not injected', async () => {
		const MetaListItemComponent = require('../MetaListItem').MetaListItem;

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<MetaListItemComponent title="Foo" description="Bar" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MetaListItemComponent);

		expect(
			wrapper
				.find('View Body1[testID="title_id"] Text[testID="title_id"]')
				.last()
				.text()
		).toBe('Foo');
		expect(
			wrapper
				.find('View Body1[testID="description_id"] Text[testID="description_id"]')
				.last()
				.text()
		).toBe('Bar');
	});

	it('should style metalistItem green', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<MetaListItem
					title="Foo"
					description="Bar"
					styles={{
						title: {
							backgroundColor: 'red',
						},
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MetaListItem);
		const body1: any = wrapper
			.find('View Body1[testID="title_id"] Text[testID="title_id"]')
			.last()
			.prop('style');
		expect(body1[1].backgroundColor).toBe('red');
	});

	test('should style metalistItem yellow', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<MetaListItem
					title="Foo"
					description="Bar"
					divider={true}
					style={{ backgroundColor: 'yellow' }}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, MetaListItem);

		const view: any = wrapper
			.find('View[testID="view_id"]')
			.last()
			.prop('style');

		expect(view[2].backgroundColor).toBe('yellow');
	});
});
