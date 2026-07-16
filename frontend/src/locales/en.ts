import type pt from "./pt";

const en = {
  language: {
    pt: "PT",
    en: "EN",
    toggleLabel: "Select language",
  },
  login: {
    appTitle: "THE ARCHITECT'S JOURNEY",
    appSubtitle: "A Software Architecture RPG",
    eyebrow: "CONTINUE",
    title: "Welcome back!",
    email: "EMAIL",
    password: "PASSWORD",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "........",
    showPassword: "show",
    hidePassword: "hide",
    forgotPassword: "Forgot my password",
    submit: "CONTINUE",
    noAccount: "No account yet?",
    createCharacter: "CREATE CHARACTER",
    hint: "v PRESS ENTER v",
    validationLog: "login form validation",
  },
  signup: {
    appTitle: "THE ARCHITECT'S JOURNEY",
    dialogueName: "Prof. Turing",
    dialogue:
      "Hello! I'm Prof. Turing. Every great architecture starts with one person, so tell me: who are you?",
    eyebrow: "NEW GAME",
    title: "Who are you?",
    role: "You begin as an INTERN",
    chooseCharacter: "CHOOSE YOUR CHARACTER",
    characterRequired: "Pick a character to continue.",
    name: "NAME",
    namePlaceholder: "What should I call you?",
    email: "EMAIL",
    password: "PASSWORD",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "........",
    showPassword: "show",
    hidePassword: "hide",
    submit: "START JOURNEY",
    haveAccount: "Already have an account?",
    signIn: "LOG IN",
    validationLog: "signup form validation",
  },
  validation: {
    required: "Please fill in this field.",
    invalidEmail: "Invalid email. Check it and try again.",
    shortPassword: "Password needs at least 6 characters.",
  },
} satisfies typeof pt;

export default en;
