/* eslint-disable @typescript-eslint/typedef */
import { Body2, Icon, View } from '@bluebase/components';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import { Platform, TextInput, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import React from 'react';
import { Theme } from '@bluebase/core';
import { getInRangeValue } from './getInRangeValue';

interface StepperStyles {
	root: ViewStyle;

	fieldWrapper: ViewStyle;

	buttonWrapper: ViewStyle;
	button: ViewStyle;
	buttonIcon: TextStyle;
	buttonIconDisabled: TextStyle;

	textInputWrapper: ViewStyle;
	textInput: TextStyle;

	error: TextStyle;
	errorBorderColor: ViewStyle;

	skeleton: ViewStyle;
}

export interface StepperState {
	value: number | null;
	initialValue: number | null;
}

export interface StepperProps {
	disabled?: boolean;
	min?: number;
	max?: number;
	step?: number;
	value: number;
	onChangeValue?: (value: number | null) => void;
	error?: boolean;
	helperText?: string;
	loading?: boolean;
	styles?: Partial<StepperStyles>;
}

export class Stepper extends React.Component<StepperProps, StepperState> {
	static defaultProps = {
		max: 9999,
		min: 0,
		step: 1,
	};

	readonly state = {
		initialValue: this.props.value,
		value: this.props.value,
	};

	static defaultStyles = (theme: Theme): StepperStyles => ({
		root: {},

		fieldWrapper: {
			borderColor: theme.palette.divider,
			borderRadius: theme.shape.borderRadius,
			borderWidth: 1,
			flexDirection: 'row',
		},

		buttonWrapper: {},

		button: {
			minWidth: theme.spacing.unit * (Platform.OS === 'web' ? 5 : 5),
			padding: theme.spacing.unit,
		},

		buttonIcon: {},
		buttonIconDisabled: {
			color: theme.palette.text.disabled,
		},

		textInputWrapper: {
			alignItems: 'stretch',
			flexDirection: 'row',
		},

		textInput: {
			justifyContent: 'center',
			minWidth: theme.spacing.unit * 6,
			textAlign: 'center',
		},

		error: {
			color: theme.palette.error.main,
			paddingVertical: theme.spacing.unit,
		},
		errorBorderColor: {
			borderColor: theme.palette.error.main,
		},

		skeleton: { width: 130, borderRadius: theme.spacing.unit / 2 },
	});

	static getDerivedStateFromProps: React.GetDerivedStateFromProps<StepperProps, StepperState> = (
		props,
		state
	) => {
		const value = props.value === state.initialValue ? state.value : props.value;
		return {
			initialValue: props.value,
			value: getInRangeValue(value, props),
		};
	};

	setValue = (input: string | number) => {
		const value = getInRangeValue(input, this.props);

		this.setState({ value });

		if (this.props.onChangeValue) {
			this.props.onChangeValue(value);
		}
	};

	renderLoading = () => (
		<Placeholder Animation={Fade}>
			<PlaceholderLine style={this.props.styles!.skeleton} noMargin height={36} />
		</Placeholder>
	);

	getValueString = () => (this.state.value !== null ? this.state.value.toString() : '');

	canDecrease = () => this.props.min !== undefined && this.state.value > this.props.min;
	canIncrease = () => this.props.max !== undefined && this.state.value < this.props.max;

	increment = () => this.setValue(this.state.value + this.props.step!);

	decrement = () => this.setValue(this.state.value - this.props.step!);

	render() {
		const { error, disabled, max, min, step, helperText, loading } = this.props;
		const styles = this.props.styles!;

		const canDecrease = this.canDecrease();
		const canIncrease = this.canIncrease();

		const isDecrementDisabled = disabled || !canDecrease;
		const isIncrementDisabled = disabled || !canIncrease;

		return !loading ? (
			<View style={styles.root}>
				<View
					testID="field-wrapper-view"
					style={{ ...styles.fieldWrapper, ...(error && styles.errorBorderColor) }}
				>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity
							style={styles.button}
							onPress={isDecrementDisabled ? undefined : this.decrement}
							disabled={isDecrementDisabled}
							testID="decrement-button"
						>
							<Icon
								name="minus"
								style={{
									...styles.buttonIcon,
									...(isDecrementDisabled && styles.buttonIconDisabled),
								}}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.textInputWrapper}>
						<TextInput
							keyboardType="numeric"
							style={styles.textInput}
							onChangeText={this.setValue}
							value={this.getValueString()}
							editable={!disabled}
							{...{ min, max, step }}
						/>
					</View>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity
							style={styles.button}
							disabled={isIncrementDisabled}
							onPress={isIncrementDisabled ? undefined : this.increment}
							testID="increment-button"
						>
							<Icon
								name="plus"
								style={{
									...styles.buttonIcon,
									...(isIncrementDisabled && styles.buttonIconDisabled),
								}}
							/>
						</TouchableOpacity>
					</View>
				</View>
				{helperText && <Body2 style={error && styles.error}>{helperText}</Body2>}
			</View>
		) : (
			this.renderLoading()
		);
	}
}
