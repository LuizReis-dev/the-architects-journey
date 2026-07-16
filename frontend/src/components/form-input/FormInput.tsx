import type { InputHTMLAttributes } from "react";

type FormInputProps = {
  label: string;
  icon?: string;
  error?: string;
  revealLabel?: string;
  onReveal?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  label,
  icon,
  error,
  revealLabel,
  onReveal,
  ...inputProps
}: FormInputProps) {
  return (
    <div className="field">
      <div className="field-label">
        <span>{label}</span>
        {revealLabel ? (
          <button className="reveal" type="button" onClick={onReveal}>
            {revealLabel}
          </button>
        ) : null}
      </div>

      <label className={`field-input${error ? " invalid" : ""}`}>
        {icon ? <span className="ic">{icon}</span> : null}
        <input {...inputProps} />
      </label>

      <div className="field-err">
        {error ? (
          <>
            <span>{error}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
