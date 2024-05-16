import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from '../separator';

type OnSubmit = (newValues: string[]) => void;
interface ChildProps {
	onSubmit: OnSubmit;
}

export const ArticleParamsForm = ({ onSubmit }: ChildProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSelected, setSelected] = useState({
		font: fontFamilyOptions[0],
		size: fontSizeOptions[0],
		fontColor: fontColors[0],
		bgColor: backgroundColors[0],
		width: contentWidthArr[0],
	});

	const formRef = useRef<HTMLFormElement>(null);

	const changeOpenState = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const closeByOverlay = (e: MouseEvent) => {
			if (isOpen && !formRef.current?.contains(e.target as Node)) {
				changeOpenState();
			}
		};

		window.addEventListener('mousedown', closeByOverlay);

		if (!isOpen) {
			return () => {
				window.removeEventListener('mousedown', closeByOverlay);
			};
		}
	}, []);

	const handleSelectChange = (
		optionType: string,
		selectedOption: OptionType
	) => {
		setSelected((prevOptions) => ({
			...prevOptions,
			[optionType]: selectedOption,
		}));
	};

	const handleSettingsReset = () => {
		setSelected({
			font: fontFamilyOptions[0],
			size: fontSizeOptions[0],
			fontColor: fontColors[0],
			bgColor: backgroundColors[0],
			width: contentWidthArr[0],
		});
	};

	// const { font, size, fontColor, bgColor, width } = isSelected;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(Object.values(isSelected).map((option) => option.value));
	};

	return (
		<>
			<ArrowButton onClick={changeOpenState} isOpen={isOpen} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' weight={800} size={25} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						options={fontFamilyOptions}
						selected={isSelected.font}
						onChange={(font) => handleSelectChange('font', font)}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						name={'str'}
						options={fontSizeOptions}
						selected={isSelected.size}
						onChange={(size) => handleSelectChange('size', size)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={isSelected.fontColor}
						onChange={(fontColor) => handleSelectChange('fontColor', fontColor)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={isSelected.bgColor}
						onChange={(bgColor) => handleSelectChange('bgColor', bgColor)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={isSelected.width}
						onChange={(width) => handleSelectChange('width', width)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='submit'
							onClick={handleSettingsReset}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
