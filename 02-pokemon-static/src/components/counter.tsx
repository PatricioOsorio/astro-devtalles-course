import { createSignal, type Component, type JSXElement } from 'solid-js';

export interface ICounterProps {
  initialValue: number;
  children?: JSXElement;
}

export const Counter: Component<ICounterProps> = (props) => {
  const [counter, setCounter] = createSignal(props.initialValue);

  const handleIncrement = () => setCounter((prev) => prev + 1);
  const handleDecrement = () => setCounter((prev) => prev - 1);

  return (
    <>
      {props.children}

      <p>Value: {counter()}</p>
      <div class="flex gap-4">
        <button class="btn btn--primary" onClick={handleIncrement}>
          +1
        </button>
        <button class="btn btn--primary" onClick={handleDecrement}>
          -1
        </button>
      </div>
    </>
  );
};
