import { BlueBaseApp, getComponent } from '@bluebase/core';

import Plugin from '../../..';
import React from 'react';
import { StepperProps } from '..';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [
	Plugin,
	// tslint:disable-next-line:no-var-requires
	require('@bluebase/plugin-material-ui'),
];

const Stepper = getComponent<StepperProps>('Stepper');

describe('Stepper', () => {
	it('should render input value as is', async () => {
		const onChangeValue = jest.fn();
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Stepper value={5} onChangeValue={onChangeValue} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Stepper');

		expect(
			wrapper
				.find('Stepper')
				.last()
				.prop('value')
		).toBe(5);
	});

	it('should test increament and decrement functionalities', async () => {
		const onChangeValue = jest.fn();
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Stepper value={1} onChangeValue={onChangeValue} error={true} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Stepper');
		const onPressPlus: any = wrapper
			.find('[testID="increment-button"]')
			.first()
			.prop('onPress');
		onPressPlus();
		wrapper.update();
		expect(onChangeValue).toBeCalled();
		expect(onChangeValue).toBeCalledWith(2);

		expect(
			wrapper
				.find('TextInput')
				.last()
				.prop('value')
		).toBe('2');
		expect(
			wrapper
				.find('Stepper')
				.last()
				.instance().state
		).toMatchObject({ initialValue: 1, value: 2 });

		const onPressMinus: any = wrapper
			.find('[testID="decrement-button"]')
			.first()
			.prop('onPress');
		onPressMinus();
		wrapper.update();

		expect(
			wrapper
				.find('TextInput')
				.last()
				.prop('value')
		).toBe('1');
		expect(
			wrapper
				.find('Stepper')
				.last()
				.instance().state
		).toMatchObject({ initialValue: 1, value: 1 });
	});

	it('should test disabled functionalities', async () => {
		const onChangeValue = jest.fn();
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Stepper value={1} disabled onChangeValue={onChangeValue} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Stepper');

		expect(
			wrapper
				.find('[testID="increment-button"]')
				.last()
				.prop('onPress')
		).toBeUndefined();

		expect(
			wrapper
				.find('[testID="increment-button"]')
				.first()
				.prop('disabled')
		).toBeTruthy();

		expect(
			wrapper
				.find('[testID="decrement-button"]')
				.last()
				.prop('onPress')
		).toBeUndefined();

		expect(
			wrapper
				.find('[testID="decrement-button"]')
				.first()
				.prop('disabled')
		).toBeTruthy();

		expect(
			wrapper
				.find('TextInput')
				.first()
				.prop('editable')
		).toBe(false);
	});

	it('should show error state', async () => {
		const onChangeValue = jest.fn();
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Stepper value={14} error helperText="An Error Occurred!" onChangeValue={onChangeValue} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Stepper');

		expect(
			wrapper
				.find('Stepper Body2')
				.last()
				.prop('style')!.color
		).toBe('#f44336');

		expect(
			wrapper
				.find('Stepper Body2 Text')
				.last()
				.text()
		).toBe('An Error Occurred!');
	});

	describe('getValueString', () => {
		it('should return state value as a string', async () => {
			const onChangeValue = jest.fn();
			const wrapper = mount(
				<BlueBaseApp plugins={plugins}>
					<Stepper value={5} onChangeValue={onChangeValue} error={true} />
				</BlueBaseApp>
			);

			await waitForElement(wrapper, 'Stepper');

			const ins: any = wrapper
				.find('Stepper')
				.last()
				.instance();

			expect(ins.getValueString()).toBe('5');
		});

		it('should return "" if state value is null', async () => {
			const onChangeValue = jest.fn();
			const wrapper = mount(
				<BlueBaseApp plugins={plugins}>
					<Stepper value={5} onChangeValue={onChangeValue} error={true} />
				</BlueBaseApp>
			);

			await waitForElement(wrapper, 'Stepper');

			const ins: any = wrapper
				.find('Stepper')
				.last()
				.instance();

			ins.state.value = null;

			expect(ins.getValueString()).toBe('');
		});
	});

	describe('setValue', () => {
		it('should setValue at 10 if input is 10', async () => {
			const onChangeValue = jest.fn();
			const wrapper = mount(
				<BlueBaseApp plugins={plugins}>
					<Stepper value={5} onChangeValue={onChangeValue} error={true} />
				</BlueBaseApp>
			);

			await waitForElement(wrapper, 'Stepper');

			const ins: any = wrapper
				.find('Stepper')
				.last()
				.instance();

			ins.setValue(10);

			expect(onChangeValue).toHaveBeenCalledTimes(1);
			expect(onChangeValue).toHaveBeenCalledWith(10);
		});

		it('should setValue to null if input is ""', async () => {
			const onChangeValue = jest.fn();
			const wrapper = mount(
				<BlueBaseApp plugins={plugins}>
					<Stepper value={5} onChangeValue={onChangeValue} error={true} />
				</BlueBaseApp>
			);

			await waitForElement(wrapper, 'Stepper');

			const ins: any = wrapper
				.find('Stepper')
				.last()
				.instance();

			ins.setValue('');

			expect(onChangeValue).toHaveBeenCalledTimes(1);
			expect(onChangeValue).toHaveBeenCalledWith(null);
		});

		it('should not call onChangeValue when none is available', async () => {
			const onChangeValue = jest.fn();
			const wrapper = mount(
				<BlueBaseApp plugins={plugins}>
					<Stepper value={5} onChangeValue={undefined as any} error={true} />
				</BlueBaseApp>
			);

			await waitForElement(wrapper, 'Stepper');

			const ins: any = wrapper
				.find('Stepper')
				.last()
				.instance();

			ins.setValue(10);

			expect(onChangeValue).toHaveBeenCalledTimes(0);
		});
		it('should check loading state to render', async () => {
			const wrapper = mount(
				<BlueBaseApp plugins={plugins}>
					<Stepper value={5} onChangeValue={undefined as any} loading />
				</BlueBaseApp>
			);

			await waitForElement(wrapper, 'Stepper');

			expect(wrapper.find('Fade').exists()).toBe(true);
			wrapper.unmount();
		});
	});

	describe('getDerivedStateFromProps', () => {
		it('should setValue at 10 if input is 10', async () => {
			const StepperClass = require('../Stepper').Stepper;
			const getDerivedStateFromProps = StepperClass.getDerivedStateFromProps;

			expect(getDerivedStateFromProps({ value: 5 }, { initialValue: 10, value: 2 })).toMatchObject({
				initialValue: 5,
				value: 5,
			});
		});
	});
});
