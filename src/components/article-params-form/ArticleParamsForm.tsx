import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import { useCloseByOverlay } from 'src/hooks/useCloseByOverlay';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	setNewArticle: (selectedValues: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	setNewArticle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState({
		font: defaultArticleState.fontFamilyOption,
		size: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		bgColor: defaultArticleState.backgroundColor,
		width: defaultArticleState.contentWidth,
	});

	const formRef = useRef<HTMLDivElement | null>(null);

	const changeOpenState = () => {
		setIsOpen(!isOpen);
	};

	useCloseByOverlay({
		optionRef: formRef,
		onChange: changeOpenState,
		state: isOpen,
	});

	const handleSettingsReset = () => {
		setSelectedValue({
			font: defaultArticleState.fontFamilyOption,
			size: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			bgColor: defaultArticleState.backgroundColor,
			width: defaultArticleState.contentWidth,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const currentValues = {
			fontFamilyOption: selectedValue.font,
			fontColor: selectedValue.fontColor,
			backgroundColor: selectedValue.bgColor,
			contentWidth: selectedValue.width,
			fontSizeOption: selectedValue.size,
		};
		setNewArticle(currentValues);
	};

	const handleSelectChange = (
		optionType: string,
		selectedOption: OptionType
	) => {
		setSelectedValue((prevOptions) => ({
			...prevOptions,
			[optionType]: selectedOption,
		}));
	};

	return (
		<>
			<div ref={formRef}>
				<ArrowButton onClick={changeOpenState} isOpen={isOpen} />
				<aside
					className={`${styles.container} ${
						isOpen ? styles.container_open : ''
					}`}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text as='h2' weight={800} size={25} uppercase>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							placeholder='Выберите шрифт'
							options={fontFamilyOptions}
							selected={selectedValue.font}
							onChange={(font) => handleSelectChange('font', font)}
						/>
						<RadioGroup
							title={'Размер шрифта'}
							name={'str'}
							options={fontSizeOptions}
							selected={selectedValue.size}
							onChange={(size) => handleSelectChange('size', size)}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={selectedValue.fontColor}
							onChange={(fontColor) =>
								handleSelectChange('fontColor', fontColor)
							}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={selectedValue.bgColor}
							onChange={(bgColor) => handleSelectChange('bgColor', bgColor)}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={selectedValue.width}
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
			</div>
		</>
	);
};
