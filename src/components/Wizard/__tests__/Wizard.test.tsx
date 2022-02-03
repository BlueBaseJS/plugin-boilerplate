import { BlueBaseApp, getComponent } from '@bluebase/core';
import { Card, Divider, List, View } from '@bluebase/components';
import React, { useCallback } from 'react';

import { Button } from 'react-native';
import Mui from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import WizardFooter from '../WizardFooter';
import { WizardStepProps } from '../Wizard';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const Wizard = getComponent('Wizard');

const StepData = (props: WizardStepProps) => {
	const nodes = Object.keys(props.data).map((k) => (
		<React.Fragment key={k}>
			<Divider />
			<List.Item title={k} description={props.data[k]} />
		</React.Fragment>
	));

	if (nodes.length === 0) {
		return (
			<Card>
				<List.Subheader>Wizard has no data yet.</List.Subheader>
			</Card>
		);
	}
	return (
		<Card>
			<List.Subheader>Wizard Data</List.Subheader>
			{nodes}
		</Card>
	);
};

const Step1 = (props: WizardStepProps) => {
	const next = useCallback(() => {
		props.setData({ step1Result: 'foo' } as any);
		props.goForward('step-2');
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<List.Item title="Step 1" description="a description sentence" />
			<Divider />
			<View style={{ flex: 1, padding: 16 }}>
				<StepData {...props} />
			</View>
			<WizardFooter right={<Button title="Next" onPress={next} />} />
		</View>
	);
};

const Step2 = (props: WizardStepProps) => {
	const back = useCallback(() => {
		props.setData({ step1Result: 'foo' } as any);
		props.goBack('step-1');
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<List.Item title="Step 2" description="a description sentence" />
			<Divider />
			<View style={{ flex: 1, padding: 16 }}>
				<StepData {...props} />
			</View>
			<WizardFooter left={<Button title="Back" onPress={back} />} />
		</View>
	);
};

describe('Wizard', () => {
	it('Should render wizard successfully', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, Mui]}>
				<Wizard steps={{ 'step-1': Step1, 'step-2': Step2 }} initialStep="step-1" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Wizard);
		expect(wrapper.find('Wizard').last().prop('initialStep')).toEqual('step-1');

		const goForward: any = wrapper.find('Step1').first().prop('goForward');
		const goBack: any = wrapper.find('Step1').first().prop('goBack');
		const setData: any = wrapper.find('Step1').first().prop('setData');

		setData({ key: 'Hello' });
		wrapper.update();

		const data: any = wrapper.find('Step1').first().prop('data');
		expect(data).toMatchObject({ key: 'Hello' });

		goForward('step-2');
		wrapper.update();
		expect(wrapper.find('Step2').first().exists()).toBe(true);

		goBack('step-1');
		wrapper.update();
		expect(wrapper.find('Step1').first().exists()).toBe(true);
	});

	it('Should render wizard successfully', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, Mui]}>
				<Wizard steps={{ 'step-1': Step1 }} initialStep="step-1" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Wizard);
		expect(wrapper.find('Wizard').last().prop('initialStep')).toEqual('step-1');

		const goForward: any = wrapper.find('Step1').first().prop('goForward');

		goForward('step-2');
		wrapper.update();
		expect(wrapper.find('Step2').exists());
	});

	it('Should not go back to step1 if step1 is not defined', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, Mui]}>
				<Wizard steps={{ 'step-2': Step2 }} initialStep="step-2" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Wizard);

		const goBack: any = wrapper.find('Step2').first().prop('goBack');
		goBack('step-1');

		wrapper.update();
		expect(wrapper.find('Step1').exists()).toBe(false);
	});

	it('Should render wizard without initial step', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, Mui]}>
				<Wizard steps={{ 'step-1': Step1, 'step-2': Step2 }} initialStep={null} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Wizard);
		expect(wrapper.find('Wizard').last().prop('initialStep')).toEqual(null);
	});
});
