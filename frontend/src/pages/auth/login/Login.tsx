import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/button/Button";
import FormInput from "../../../components/form-input/FormInput";
import { useI18n, type Language, type Translation } from "../../../i18n/I18nProvider";
import StageLayout from "../../../layouts/stage-layout/StageLayout";
import "./Login.css";

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

type LoginErrors = {
  email?: string;
  password?: string;
};

function validateLogin(email: string, password: string, t: Translation) {
  const errors: LoginErrors = {};

  if (!email.trim()) {
    errors.email = t.validation.required;
  } else if (!emailOk(email)) {
    errors.email = t.validation.invalidEmail;
  }

  if (!password) {
    errors.password = t.validation.required;
  } else if (password.length < 6) {
    errors.password = t.validation.shortPassword;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export default function Login() {
  const { language, setLanguage, t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const validation = validateLogin(email, password, t);
    setErrors(validation.errors);

    console.log(t.login.validationLog, {
      language,
      email,
      passwordLength: password.length,
      ...validation,
    });
  };

  return (
    <StageLayout>
      <div className="language-toggle" aria-label={t.language.toggleLabel}>
        {(["pt", "en"] as Language[]).map((option) => (
          <button
            key={option}
            className={language === option ? "on" : ""}
            type="button"
            onClick={() => setLanguage(option)}
          >
            {t.language[option]}
          </button>
        ))}
      </div>

      <section className="screen login-screen">
        <div className="logo">
          <h1>{t.login.appTitle}</h1>
          <div className="sub">{t.login.appSubtitle}</div>
        </div>

        <div className="login-panel">
          <form className="gb-window" onSubmit={handleSubmit}>
            <div className="eyebrow">{t.login.eyebrow}</div>
            <div className="win-title">{t.login.title}</div>

            <div className="login-form-spacer" />

            <FormInput
              label={t.login.email}
              icon="@"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.login.emailPlaceholder}
              error={errors.email}
              autoFocus
              spellCheck={false}
              autoComplete="email"
            />

            <FormInput
              label={t.login.password}
              icon="#"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t.login.passwordPlaceholder}
              error={errors.password}
              revealLabel={showPassword ? t.login.hidePassword : t.login.showPassword}
              onReveal={() => setShowPassword((current) => !current)}
              autoComplete="current-password"
            />

            <div className="login-forgot">
              <button className="link subtle" type="button">
                {t.login.forgotPassword}
              </button>
            </div>

            <Button type="submit">{t.login.submit}</Button>

            <div className="sep" />

            <div className="row-link">
              <span>{t.login.noAccount}</span>
              <Link className="link" to="/signup">
                {t.login.createCharacter}
              </Link>
            </div>
          </form>
        </div>

        <div className="hint">{t.login.hint}</div>
      </section>
    </StageLayout>
  );
}
