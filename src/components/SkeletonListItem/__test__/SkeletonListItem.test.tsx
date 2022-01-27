import { BlueBaseApp, getComponent } from '@bluebase/core';
import { Placeholder, PlaceholderMedia } from 'rn-placeholder';

import MUIplugin from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { SkeletonListItemProps } from '../SkeletonListItem';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// jest.mock('expo', () => jest.fn());
// jest.mock('NativeAnimatedHelper');

const SkeletonListItem = getComponent<SkeletonListItemProps>('SkeletonListItem');

describe('SkeletonListItem', () => {
	it('should show Media component', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem avatar={true} variant="circle" />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, Placeholder);

		// expect(wrapper).toMatchSnapshot();
		// const view = wrapper.find('Placeholder View[testID="avatar-view"]').last();
		expect(wrapper.find(PlaceholderMedia)).toBeDefined();

		wrapper.unmount();
	});

	it('should show description', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem description={true} avatar={false} />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, SkeletonListItem);

		expect(wrapper.find('[testID="skeleton-avatar"]')).toHaveLength(0);
		expect(wrapper.find('[testID="skeleton-description"]')).toHaveLength(1);

		wrapper.unmount();
	});
	it('should show rounded avatar', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem description={true} avatar={true} variant="rounded" />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, SkeletonListItem);

		expect(wrapper.find('[testID="skeleton-avatar"]')).toHaveLength(1);
		expect(wrapper.find('[testID="skeleton-description"]')).toHaveLength(1);

		wrapper.unmount();
	});
	it('should show square avatar', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem description={true} avatar={true} variant="square" />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, SkeletonListItem);

		expect(wrapper.find('[testID="skeleton-avatar"]')).toHaveLength(1);
		expect(wrapper.find('[testID="skeleton-description"]')).toHaveLength(1);

		wrapper.unmount();
	});
	it('should show icon avatar mobile', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem description={true} avatar={true} variant="icon" />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, SkeletonListItem);

		expect(wrapper.find('[testID="skeleton-avatar"]')).toHaveLength(1);
		expect(wrapper.find('[testID="skeleton-description"]')).toHaveLength(1);

		wrapper.unmount();
	});
	it('should show square avatar web', async () => {

		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			return {
				// ...jest.requireActual('react-native/Libraries/Utilities/Platform'),
				OS: 'web',
				Version: 13.2,
			};
		});
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem description={true} avatar={true} variant="square" />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, SkeletonListItem);

		expect(wrapper.find('[testID="skeleton-avatar"]')).toHaveLength(1);
		expect(wrapper.find('[testID="skeleton-description"]')).toHaveLength(1);

		wrapper.unmount();
	});
	it('should show icon avatar web', async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			return {
				// ...jest.requireActual('react-native/Libraries/Utilities/Platform'),
				OS: 'web',
				Version: 13.2,
			};
		});
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonListItem description={true} avatar={true} variant="icon" />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, SkeletonListItem);

		expect(wrapper.find('[testID="skeleton-avatar"]')).toHaveLength(1);
		expect(wrapper.find('[testID="skeleton-description"]')).toHaveLength(1);

		wrapper.unmount();
	});
});
