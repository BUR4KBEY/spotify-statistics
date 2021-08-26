import { Dispatch, SetStateAction } from 'react';

interface Props {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
    value: string;
    label: string;
}

export default function CustomRadioButton({ state, setState, value, label }: Props) {
    return (
        <label className="flex items-center font-bold text-purple-400">
            <input className="mr-2 leading-tight text-purple-400" type="radio" onChange={() => setState(value)} checked={state === value} />
            <span className="text-sm">{label}</span>
        </label>
    );
}
