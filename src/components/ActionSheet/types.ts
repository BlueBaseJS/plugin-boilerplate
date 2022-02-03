import { TextStyle, ViewStyle } from 'react-native';

import React from 'react';

export interface ActionSheetOptions {
	/**
	 * a title to show above the action sheet
	 * @type string
	 */
	title: string;

	/**
	 * a message to show descriptions
	 * @type string
	 * No Available in Latest Version
	 */
	// description?: string;

	/**
	 * a message to show below the title
	 * @type string
	 */
	message: string;

	/**
	 * a list of button titles (required)
	 * @example
	 * ['cancel', 'Apple', 'Banana']
	 */
	options: string[];

	onPress: (buttonIndex: number) => void;

	/**
	 * index of cancel button in options
	 * @type int
	 */
	cancelButtonIndex: number;

	/**
	 * the color used for non-destructive button titles
	 * @type string
	 * @see http://facebook.github.io/react-native/docs/colors.html
	 */
	tintColor: string;

	/**
	 * index of destructive button in options
	 * @type int
	 */
	destructiveButtonIndex: number;

	// Start Android/Web-Only Props

	/**
	 * Show icons to go along with each option.
	 * If image source paths are provided via require, images will be rendered for you.
	 * Alternatively, you can provide an array of elements such as vector icons, pre-rendered Images, etc.
	 * @type Array
	 */
	icons?: React.ReactNode[];

	/**
	 * Icons by default will be tinted to match the text color.
	 * When set to false, the icons will be the color of the source image.
	 * This is useful if you want to use multicolor icons.
	 * @type boolean
	 */
	tintIcons?: boolean;

	/**
	 * Apply any text style props to the options.
	 * If the tintColor option is provided, it takes precedence over a color text style prop.
	 * @type TextStyle
	 */
	textStyle?: TextStyle;

	/**
	 * Apply any text style props to the title if present.
	 * @type TextStyle
	 */
	titleTextStyle?: TextStyle;

	/**
	 * Apply any text style props to the message if present.
	 * @type TextStyle
	 */
	messageTextStyle?: TextStyle;

	/**
	 * Show separators between items. On iOS, separators always show so this prop has no effect.
	 * @type TextStyle
	 */
	showSeparators?: boolean;

	/**
	 * Apply any view style props to the container rather than use the default look (e.g. dark mode).
	 * @type ViewStyle
	 */
	containerStyle?: ViewStyle;

	/**
	 * Modify the look of the separators rather than use the default look.
	 * @type ViewStyle
	 */
	separatorStyle?: ViewStyle;
}
