import { BlueBaseApp, getComponent } from '@bluebase/core';

// import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import MUIplugin from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
// import SkeletonLoaderPlugin from '@bluebase/plugin-skeleton-loader';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// jest.mock('expo', () => jest.fn());
// jest.mock('NativeAnimatedHelper');

const SkeletonCard = getComponent('SkeletonCard');

describe('SkeletonCard', () => {
	// it('should show Placeholder receiving props', async () => {
	// 	const wrapper = mount(
	// 		<BlueBaseApp plugins={[Plugin, MUIplugin]}>
	// 			<SkeletonCard />
	// 		</BlueBaseApp>
	// 	);
	// 	await waitForElement(wrapper, SkeletonCard);
	// 	// expect(wrapper).toMatchSnapshot();

	// 	expect(wrapper.find('Placeholder').prop('isReady')).toBe(false);
	// 	expect(wrapper.find('Placeholder').prop('animation')).toEqual('fade');

	// 	wrapper.unmount();
	// });

	it('should receive default width 190', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]}>
				<SkeletonCard />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, SkeletonCard);

		const style: any = wrapper
			.find('Card')
			.first()
			.prop('style');
		expect(style.width).toBe(190);

		wrapper.unmount();
	});
});
