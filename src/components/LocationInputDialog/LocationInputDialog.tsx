import { Dialog } from '@bluebase/components';
import { getComponent } from '@bluebase/core';
import { JsonFormProps } from '@bluebase/plugin-json-schema-components';
import { FormikHelpers } from 'formik';
import React from 'react';

import { LocationCoordinates } from '../../types';

const JsonForm = getComponent<JsonFormProps<LocationCoordinates>>('JsonForm');

export interface LocationInputDialogProps {
	style?: object;
	visible: boolean;
	latitude: number;
	longitude: number;
	onDismiss?: () => void;
	onSubmit: (coordinates: LocationCoordinates) => void;
}

export const LocationInputDialog = (props: LocationInputDialogProps) => {
	const { visible, onDismiss, onSubmit, longitude, latitude } = props;

	const onSubmitFn = (
		values: LocationCoordinates,
		{ setSubmitting }: FormikHelpers<LocationCoordinates>
	) => {
		onSubmit({
			latitude: parseFloat(values.latitude as any),
			longitude: parseFloat(values.longitude as any),
		});
		setSubmitting(false);
	};

	return (
		<Dialog visible={visible} onDismiss={onDismiss} dismissable>
			<JsonForm
				schema={{
					description: 'Enter location coordinates in the fields below.',
					initialValues: { longitude, latitude },
					title: 'Input Location Coordinates',
					validateOnChange: false,

					onSubmit: onSubmitFn,

					fields: [
						{
							label: 'Latitude',
							name: 'latitude',
							required: true,
							type: 'number',
						},
						{
							label: 'Longitude',
							name: 'longitude',
							required: true,
							type: 'number',
						},
						{
							direction: 'right',
							name: 'inline',
							type: 'inline',

							fields: [
								{
									name: 'submit',
									type: 'submit',
								},
							],
						},
					],
				}}
			/>
		</Dialog>
	);
};

LocationInputDialog.displayName = 'LocationInputDialog';
