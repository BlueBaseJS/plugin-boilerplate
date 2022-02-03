const mockGetDimensions = jest.fn().mockReturnValue({
	height: 1200,
	width: 1300,
});
jest.mock('expo', () => ({}));
jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
	const DimensionsActual = (require as any).requireActual(
		'react-native/Libraries/Utilities/Dimensions'
	);
	return class extends DimensionsActual {
		static get: jest.Mock = mockGetDimensions;
	};
});

import { ActionSheetDesktop } from '../ActionSheetDesktop';
import { BlueBaseApp } from '@bluebase/core';
import MUIplugin from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// jest.mock('NativeAnimatedHelper');

describe('ActionSheetDesktop', () => {
	it('should show title', async () => {
		const options = ['Cancel', 'Apple', 'Watermelon', 'Watermelon'];

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]} testID="actionSheetTestID">
				<ActionSheetDesktop
					title="Which one do you like ?"
					options={options}
					cancelButtonIndex={0}
					destructiveButtonIndex={1}
					message="Description goes here..."
					tintColor={'green'}
					callback={jest.fn()}
					visible
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ActionSheetDesktop);

		expect(wrapper.find('H6').last().text()).toBe('Which one do you like ?');
	});

	it('should not show title', async () => {
		const options = ['Cancel', 'Apple', 'Watermelon', 'Watermelon'];

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]} testID="actionSheetTestID">
				<ActionSheetDesktop
					options={options}
					cancelButtonIndex={0}
					destructiveButtonIndex={1}
					message="Description goes here..."
					tintColor={'green'}
					callback={jest.fn()}
					visible
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ActionSheetDesktop);

		expect(wrapper.find('H6').exists()).toBe(false);
	});

	it('should show message', async () => {
		const options = ['Cancel', 'Apple', 'Watermelon', 'Watermelon'];

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]} testID="actionSheetTestID">
				<ActionSheetDesktop
					title="Which one do you like ?"
					options={options}
					cancelButtonIndex={0}
					destructiveButtonIndex={1}
					message="Description goes here..."
					tintColor={'green'}
					callback={jest.fn()}
					visible
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ActionSheetDesktop);

		expect(wrapper.find('Body2').last().text()).toBe('Description goes here...');
	});
	it('should not show message', async () => {
		const options = ['Cancel', 'Apple', 'Watermelon', 'Watermelon'];

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]} testID="actionSheetTestID">
				<ActionSheetDesktop
					options={options}
					cancelButtonIndex={0}
					destructiveButtonIndex={1}
					tintColor={'green'}
					callback={jest.fn()}
					visible
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ActionSheetDesktop);

		expect(wrapper.find('Body2').exists()).toBe(false);
	});

	it('should show dividers', async () => {
		const options = ['Cancel', 'Apple', 'Watermelon', 'Watermelon'];

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin]} testID="actionSheetTestID">
				<ActionSheetDesktop
					options={options}
					cancelButtonIndex={0}
					destructiveButtonIndex={1}
					tintColor={'green'}
					showSeparators
					callback={jest.fn()}
					visible
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ActionSheetDesktop);

		expect(wrapper.find('Divider').exists()).toBe(true);
	});
});
