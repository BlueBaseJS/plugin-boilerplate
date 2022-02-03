import 'cross-fetch/polyfill';

import { BlueBaseApp, getComponent } from '@bluebase/core';
import { SidebarLayout as Sidebar, SidebarLayoutProps } from '../SidebarLayout';

import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { Text } from '@bluebase/components';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const SidebarLayout = getComponent<SidebarLayoutProps>('SidebarLayout');
const DummyContent = () => <Text>Something Main</Text>;
const DummyContentSideBar = () => <Text>Something SideBar</Text>;

describe('SidebarLayout', () => {
	it('should render sidebar content as components successfully', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<SidebarLayout
					MainContentComponent={DummyContent}
					SidebarContentComponent={DummyContentSideBar}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, SidebarLayout);

		expect(
			wrapper
				.find('DummyContentSideBar')
				.last()
				.find('Text')
				.last()
				.text()
		).toBe('Something SideBar');

		expect(
			wrapper
				.find('DummyContent')
				.last()
				.find('Text')
				.last()
				.text()
		).toBe('Something Main');
	});

	it('should render sidebar content elements successfully', async () => {
		// const Sidebar = require('../SidebarLayout');
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, BlueBasePluginMaterialUI]}>
				<Sidebar
					MainContentComponent={<DummyContent />}
					SidebarContentComponent={<DummyContentSideBar />}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Sidebar);

		expect(
			wrapper
				.find('DummyContentSideBar')
				.last()
				.find('Text')
				.last()
				.text()
		).toBe('Something SideBar');

		expect(
			wrapper
				.find('DummyContent')
				.last()
				.find('Text')
				.last()
				.text()
		).toBe('Something Main');
	});
});
