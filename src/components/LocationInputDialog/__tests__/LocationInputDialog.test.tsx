import { BlueBaseApp, getComponent } from '@bluebase/core';
import JsonFormPlugin from '@bluebase/plugin-json-schema-components';
import MUIplugin from '@bluebase/plugin-material-ui';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import Plugin from '../../../index';

const LocationInputDialog = getComponent('LocationInputDialog');
/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

describe('LocationInputDialog', () => {
	test('should show a dialog', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, JsonFormPlugin]}>
				<LocationInputDialog visible />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationInputDialog);

		expect(wrapper.props().children.props.visible).toEqual(true);
		expect(wrapper.props().children.props.style).toEqual(undefined);
	});
	test('should call onSubmit prop fn when submit button is pressed', async () => {
		const onSubmit = jest.fn();
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, JsonFormPlugin]}>
				<LocationInputDialog visible onSubmit={onSubmit} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, LocationInputDialog);
		const setSubmitting = () => {};
		const buttonOnPress: any = wrapper.find('JsonForm').first().prop('schema');
		const submitButton: jest.Mock = buttonOnPress.onSubmit;
		submitButton({ latiude: 2132, longitude: 8949 }, { setSubmitting });

		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
});
