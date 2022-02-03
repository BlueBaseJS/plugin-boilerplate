import { Dialog, List, ListIconProps } from '@bluebase/components';
import { IntlContext, IntlContextData, Omit, getComponent } from '@bluebase/core';
import { KeyboardAvoidingView, TextStyle } from 'react-native';

import { FormButton } from './FormButton';
import { FormikHelpers } from 'formik';
import { JsonGraphqlFormProps } from '@bluebase/plugin-json-graphql-components';
import React from 'react';
import { SkeletonListItemProps } from '../SkeletonListItem';

interface DangerSettingActionFormValues {
	[key: string]: any;
	code: string;
}

const JsonGraphqlForm =
	getComponent<JsonGraphqlFormProps<DangerSettingActionFormValues>>('JsonGraphqlForm');
const SkeletonListItem = getComponent<SkeletonListItemProps>('SkeletonListItem');

export interface DangerSettingActionStyles {
	title: TextStyle;
	icon: TextStyle;
}

export interface DangerSettingActionProps
	extends Omit<JsonGraphqlFormProps<DangerSettingActionFormValues>, 'onSuccess'> {
	/** List Item Title */
	title: string;

	/** List Item Description */
	description: string;

	/** List Item Icon props */
	iconProps?: ListIconProps;

	/** Form Title */
	formTitle: string;

	/** Form Description */
	formDescription: string;

	/** TextInput Label */
	formTextFieldLabel: string;

	/** Form Button Title */
	formButtonTitle: string;

	/**
	 * The code to match. If the user types this code, only then he
	 * will be able to submits the form.
	 */
	code: string;

	/**
	 * Callback function, called when a user successfully submit the form
	 */
	onSuccess: (
		actions: FormikHelpers<DangerSettingActionFormValues>,
		closeDialog: () => void
	) => void;

	loading?: boolean;

	/** Styles */
	styles?: Partial<DangerSettingActionStyles>;
}

interface DangerSettingActionState {
	dialogVisible: boolean;
}

/**
 * Displays a list option to perform a "dangerous" action in the app
 * i.e. Delete Something. On press, displays a confirmation dialog and
 * makes the user type a pass code.
 */
export class DangerSettingAction extends React.PureComponent<
	DangerSettingActionProps,
	DangerSettingActionState
> {
	static contextType: any = IntlContext;

	static defaultProps: Partial<DangerSettingActionProps> = {
		description: 'Once you delete this item, there is no going back. Please be certain.',
		formButtonTitle: 'Delete this item',
		formDescription:
			// eslint-disable-next-line max-len
			'Are you absolutely sure? This action cannot be undone. It will permanently delete this item and all related data!',
		formTextFieldLabel: 'Please type in the name of this item to confirm',
		formTitle: 'Delete Item',
		title: 'Delete this item',
	};

	state: DangerSettingActionState = {
		dialogVisible: false,
	};

	// // Default styles for component.
	// static defaultStyles = (theme: Theme): DangerSettingActionStyles => ({
	// 	dialogButton: {
	// 		marginTop: theme.spacing.unit * 2,
	// 	},
	// });

	// Opens the dialog
	openDialog: any = () => {
		this.setState({ dialogVisible: true });
	};

	// Closes the dialog
	closeDialog: any = () => {
		this.setState({ dialogVisible: false });
	};

	onSuccess: any = (
		_result: any,
		_values: DangerSettingActionFormValues,
		actions: FormikHelpers<DangerSettingActionFormValues>
	) => {
		this.props.onSuccess(actions, this.closeDialog);
		return;
	};

	mapFormValuesToMutationVariables: any = (values: { code: string } & any) => {
		const { code, ...rest } = values;
		return rest;
	};
	render() {
		const {
			code,
			description,
			formDescription,
			formTitle,
			formButtonTitle,
			formTextFieldLabel,
			iconProps,
			loading,
			styles,
			title,
			...rest
		} = this.props;

		if (loading === true) {
			return <SkeletonListItem avatar description variant="icon" />;
		}

		const { __ }: IntlContextData = this.context;

		return (
			<React.Fragment>
				<KeyboardAvoidingView enabled behavior="padding">
					<List.Item
						title={__(title)}
						description={__(description)}
						left={<List.Icon name="delete" {...iconProps} style={styles?.icon} />}
						onPress={this.openDialog}
						style={styles?.title}
					/>
					<Dialog visible={this.state.dialogVisible} dismissable onDismiss={this.closeDialog}>
						<JsonGraphqlForm
							{...rest}
							onSuccess={this.onSuccess}
							mapFormValuesToMutationVariables={this.mapFormValuesToMutationVariables}
							schema={{
								...rest.schema,
								description: formDescription,
								fields: [
									{
										// autoFocus: true,
										error: true,
										fullWidth: true,
										label: formTextFieldLabel,
										name: 'code',
										type: 'text',
									},
									{
										name: 'status',
										type: 'status',
									},
									{
										name: 'submit',
										type: 'component',

										schema: {
											component: FormButton,
											props: {
												code,
												color: 'error',
												fullWidth: true,
												title: formButtonTitle,
												// variant: 'outlined',
											},
										},
									},
								],
								title: formTitle,
							}}
						/>
					</Dialog>
				</KeyboardAvoidingView>
			</React.Fragment>
		);
	}
}
