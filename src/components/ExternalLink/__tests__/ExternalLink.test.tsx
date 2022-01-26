import { StyleSheet, ViewStyle } from 'react-native';

import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { ExternalLink } from '../ExternalLink';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, Plugin];

describe('ExternalLink', () => {
	it('should render list', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<ExternalLink hoverStyle={{ backgroundColor: 'red' }} href="/">
					Link
				</ExternalLink>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ExternalLink);

		expect(
			wrapper
				.find('Text')
				.first()
				.text()
		).toBe('Link');

		let style: ViewStyle = StyleSheet.flatten(
			wrapper
				.find('Text')
				.first()
				.prop('style') as any
		);

		expect(style.backgroundColor).toBe(undefined);

		// On hover

		const onMouseEnter: any = wrapper
			.find('Text')
			.first()
			.prop('onMouseEnter');

		onMouseEnter({} as any);

		wrapper.update();

		style = StyleSheet.flatten(
			wrapper
				.find('Text')
				.first()
				.prop('style') as any
		);

		expect(style.backgroundColor).toBe('red');

		// On hover end

		const onMouseLeave: any = wrapper
			.find('Text')
			.first()
			.prop('onMouseLeave');

		onMouseLeave({} as any);

		wrapper.update();

		style = StyleSheet.flatten(
			wrapper
				.find('Text')
				.first()
				.prop('style') as any
		);

		expect(style.backgroundColor).toBe(undefined);

		wrapper.unmount();
	});
});
