import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	title: 'Components/ArrowButton',
	component: ArrowButton,
	argTypes: {
		onClick: { action: 'clicked' },
		isOpen: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const Default: Story = {
	args: {
		isOpen: false,
		onClick: () => {
			console.log('ArrowButton clicked');
		},
	},
};

export const Interactive: Story = {
	render: (args) => {
		const isOpen = true;

		const handleClick = () => {
			isOpen;
			args.onClick();
		};

		return <ArrowButton isOpen={isOpen} onClick={handleClick} />;
	},
};
