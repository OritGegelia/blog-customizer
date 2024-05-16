import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [newValues, setNewValues] = useState<string[]>([]);

	const handleChangeValues = (newValues: string[]) => {
		setNewValues(newValues);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family':
						newValues[0] || defaultArticleState.fontFamilyOption.value,
					'--font-size':
						newValues[1] || defaultArticleState.fontSizeOption.value,
					'--font-color': newValues[2] || defaultArticleState.fontColor.value,
					'--container-width':
						newValues[4] || defaultArticleState.contentWidth.value,
					'--bg-color':
						newValues[3] || defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleChangeValues} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
