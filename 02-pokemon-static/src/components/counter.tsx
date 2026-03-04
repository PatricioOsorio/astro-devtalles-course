import { createSignal } from 'solid-js';

export const Counter = () => {
  const [counter, setCounter] = createSignal(10);

  const handleIncrement = () => setCounter((prev) => prev + 1);
  const handleDecrement = () => setCounter((prev) => prev - 1);

  return (
    <>
      <h1>Counter</h1>

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
