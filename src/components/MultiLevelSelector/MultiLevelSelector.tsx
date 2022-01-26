import { AvatarProps, Divider } from '@bluebase/components';
import React, { useRef, useState } from 'react';
import { View, ViewStyle } from 'react-native';

import { MultiLevelSelectorBreadcrumb } from './Breadcrumb';
import { MultiLevelSelectorList } from './List';
import { SlidingPane } from './SlidingPane';

export interface MultiLevelSelectorItem {
	[key: string]: any;
	id?: string;
	parentId?: string;
	title?: string;
	description?: string;
	icon?: AvatarProps;
	hasChildren?: boolean;
	count?: number;
	disabled?: boolean;
}

/**
 * When a selection level is changed, items for that level at fetched
 */
export type MultiLevelSelectorGetItemsFn = (
	/**
	 * Array of selected items.
	 */
	selection: MultiLevelSelectorItem[],

	/**
	 * Items prop, if provided
	 */
	items: MultiLevelSelectorItem[],

	/**
	 * Callback function
	 */
	done: (items: MultiLevelSelectorItem[]) => void
) => void;

export interface MultiLevelSelectorProps {
	/**
	 * Input items
	 */
	items?: MultiLevelSelectorItem[];

	/**
	 * Initial Values
	 */
	values?: MultiLevelSelectorItem[];

	/**
	 * Callback function when selection is completed
	 */
	onChangeValue?: (selection: MultiLevelSelectorItem[]) => void;

	/**
	 * Get items for a level
	 */
	getItems?: MultiLevelSelectorGetItemsFn;

	style?: ViewStyle;
}

/**
 * Default getItems fn. If one is not provided, this function is used instead.
 * @param selection
 * @param items
 * @param done
 */
const DefaultGetItemsFn: MultiLevelSelectorGetItemsFn = (selection, items, done) => {
	if (selection.length === 0) {
		return done(items.filter(item => !item.parentId));
	}

	const leaf = selection[selection.length - 1];
	done(items.filter(item => item.parentId === leaf.id));
};

export const MultiLevelSelector = (props: MultiLevelSelectorProps) => {
	// //////////
	// States //
	// //////////

	const [itemMap, setItemMap] = useState<{ [key: string]: MultiLevelSelectorItem[] }>({});
	const [values, setValues] = useState(props.values!);
	const [loading, setLoading] = useState<boolean>(true);

	// ////////
	// Refs //
	// ////////

	const slidingPane = useRef<SlidingPane>(null);

	// /////////////
	// Constants //
	// /////////////

	const currentValueIndex = values.length - 1 >= 0 ? values.length - 1 : 0;
	const currentValue = values[currentValueIndex];
	const itemMapId = currentValue && currentValue.id ? currentValue.id : 'undefined';

	// //////////////
	// Load Items //
	// //////////////

	/**
	 * This function initiates the process to get children items based on selection.
	 * Bails, if children already exist in the local cache.
	 *
	 * @param selection
	 * @param items
	 * @param done
	 */
	const beginGetItems: MultiLevelSelectorGetItemsFn = (selection, items, done) => {
		if (itemMap[itemMapId]) {
			return done(itemMap[itemMapId]);
		}

		if (loading !== true) {
			setLoading(true);
		}

		const fn = props.getItems || DefaultGetItemsFn;
		fn(selection, items, done);
	};

	/**
	 * This function finishes the process of getting children items.
	 * Saves result in local cache.
	 * @param paneItems
	 */
	const endGetItems = (paneItems: MultiLevelSelectorItem[]) => {
		if (loading !== false) {
			setLoading(false);
		}

		if (itemMap[itemMapId]) {
			return;
		}

		setItemMap({
			...itemMap,
			[itemMapId]: paneItems,
		});
	};

	// ////////////////////////
	// Manipulate Selection //
	// ////////////////////////

	/**
	 * Adds an item in the selection
	 * @param value
	 */
	const appendValue = async (value: MultiLevelSelectorItem) => {
		await setValues([...values, value]);
		slideFromRight();
	};

	/**
	 * Goes to a parent slide, removes are it's children from selection
	 * @param index
	 */
	const goToParentValue = async (index: number) => {
		// If theres no selection, then we dont need to do anything
		if (values.length < 1) {
			return;
		}

		const end = index + 1;
		const vals = values.slice(0, end > 0 ? end : 0);
		await setValues(vals);

		slideFromLeft();
	};

	// ////////////////////////////
	// Sliding Pane Transitions //
	// ////////////////////////////

	/**
	 * Slide In pane from left
	 */
	function slideFromLeft() {
		if (slidingPane.current === null) {
			return;
		}

		slidingPane.current.warpLeft(slidingPane.current.slideCenter, -10);
	}

	/**
	 * Slide In pane from right
	 */
	function slideFromRight() {
		if (slidingPane.current === null) {
			return;
		}

		slidingPane.current.warpRight(slidingPane.current.slideCenter, 10);
	}

	// ///////////////////
	// Event Listeners //
	// ///////////////////

	/**
	 * Callback when an item is selected
	 * @param value
	 */
	function onChangeValue(value: MultiLevelSelectorItem) {
		// If this item has children, add it to selection
		if (value.hasChildren) {
			appendValue(value);
			return;
		}

		// Fire onChangeValue callback to finish selection process
		if (props.onChangeValue) {
			props.onChangeValue([...values, value]);
		}
	}

	// /////////////////
	// Load Children //
	// /////////////////

	beginGetItems(values, props.items || [], endGetItems);
	const { height, ...otherStyle } = props.style || { height: '100%' };
	return (
		<View style={{ ...otherStyle }}>
			<MultiLevelSelectorBreadcrumb values={values} onItemPress={goToParentValue} />
			<Divider />
			<SlidingPane ref={slidingPane}>
				<MultiLevelSelectorList
					style={{ height }}
					searchable
					key={itemMapId}
					loading={loading}
					items={itemMap[itemMapId]}
					onChangeValue={onChangeValue}
				/>
			</SlidingPane>
		</View>
	);
};

const defaultProps: Partial<MultiLevelSelectorProps> = {
	values: [],
};

MultiLevelSelector.defaultProps = defaultProps;
