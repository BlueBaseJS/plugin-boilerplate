import React, { useCallback } from 'react';
import { networkError, success } from './mocks';

import { FormikHelpers } from 'formik';
import { MockedProvider } from '@apollo/react-testing';
import { getComponent } from '@bluebase/core';
import gql from 'graphql-tag';
import storiesOf from '@bluebase/storybook-addon';

const DangerSettingActions = getComponent('DangerSettingAction');

export const DeletePlaceMutation = gql`
	mutation DeletePlaceMutation($id: ID!) {
		deletePlace(id: $id)
	}
`;

const stories = storiesOf('DangerSettingActions', module);

stories.add('Danger Setting Actions with mutation success [code="Code"]', () => (
	<MockedProvider mocks={success} addTypename={false}>
		<DangerSettingActions
			code="Code"
			mutation={{ mutation: DeletePlaceMutation }}
			schema={{ initialValues: { id: '123' } }}
			// tslint:disable-next-line: jsx-no-lambda
			onSuccess={useCallback(({ setSubmitting }: FormikHelpers<{}>, closeDialog: () => void) => {
				setSubmitting(false);
				closeDialog();
			}, [])}
		/>
	</MockedProvider>
));
stories.add('Danger Setting Actions error state [code="Code"]', () => (
	<MockedProvider mocks={[networkError]} addTypename={false}>
		<DangerSettingActions
			code="Code"
			mutation={{ mutation: DeletePlaceMutation }}
			schema={{ initialValues: { id: '123' } }}
			// tslint:disable-next-line: jsx-no-lambda
			onSuccess={useCallback(
				({ setErrors, setSubmitting }: FormikHelpers<{}>, _closeDialog: () => void) => {
					setSubmitting(false);
					setErrors({ form: ['An error occurred'] });
				},
				[]
			)}
		/>
	</MockedProvider>
));

stories.add('Loading State', () => (
	<MockedProvider mocks={[networkError]} addTypename={false}>
		<DangerSettingActions loading />
	</MockedProvider>
));
