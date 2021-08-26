import { ReactElement, SyntheticEvent } from 'react';

interface Props {
    child?: string | ReactElement;
    text?: string;
    className?: string;
    onClick: (event: SyntheticEvent) => void;
    disabled?: boolean;
}

export default function Button({ child, text, className, onClick, disabled }: Props) {
    var defaultClasses = 'flex items-center justify-center shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded';
    if (className) defaultClasses += ` ${className}`;

    return (
        <button className={defaultClasses} onClick={onClick} disabled={disabled}>
            {child && child}
            {text && text}
        </button>
    );
}
