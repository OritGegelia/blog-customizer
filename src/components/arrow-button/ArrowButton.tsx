import clsx from 'clsx';

import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

export type OnClick = () => void;

type ArrowButtonProps = {
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	onClick,
	isOpen,
}) => {
	return (
		<div
			role='button'
			aria-label={
				isOpen
					? 'Закрыть форму параметров статьи'
					: 'Открыть форму параметров статьи'
			}
			tabIndex={0}
			onClick={onClick}
			className={clsx(styles.container, {
				[styles.container_open]: isOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: isOpen,
				})}
			/>
		</div>
	);
};
