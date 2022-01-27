import { ActivityIndicator, Dialog, Divider, List } from '@bluebase/components';
import React, { useCallback, useState } from 'react';
import { getComponent, useIntl } from '@bluebase/core';

import { PaymentMethodListItemProps } from '../PaymentMethodListItem';
import { PaymentMethodListProps } from '../PaymentMethodList';
import { PlaceholderListItem } from '../../imports';

const PaymentMethodList = getComponent<PaymentMethodListProps>('PaymentMethodList');

export interface PaymentMethodPickerProps extends Partial<PaymentMethodListItemProps> {
	onValueChange?: (item: PaymentMethodListItemProps) => void;
	mutating?: boolean;
}

export const PaymentMethodPicker = (props: PaymentMethodPickerProps) => {
	const { __ } = useIntl();
	const [dialogVisible, setDialogVisible] = useState(false);

	const { avatar, paymentmethodholder, title, mutating, onValueChange, loading } = props;

	const toggleDialog = useCallback(() => setDialogVisible(!dialogVisible), [dialogVisible, setDialogVisible]);

	const onPaymentMethodListPress = useCallback((item: PaymentMethodListItemProps) => {
		if (onValueChange) {
			onValueChange(item);
		}
		setDialogVisible(false);
	}, [onValueChange]);

	return (
		<React.Fragment>
			{loading ? (
				<PlaceholderListItem avatar description variant="rounded" />
			) : (
				<List.Item
					left={
						<List.Avatar variant="rounded" type="image" image={avatar ? avatar : paymentmethodholder} />
					}
					right={mutating && <ActivityIndicator />}
					title={__('Payment Method')}
					description={title || __('Select a payment method')}
					onPress={toggleDialog}
				/>
			)}
			<Dialog visible={dialogVisible} dismissable onDismiss={toggleDialog}>
				<List.Subheader>{__('Select a Payment Method')}</List.Subheader>
				<Divider />
				<PaymentMethodList pagination="infinite" onPress={onPaymentMethodListPress} />
			</Dialog>
		</React.Fragment>
	);
};

PaymentMethodPicker.displayName = 'PaymentMethodPicker';
