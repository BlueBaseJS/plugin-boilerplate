import { Button, Card, Divider, List, View } from '@bluebase/components';
import React, { useCallback } from 'react';
import { WizardProps, WizardStepProps } from '../Wizard';

import { WizardFooter } from '../WizardFooter';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const Wizard = getComponent<WizardProps>('Wizard');

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
		props.setData({ step1Result: 'foo' });
		props.goForward('step-2');
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<List.Item title="Step 1" description="a description sentence" />
			<Divider />
			<View style={{ flex: 1, padding: 16 }}>
				<StepData {...props} />
			</View>
			<WizardFooter right={<Button variant="text" title="Next" onPress={next} />} />
		</View>
	);
};

const Step2 = (props: WizardStepProps) => {
	const back = useCallback(() => {
		props.setData({ step2Result: 'bar' });
		props.goBack('step-1');
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<List.Item title="Step 2" description="a description sentence" />
			<Divider />
			<View style={{ flex: 1, padding: 16 }}>
				<StepData {...props} />
			</View>
			<WizardFooter left={<Button variant="text" title="Back" onPress={back} />} />
		</View>
	);
};

storiesOf('Wizard', module).add('Step', () => (
	<View
		style={{
			// backgroundColor: 'rgba(255,0,0,.05)',
			height: 400,
			margin: 50,
			position: 'absolute',
			width: 300,
		}}
	>
		<Wizard steps={{ 'step-1': Step1, 'step-2': Step2 }} initialStep="step-1" />
	</View>
));
