import { useEffect, useRef, useState } from "react";

interface ICode {
  key: number;
  value: string;
}

const buildInputs = (size: number): ICode[] => {
  let inputs: ICode[] = [];
  for (var key = 0; key < size; key++) {
    inputs.push({ key, value: "" });
  }
  return inputs;
};

export default function App() {
  const [inputs, setInputs] = useState<ICode[]>(buildInputs(5));

  const ref = useRef<HTMLInputElement>(null);
  const refKey = useRef<number>(0);

  const code = inputs.map(({ value }) => value).join("");

  useEffect(() => {
    if (ref) ref?.current?.focus();
  });

  const handleChange = (value: string): void => {
    const newData = inputs.map((elemet) => {
      if (elemet.key !== refKey.current) return elemet;
      else return { ...elemet, value: value ? value[value.length - 1] : "" };
    });

    setInputs(newData);

    if (value && refKey.current < 4) {
      refKey.current += 1;
    } else if (!value && refKey.current > 0) {
      refKey.current -= 1;
    }
  };

  console.log(code);

  return (
    <div className="app">
      <div className="card">
        <div className="container-title-card">
          <h1>Código</h1>
        </div>
        <div>
          {inputs.map((input) => {
            return (
              <input
                key={input.key}
                className="input"
                type="text"
                value={input.value}
                ref={input.key === refKey.current ? ref : null}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => {
                  refKey.current = input.key;
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
