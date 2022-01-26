import MultiLevelSelector, {
	MultiLevelSelectorItem,
	MultiLevelSelectorProps,
} from '../MultiLevelSelector';
import React, { useEffect, useState } from 'react';

import { Dialog } from '@bluebase/components';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { Platform } from 'react-native';
import Popper from '@material-ui/core/Popper';
import { Theme } from '@bluebase/core';

export interface Area extends MultiLevelSelectorItem {
	type?: 'country' | 'state' | 'city' | 'area';
}

export interface CityPickerStyles {}

export interface CityPickerProps extends MultiLevelSelectorProps {
	items: MultiLevelSelectorItem[];
	onSelectCity: (selection: MultiLevelSelectorItem[]) => void;
	onSave?: (selection: MultiLevelSelectorItem[]) => void;
	open: boolean;
	onDismiss: () => void;
	mode?: 'dropdown' | 'dialog' | string;
	styles?: Partial<CityPickerStyles>;
}

export const CityPicker = (props: CityPickerProps) => {
	const { items, onSelectCity, onDismiss, open, mode, ...otherProps } = props;
	const [itemList, setItemList] = useState<MultiLevelSelectorItem[]>();
	useEffect(() => {
		setItemList(
			items.map(area => ({
				...area,
				hasChildren: items.findIndex(a => a.parentId === area.id && !!a.parentId) > -1,
			}))
		);
	}, []);
	if (mode === 'dropdown') {
		if (Platform.OS !== 'web' && open) {
			return (
				<MultiLevelSelector
					items={itemList}
					values={[]}
					{...otherProps}
					onChangeValue={onSelectCity}
				/>
			);
		}
		return (
			<Popper open={open} transition>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<Paper elevation={2}>
							<MultiLevelSelector
								items={itemList}
								values={[]}
								{...otherProps}
								onChangeValue={onSelectCity}
							/>
						</Paper>
					</Fade>
				)}
			</Popper>
		);
	}
	return (
		<Dialog visible={open} onDismiss={onDismiss}>
			<Dialog.Content style={{ padding: 0 }}>

				<MultiLevelSelector
					items={itemList}
					values={[]}
					{...otherProps}
					onChangeValue={onSelectCity}
				/>
			</Dialog.Content>
		</Dialog>
	);
};

const defaultProps: Partial<CityPickerProps> = {};

const defaultStyles = (_theme: Theme): CityPickerStyles => ({});

CityPicker.defaultProps = defaultProps;
CityPicker.defaultStyles = defaultStyles;
