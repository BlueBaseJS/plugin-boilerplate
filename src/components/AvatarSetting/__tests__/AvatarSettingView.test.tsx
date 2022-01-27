import 'cross-fetch/polyfill';

import { AvatarSettingView } from '../AvatarSettingView';
import BBPluginApollo from '@bluebase/plugin-apollo';
import { BlueBaseApp } from '@bluebase/core';
import { List } from '@bluebase/components';
import MUIPlugin from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('AvatarSettingView', () => {
	it('should be render and display List.Avatar', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIPlugin, BBPluginApollo]}>
				<AvatarSettingView source={{ uri: 'path' }} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, AvatarSettingView);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find(List.Avatar)
				.last()
				.prop('image')
		).toMatchObject({ uri: 'path' });

		wrapper.unmount();
	});

	it('should be render and display List.Avatar with placeholder', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIPlugin, BBPluginApollo]}>
				<AvatarSettingView />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, AvatarSettingView);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find(List.Avatar)
				.last()
				.prop('image')
		).toBe('PersonPlaceholder');

		wrapper.unmount();
	});

	// it('should send List.Avatar hovering false, when isHovering is true but onPress is undefined', async () => {
	// 	const HoverObserver = ({ children }: any) => children({ isHovering: true });

	// 	const wrapper = mount(
	// 		<BlueBaseApp
	// 			plugins={[Plugin, MUIPlugin, BBPluginApollo]}
	// 			filters={{
	// 				'bluebase.boot.end': (_bo: any, _ctx: any, BB: BlueBase) => {
	// 					BB.Components.register('HoverObserver', HoverObserver);
	// 				},
	// 			}}
	// 		>
	// 			<AvatarSettingView source="PersonPlaceholder" />
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, AvatarSettingView);

	// 	// expect(wrapper).toMatchSnapshot();
	// 	expect(
	// 		wrapper
	// 			.find(List.Avatar)
	// 			.last()
	// 			.prop('source')
	// 	).toBe('PersonPlaceholder');

	// 	wrapper.unmount();
	// });

	// it('should send List.Avatar hovering false, when isHovering is true and onPress is not undefined', async () => {
	// 	const HoverObserver = ({ children }: any) => children({ isHovering: true });

	// 	const wrapper = mount(
	// 		<BlueBaseApp
	// 			plugins={[Plugin, MUIPlugin, BBPluginApollo]}
	// 			filters={{
	// 				'bluebase.boot.end': (_bo: any, _ctx: any, BB: BlueBase) => {
	// 					BB.Components.register('HoverObserver', HoverObserver);
	// 				},
	// 			}}
	// 		>
	// 			<AvatarSettingView source="PersonPlaceholder" onPress={jest.fn()} />
	// 		</BlueBaseApp>
	// 	);

	// 	await waitForElement(wrapper, AvatarSettingView);

	// 	// expect(wrapper).toMatchSnapshot();
	// 	expect(
	// 		wrapper
	// 			.find(List.Avatar)
	// 			.last()
	// 			.prop('source')
	// 	).toBe('PersonPlaceholder');
	// 	expect(
	// 		wrapper
	// 			.find(List.Avatar)
	// 			.last()
	// 			.prop('hovering')
	// 	).toBe(true);

	// 	wrapper.unmount();
	// });

	it('should show description', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIPlugin, BBPluginApollo]}>
				<AvatarSettingView source="PersonPlaceholder" description="hello" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, AvatarSettingView);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('ListItem')
				.first()
				.prop('description')
		).toBe('hello');

		wrapper.unmount();
	});

	it('should not show description', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIPlugin, BBPluginApollo]}>
				<AvatarSettingView source="PersonPlaceholder" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, AvatarSettingView);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('[testID="avatar-setting-view-description"]')).toHaveLength(0);

		wrapper.unmount();
	});

	it('should show error', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIPlugin, BBPluginApollo]}>
				<AvatarSettingView source="PersonPlaceholder" error={Error('hello')} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, AvatarSettingView);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('[testID="avatar-setting-view-error"]')
				.last()
				.text()
		).toBe('hello');

		wrapper.unmount();
	});

	it('should add new line if there is error and description', async () => {

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIPlugin, BBPluginApollo]}>
				<AvatarSettingView source="PersonPlaceholder" error={Error('hello')} description={'abc'} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, AvatarSettingView);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('[testID="avatar-setting-view-error"]')
				.last()
				.text()
		).toBe('hello');

		wrapper.unmount();
	});

	it('should not show error', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIPlugin, BBPluginApollo]}>
				<AvatarSettingView source="PersonPlaceholder" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, AvatarSettingView);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('[testID="avatar-setting-view-error"]')).toHaveLength(0);

		wrapper.unmount();
	});
});
