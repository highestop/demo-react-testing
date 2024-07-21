import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState, useEffect } from 'react';

function App(props: {
    value?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (value: string) => {};
    onRendered?: () => void;
}) {
    const initialValue = useRef<string>(props.value ?? '');
    const [editingValue, setEditingValue] = useState(initialValue.current);
    useEffect(() => {
        props.onRendered?.();
    });
    return (
        <input
            data-testid="demo-input"
            value={editingValue}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            onChange={(e) => {
                const currentValue = e.target.value;
                setEditingValue(currentValue);
                props.onChange?.(currentValue);
            }}
        ></input>
    );
}

function renderApp(props: Parameters<typeof App>[0]) {
    render(<App {...props} />);
    return screen.getByTestId('demo-input') as HTMLInputElement;
}

describe('demo test', () => {
    it('initial value', () => {
        const input = renderApp({ value: '1' });
        expect(input.value).toBe('1');
    });
    it('focus', () => {
        const fn = jest.fn();
        const input = renderApp({ onFocus: fn });
        input.focus();
        expect(fn).toHaveBeenCalledTimes(1);
    });
    it('type', () => {
        const onChangeFn = jest.fn();
        const input = renderApp({
            value: '1',
            onChange: onChangeFn,
        });
        userEvent.type(input, '2');
        expect(onChangeFn).toHaveBeenCalled();
        expect(input.value).toBe('12');
    });
});
