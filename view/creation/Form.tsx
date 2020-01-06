import { FC, ChangeEvent } from 'react';

export class Errors {
  private errors: { [name: string]: string } = {};
  addError(name: string, detail: string) {
    this.errors[name] = detail;
  }

  getErrors(): { [name: string]: string } {
    return this.errors;
  }
}

export type SchemeKind = 'string' | 'number' | 'date' | 'option' | 'check';

export type Scheme = {
  type: SchemeKind;
  value: any;
};

export type Schema = {
  [key: string]: Scheme | Schema;
};

const isScheme = (v: Scheme | Schema): v is Scheme =>
  typeof v === 'object' && 'type' in v;

const schemeElement = (
  key: string,
  v: Scheme,
  setter: (ref: Scheme) => (e: ChangeEvent<HTMLInputElement>) => void
) => {
  switch (v.type) {
    case 'string':
      return <input defaultValue={v.value} onChange={setter(v)} />;
    case 'date':
      return <input type="date" defaultValue={v.value} onChange={setter(v)} />;
    case 'number':
      return (
        <input type="number" defaultValue={v.value} onChange={setter(v)} />
      );
    case 'check':
      return (
        <input type="checkbox" defaultValue={v.value} onChange={setter(v)} />
      );
    case 'option':
      return (
        <>
          <input
            defaultValue={v.value[0]}
            list={`list-${key}`}
            onChange={setter(v)}
          />
          <datalist id={`list-${key}`}>
            {v.value.map((m: string) => (
              <option value={m}></option>
            ))}
          </datalist>
        </>
      );
    default:
      return <input />;
  }
};

const formElements = (
  schema: Schema,
  setter: (ref: Scheme) => (e: ChangeEvent<HTMLInputElement>) => void
): JSX.Element[] => {
  return Object.entries(schema).map(([key, v]) => {
    if (!isScheme(v)) {
      return (
        <div key={key}>
          <label>{key}</label>
          {formElements(v, setter)}
        </div>
      );
    }
    const body = schemeElement(key, v, setter);
    return (
      <div key={key}>
        <label>{key}</label>
        {body}
      </div>
    );
  });
};

export function Form<S extends Schema, T>(
  defaultValue: S,
  validator: (value: any) => boolean,
  exporter: (value: S) => T
): FC<{ onClick: (value: T) => void }> {
  let value = { ...defaultValue };
  const setter = (ref: Scheme) => (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cloned = { ...value };
    ref.value = input;
    if (!validator(value)) {
      value = cloned; // Go back to as before
      return;
    }
  };
  return ({ onClick }) => (
    <>
      {formElements(value, setter)}
      <button
        onClick={() => {
          if (!validator(value)) {
            return;
          }
          onClick(exporter(value));
        }}
      >
        送信
      </button>
    </>
  );
}