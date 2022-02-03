import { ErrorState, View } from '@bluebase/components';
import React, { useRef, useState } from 'react';
import { Theme, useStyles } from '@bluebase/core';

import SlidingPane from '../SlidingPane';
import { ViewStyle } from 'react-native';
import { useComponentLayout } from '../../hooks';

export type WizardButtonHandler = () => void;

export type WizardButtonHandlerMap = {
	[key: string]: WizardButtonHandler;
};

export interface WizardStepProps<Data = { [key: string]: any }> {
	[key: string]: any;
	data: Data;
	setData: (delta: { [key: string]: Partial<Data> }) => void;
	goBack: (stepKey: string) => void;
	goForward: (stepKey: string) => void;
}

export interface WizardStyles {
	root: ViewStyle;
	step: ViewStyle;
	footer: ViewStyle;
	footerItem: ViewStyle;
}

export interface WizardProps {
	steps: { [key: string]: React.ComponentType<WizardStepProps> };
	initialStep: string;
	animate?: boolean;
	data?: { [key: string]: any };
	styles?: Partial<WizardStyles>;
}

const defaultStyles = (theme: Theme): WizardStyles => ({
	root: {
		flex: 1,
		overflow: 'hidden',
	},

	step: {
		flex: 1,
		// position: 'relative',
	},

	footer: {
		backgroundColor: '#fff',
		borderTopColor: theme.palette.divider,
		borderTopWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.spacing.unit / 2,
	},
	footerItem: {
		margin: theme.spacing.unit / 2,
	},
});

export const Wizard = (props: WizardProps) => {
	const { layout, onLayout } = useComponentLayout();
	const { steps, initialStep } = props;
	const styles = useStyles('Wizard', props, defaultStyles);

	const [step, setStep] = useState(initialStep);
	const [data, setDataState] = useState(props.data!);

	const slidingPane = useRef<SlidingPane>(null);
	const StepComponent = steps[step];

	if (!StepComponent) {
		return <ErrorState />;
	}

	function setData(delta: { [key: string]: any }) {
		setDataState({ ...data, ...delta });
	}

	function goForward(stepKey: string) {
		if (steps[stepKey]) {
			setStep(stepKey);

			if (!slidingPane.current) {
				return;
			}

			slidingPane.current.warpRight(slidingPane.current.slideCenter);
		}
	}

	function goBack(stepKey: string) {
		if (steps[stepKey]) {
			setStep(stepKey);

			if (!slidingPane.current) {
				return;
			}

			slidingPane.current.warpLeft(slidingPane.current.slideCenter);
		}
	}

	return (
		<View onLayout={onLayout} style={styles.root}>
			<SlidingPane ref={slidingPane} width={layout.width}>
				<StepComponent
					{...{
						data,
						goBack,
						goForward,
						setData,
					}}
				/>
			</SlidingPane>
		</View>
	);
};

const defaultProps = {
	animate: true,
	data: {},
};

Wizard.defaultProps = defaultProps;
