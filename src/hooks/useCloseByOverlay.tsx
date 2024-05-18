import { useEffect } from 'react';

type UseCloseByOverlay = {
	optionRef: React.RefObject<HTMLDivElement>;
	onChange: () => void;
	state: boolean;
};

export const useCloseByOverlay = ({
	optionRef,
	onChange,
	state,
}: UseCloseByOverlay) => {
	useEffect(() => {
		if (!state) return;

		const closeByOverlay = (e: MouseEvent) => {
			if (state && !optionRef.current?.contains(e.target as Node)) {
				onChange();
			}
		};

		window.addEventListener('mousedown', closeByOverlay);

		return () => {
			window.removeEventListener('mousedown', closeByOverlay);
		};
	}, [optionRef, onChange, state]);
};
