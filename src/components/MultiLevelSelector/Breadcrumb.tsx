import { Button, Icon } from '@bluebase/components';
import React, { useRef } from 'react';
import { ScrollView, TextStyle, View, ViewStyle } from 'react-native';
import { Theme, applyStyles } from '@bluebase/core';

import { MultiLevelSelectorItem } from './MultiLevelSelector';

export interface MultiLevelSelectorBreadcrumbStyles {
	wrapper: ViewStyle;
	divider: TextStyle;
}

export interface MultiLevelSelectorBreadcrumbProps {
	values: MultiLevelSelectorItem[];
	onItemPress: (index: number) => void;
	styles?: Partial<MultiLevelSelectorBreadcrumbStyles>;
}

const MultiLevelSelectorBreadcrumbComponent = (props: MultiLevelSelectorBreadcrumbProps) => {
	const { values, onItemPress, styles } = props;
	const breadcrumbScrollView = useRef<ScrollView>(null);

	function onContentSizeChange() {
		breadcrumbScrollView.current!.scrollToEnd();
	}

	function onPress(index: number) {
		return () => onItemPress(index - 1);
	}

	return (
		<ScrollView
			testID="on-content-size-change"
			horizontal
			ref={breadcrumbScrollView}
			onContentSizeChange={onContentSizeChange}
		>
			<View style={styles!.wrapper}>
				{values.map((value, index) => (
					<React.Fragment key={value.id}>
						<Button
							testID="on-Press-test"
							title={value.title}
							variant="text"
							size="small"
							onPress={onPress(index)}
						/>
						<Icon name="chevron-right" style={styles!.divider} />
					</React.Fragment>
				))}
				<Button title="Select an Item" variant="text" size="small" disabled />
			</View>
		</ScrollView>
	);
};

const defaultProps: Partial<MultiLevelSelectorBreadcrumbProps> = {};

const defaultStyles = (theme: Theme): MultiLevelSelectorBreadcrumbStyles => ({
	wrapper: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: theme.spacing.unit / 2,
	},

	divider: {
		color: theme.palette.text.disabled,
	},
});

MultiLevelSelectorBreadcrumbComponent.defaultProps = defaultProps;
MultiLevelSelectorBreadcrumbComponent.defaultStyles = defaultStyles;

export const MultiLevelSelectorBreadcrumb: React.ComponentType<
	MultiLevelSelectorBreadcrumbProps
> = applyStyles({
	name: 'MultiLevelSelectorBreadcrumb',
})(MultiLevelSelectorBreadcrumbComponent as any);
