import { ActivityIndicator, Dialog, Divider, List } from '@bluebase/components';
import React, { useCallback, useState } from 'react';
import { getComponent, useIntl } from '@bluebase/core';

import { PlaceholderListItem } from '../../imports';
import { ShippingMethodListItemProps } from '../ShippingMethodListItem';
import { ShippingMethodListProps } from '../ShippingMethodList';

const ShippingMethodList = getComponent<ShippingMethodListProps>('ShippingMethodList');

export interface ShippingMethodPickerProps extends Partial<ShippingMethodListItemProps> {
	onValueChange?: (item: ShippingMethodListItemProps) => void;
	mutating?: boolean;
}

export const ShippingMethodPicker = (props: ShippingMethodPickerProps) => {
	const { __ } = useIntl();
	const [dialogVisible, setDialogVisible] = useState(false);

	const { id, avatar, shippingmethodholder, title, mutating, onValueChange, loading } = props;

	const toggleDialog = useCallback(() => setDialogVisible(!dialogVisible), [dialogVisible, setDialogVisible]);

	const onShippingMethodListPress = useCallback((item: ShippingMethodListItemProps) => {
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
							<List.Avatar variant="rounded" type="image" image={avatar ? avatar : shippingmethodholder} />
						}
						right={mutating && <ActivityIndicator />}
						title={__('Shipping Method')}
						description={title || __('Select a shipping method')}
						onPress={toggleDialog}
					/>
				)}
			<Dialog visible={dialogVisible} dismissable onDismiss={toggleDialog}>
				<List.Subheader>{__('Select a Shipping Method')}</List.Subheader>
				<Divider />
				<ShippingMethodList
					queryOptions={id ? { variables: { filter: { where: { id } as any } } } : {}}
					pagination="infinite"
					onPress={onShippingMethodListPress}
				/>
			</Dialog>
		</React.Fragment>
	);
};

ShippingMethodPicker.displayName = 'ShippingMethodPicker';
