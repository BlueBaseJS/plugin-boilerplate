import { FormSubmitButtonProps } from '@bluebase/plugin-json-schema-components';
import React from 'react';
import get from 'lodash.get';
import { getComponent } from '@bluebase/core';
import { useFormikContext } from 'formik';

const FormSubmitButton = getComponent<FormSubmitButtonProps>('FormSubmitButton');

export interface FormButtonProps extends FormSubmitButtonProps {
	code: string;
}

/**
 * Should keep the submit button disabled unless input code matches the one
 * in the prop.
 */
export const FormButton = (props: FormButtonProps) => {
	const formik = useFormikContext();

	return (
		<FormSubmitButton
			{...props}
			disabled={props.code !== get(formik, 'values.code') || formik.isSubmitting}
		/>
	);
};

FormButton.displayName = 'FormButton';
