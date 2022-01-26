import { CommiFooter } from '../CommiFooter';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiFooter/Main/CommiFooter', module)
	.add('Normal State', () => (
		<CommiFooter
			brandName="Orient"
			tagline="BlueEast (Orient Group), 26 km, Multan Rd, Maraka, Maraka Village, Lahore, Punjab 54000."
			lists={[
				{
					title: 'Company',

					items: [
						{ title: 'About Us', href: '/' },
						{ title: 'Contact Us', href: '/' },
						{ title: 'Legal', href: '/' },
						{ title: 'Privacy Policy', href: '/' },
						{ title: 'Terms of Service', href: '/' },
					],
				},
				{
					title: 'Company',

					items: [
						{ title: 'About Us', href: '/' },
						{ title: 'Contact Us', href: '/' },
						{ title: 'Legal', href: '/' },
						{ title: 'Privacy Policy', href: '/' },
						{ title: 'Terms of Service', href: '/' },
					],
				},
				{
					title: 'Company',

					items: [
						{ title: 'About Us', href: '/' },
						{ title: 'Contact Us', href: '/' },
						{ title: 'Legal', href: '/' },
						{ title: 'Privacy Policy', href: '/' },
						{ title: 'Terms of Service', href: '/' },
					],
				},
			]}
			apps={{
				appleAppStore: 'https://facebook.com/blueeasttech',
				googlePlayStore: 'https://facebook.com/blueeasttech',
			}}
			social={{
				items: [
					{ name: 'facebook', href: 'https://facebook.com/blueeasttech' },
					{ name: 'twitter', href: '/' },
					{ name: 'instagram', href: '/' },
					{ name: 'youtube', href: '/' },
					{ name: 'linkedin', href: '/' },
				],
			}}
			partnerBrands={{
				items: [
					{
						href: 'https://facebook.com/blueeasttech',
						name: 'Orient',
						uri: require('./logo-orient.png'),
					},
					{
						href: 'https://facebook.com/blueeasttech',
						name: 'Orient',
						uri: require('./logo-orient.png'),
					},
					{
						href: 'https://facebook.com/blueeasttech',
						name: 'Orient',
						uri: require('./logo-orient.png'),
					},
				],
			}}
		/>
	))
	.add('Without apps', () => (
		<CommiFooter
			brandName="Orient"
			tagline="BlueEast (Orient Group), 26 km, Multan Rd, Maraka, Maraka Village, Lahore, Punjab 54000."
			lists={[
				{
					title: 'Company',

					items: [
						{ title: 'About Us', href: '/' },
						{ title: 'Contact Us', href: '/' },
						{ title: 'Legal', href: '/' },
						{ title: 'Privacy Policy', href: '/' },
						{ title: 'Terms of Service', href: '/' },
					],
				},
				{
					title: 'Company',

					items: [
						{ title: 'About Us', href: '/' },
						{ title: 'Contact Us', href: '/' },
						{ title: 'Legal', href: '/' },
						{ title: 'Privacy Policy', href: '/' },
						{ title: 'Terms of Service', href: '/' },
					],
				},
				{
					title: 'Company',

					items: [
						{ title: 'About Us', href: '/' },
						{ title: 'Contact Us', href: '/' },
						{ title: 'Legal', href: '/' },
						{ title: 'Privacy Policy', href: '/' },
						{ title: 'Terms of Service', href: '/' },
					],
				},
			]}
			social={{
				items: [
					{ name: 'facebook', href: 'https://facebook.com/blueeasttech' },
					{ name: 'twitter', href: '/' },
					{ name: 'instagram', href: '/' },
					{ name: 'youtube', href: '/' },
					{ name: 'linkedin', href: '/' },
				],
			}}
			partnerBrands={{
				items: [
					{
						href: 'https://facebook.com/blueeasttech',
						name: 'Orient',
						uri: require('./logo-orient.png'),
					},
					{
						href: 'https://facebook.com/blueeasttech',
						name: 'Orient',
						uri: require('./logo-orient.png'),
					},
					{
						href: 'https://facebook.com/blueeasttech',
						name: 'Orient',
						uri: require('./logo-orient.png'),
					},
				],
			}}
		/>
	))
	.add('Loading State', () => <CommiFooter loading />);
