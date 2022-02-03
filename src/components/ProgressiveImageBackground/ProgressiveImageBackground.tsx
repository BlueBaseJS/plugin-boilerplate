/* eslint-disable @typescript-eslint/typedef */
import { Animated, ImageStyle, View } from 'react-native';
import { BlueBaseImage, BlueBaseImageProps } from '@bluebase/components';
import { Fade, Placeholder, PlaceholderMedia } from 'rn-placeholder';
import { ThemeContext, ThemeContextData, isMobile } from '@bluebase/core';

import { AnimatedImageBackground } from './AnimatedImageBackground';
import React from 'react';

export interface ProgressiveImageBackgroundProps extends BlueBaseImageProps {
	// thumbnail image link show wPhile loading
	thumbnail?: BlueBaseImageProps['source'];

	// image of link to be shown

	placeholder?: BlueBaseImageProps['source'];

	// ViewStyles
	style?: ImageStyle;

	// control Thumbnail's pixelation scale
	blurRadius?: number;
}

export interface ProgressiveImageBackgroundState {
	showPlaceholder: boolean;
	showSkeleton: boolean;
	loadingStartedAt: number;
}

// tslint:disable-next-line: max-classes-per-file
class ProgressiveImageBackground extends React.Component<
	ProgressiveImageBackgroundProps,
	ProgressiveImageBackgroundState
> {
	static contextType: React.Context<ThemeContextData> = ThemeContext;

	readonly state: ProgressiveImageBackgroundState = {
		loadingStartedAt: Date.now(),
		showPlaceholder: !this.props.source,
		showSkeleton: !!this.props.source,
	};

	private thumbnailAnimated = new Animated.Value(0);
	private imageAnimated = new Animated.Value(0);

	// private hidePlaceholder = true;
	// private hideSkeleton = false;

	private imageStyles: any = {};

	/**
	 * ProgressiveImage component will show a blur animation
	 * while loading image.
	 */
	render() {
		const { style } = this.props;

		this.imageStyles = {
			...style,
			position: 'absolute',
		};

		return (
			<View style={style}>
				{this.renderSkeleton()}
				{this.renderPlaceholder()}
				{this.renderThumbnail()}
				{this.renderMainImage()}
			</View>
		);
	}

	private renderPlaceholder = () => {
		const { blurRadius, source, style, placeholder, thumbnail, children, ...rest } = this.props;

		if (!this.state.showPlaceholder) {
			return null;
		}

		return (
			<BlueBaseImage
				source={this.getAssetVersions(placeholder)}
				style={this.imageStyles}
				{...rest}
			/>
		);
	};

	private renderSkeleton = () => {
		if (!this.state.showSkeleton) {
			return null;
		}

		return (
			<Placeholder Animation={Fade}>
				<PlaceholderMedia style={this.props.style} isRound={false} />
			</Placeholder>
		);
	};

	private renderThumbnail = () => {
		const { blurRadius, source, style, placeholder, thumbnail, ...rest } = this.props;

		if (!thumbnail) {
			return null;
		}

		const thumbnailImageStyles = {
			...style,
			opacity: this.thumbnailAnimated,
			position: 'absolute',
		};

		return (
			<AnimatedImageBackground
				{...rest}
				source={this.getAssetVersions(thumbnail)}
				style={thumbnailImageStyles as any}
				onLoad={this.handleThumbnailLoad}
				// onLoadEnd={this.onImageLoadFail}
				blurRadius={blurRadius}
				testID="thumbnail-animated-image"
			/>
		);
	};

	private renderMainImage = () => {
		const { blurRadius, source, style, placeholder, thumbnail, ...rest } = this.props;
		const opacity = thumbnail ? this.imageAnimated : undefined;

		if (!source) {
			return null;
		}
		return (
			<AnimatedImageBackground
				{...rest}
				source={this.getAssetVersions(source)}
				style={{ ...this.imageStyles, opacity } as any}
				onLoadStart={this.onLoadStart}
				onLoad={this.onImageLoad}
				onLoadEnd={this.onImageLoadFail}
				testID="progressive-image-main"
			/>
		);
	};

	private getAssetVersions = (
		source: BlueBaseImageProps['source']
	): BlueBaseImageProps['source'] => {
		if (typeof source !== 'string') {
			return source;
		}

		const { theme }: ThemeContextData = this.context;

		// desktop or mobile
		const screen = isMobile() ? 'mobile' : 'desktop';

		// dark or light mode
		const mode = theme.mode;

		return [`${source}_${screen}_${mode}`, `${source}_${screen}`, `${source}_${mode}`, source];
	};

	/**
	 * When thumbnail is loaded, animate it to visibility
	 * Hide any placeholder or skeletons if they're visible
	 */
	private handleThumbnailLoad = () => {
		Animated.timing(this.thumbnailAnimated, {
			duration: 5000,
			toValue: 1,
			useNativeDriver: true,
		}).start();

		this.setState({
			showPlaceholder: false,
			showSkeleton: false,
		});
	};

	/**
	 * When image starts loading
	 */
	private onLoadStart = () => {
		this.setState({
			loadingStartedAt: Date.now(),
		});
	};

	/**
	 * When main image is loaded, animate it to visibility
	 * Hide any placeholder or skeletons if they're visible
	 */
	private onImageLoad = () => {
		const now = Date.now();
		const timeToLoad = now - this.state.loadingStartedAt;

		Animated.timing(this.imageAnimated, {
			duration: timeToLoad > 500 ? 500 : 0,
			toValue: 1,
			useNativeDriver: true,
		}).start();

		this.setState({
			showPlaceholder: false,
			showSkeleton: false,
		});
	};

	/**
	 * When image loading fails, show a placeholder instead.
	 */
	private onImageLoadFail = () => {
		this.setState({
			showPlaceholder: true,
			showSkeleton: false,
		});
	};
}
export { ProgressiveImageBackground };
