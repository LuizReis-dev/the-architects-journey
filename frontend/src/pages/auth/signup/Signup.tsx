import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/button/Button";
import FormInput from "../../../components/form-input/FormInput";
import { useI18n, type Language, type Translation } from "../../../i18n/I18nProvider";
import StageLayout from "../../../layouts/stage-layout/StageLayout";
import { characters, professor } from "../../../shared/characters";
import { PixelSprite } from "../../../shared/pixel-sprite";
import "./Signup.css";

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

type SignupErrors = {
  character?: string;
  name?: string;
  email?: string;
  password?: string;
};

function validateSignup(
  characterId: string | null,
  name: string,
  email: string,
  password: string,
  t: Translation,
) {
  const errors: SignupErrors = {};

  if (!characterId) {
    errors.character = t.signup.characterRequired;
  }

  if (!name.trim()) {
    errors.name = t.validation.required;
  }

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

export default function Signup() {
  const { language, setLanguage, t } = useI18n();
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const validation = validateSignup(selectedCharacterId, name, email, password, t);
    setErrors(validation.errors);

    console.log(t.signup.validationLog, {
      language,
      characterId: selectedCharacterId,
      name,
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

      <section className="screen signup-screen">
        <div className="logo signup-logo">
          <h1>{t.signup.appTitle}</h1>
        </div>

        <div className="signup-panel">
          <div className="signup-dialogue">
            <div className="dialogue">
              <div className="who">
                <PixelSprite character={professor} scale={4} />
              </div>
              <p>
                <span className="name-tag">{t.signup.dialogueName}</span>
                {t.signup.dialogue}
                <span className="caret" />
              </p>
            </div>
          </div>

          <form className="gb-window" onSubmit={handleSubmit}>
            <div className="signup-header">
              <div>
                <div className="eyebrow">{t.signup.eyebrow}</div>
                <div className="win-title">{t.signup.title}</div>
              </div>
              <div className="eyebrow signup-role">{t.signup.role}</div>
            </div>

            <div className="signup-form-spacer" />

            <div className="eyebrow signup-character-label">{t.signup.chooseCharacter}</div>
            <div className="character-grid">
              {characters.map((character, index) => {
                const selected = selectedCharacterId === character.id;

                return (
                  <button
                    key={character.id}
                    className={`character-card${selected ? " selected" : ""}`}
                    type="button"
                    onClick={() => {
                      setSelectedCharacterId(character.id);
                      setErrors((current) => ({ ...current, character: undefined }));
                    }}
                  >
                    <span className="pointer" />
                    <PixelSprite character={character} scale={6} bob={selected} />
                    <span className="plate">P{index + 1}</span>
                  </button>
                );
              })}
            </div>

            <div className="field-err signup-character-error">
              {errors.character ? (
                <>
                  <span>{errors.character}</span>
                </>
              ) : null}
            </div>

            <div className="signup-grid">
              <FormInput
                label={t.signup.name}
                icon="@"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t.signup.namePlaceholder}
                error={errors.name}
                autoComplete="name"
              />

              <FormInput
                label={t.signup.email}
                icon="@"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t.signup.emailPlaceholder}
                error={errors.email}
                spellCheck={false}
                autoComplete="email"
              />
            </div>

            <FormInput
              label={t.signup.password}
              icon="#"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t.signup.passwordPlaceholder}
              error={errors.password}
              revealLabel={showPassword ? t.signup.hidePassword : t.signup.showPassword}
              onReveal={() => setShowPassword((current) => !current)}
              autoComplete="new-password"
            />

            <div className="signup-submit-spacer" />
            <Button type="submit">{t.signup.submit}</Button>

            <div className="sep" />

            <div className="row-link">
              <span>{t.signup.haveAccount}</span>
              <Link className="link" to="/">
                {t.signup.signIn}
              </Link>
            </div>
          </form>
        </div>
      </section>
    </StageLayout>
  );
}
