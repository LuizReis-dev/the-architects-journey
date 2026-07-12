export type PixelPalette = Record<string, string | null>;

export type PixelCharacter = {
  id: string;
  map: string[];
  palette: PixelPalette;
};

const MAP_SHORT = [
  "......OOOO......",
  "....OOHHHHOO....",
  "...OHHHHHHHHO...",
  "..OHHHHHHHHHHO..",
  "..OHSSSSSSSSHO..",
  "..OHSSSSSSSSHO..",
  "..OHSESSSSESHO..",
  "..OHSSSSSSSSHO..",
  "..OHSSSMMSSSHO..",
  "..OHSSSSSSSSHO..",
  "...OHSSSSSSHO...",
  "....OSSSSSSO....",
  "...OCCCCCCCCO...",
  "..OCCCCWWCCCCO..",
  ".OCCCCCCCCCCCCO.",
  ".OCCCCCCCCCCCCO.",
];

const MAP_LONG = [
  "......OOOO......",
  "....OOHHHHOO....",
  "...OHHHHHHHHO...",
  "..OHHHHHHHHHHO..",
  ".OHHHHHHHHHHHHO.",
  ".OHHSSSSSSSSHHO.",
  ".OHHSESSSSESHHO.",
  ".OHHSSSSSSSSHHO.",
  ".OHHSSSMMSSSHHO.",
  ".OHHSSSSSSSSHHO.",
  ".OHHSSSSSSSSHHO.",
  ".OHHHSSSSSSHHHO.",
  "..OHHCCCCCCHHO..",
  "..OHCCCCWWCCHO..",
  ".OCCCCCCCCCCCCO.",
  ".OCCCCCCCCCCCCO.",
];

const MAP_PROFESSOR = [
  "......OOOO......",
  ".....OHHHHO.....",
  "....OHHHHHHO....",
  "...OHSSSSSSHO...",
  "...OSSSSSSSSO...",
  "...OSESSSSESO...",
  "...OSSSSSSSSO...",
  "...OSSSMMSSSO...",
  "....OWWWWWWO....",
  "....OWWWWWWO....",
  "...OWSSSSSSWO...",
  "...OCCCCCCCCO...",
  "..OCCCWCCWCCCO..",
  ".OCCCCCCCCCCCCO.",
  ".OCCCCCCCCCCCCO.",
  ".OCCCCCCCCCCCCO.",
];

const outline = "#241a2e";
const eye = "#241a2e";

function palette(
  skin: string,
  skinShadow: string,
  hair: string,
  hairShadow: string,
  mouth: string,
  cloth: string,
  clothShadow: string,
) {
  return {
    ".": null,
    O: outline,
    S: skin,
    s: skinShadow,
    H: hair,
    h: hairShadow,
    E: eye,
    M: mouth,
    C: cloth,
    c: clothShadow,
    W: "#fdf6e9",
  };
}

export const characters: PixelCharacter[] = [
  {
    id: "dev_m1",
    map: MAP_SHORT,
    palette: palette("#f2c9a0", "#d9a577", "#6d4527", "#503217", "#b56a5a", "#2f6fb0", "#22538a"),
  },
  {
    id: "dev_m2",
    map: MAP_SHORT,
    palette: palette("#7c4e30", "#603a23", "#1a130f", "#0f0a07", "#5a3522", "#2f9061", "#216947"),
  },
  {
    id: "dev_f1",
    map: MAP_LONG,
    palette: palette("#f2c9a0", "#d9a577", "#b46a2c", "#8a4d1d", "#b56a5a", "#c45397", "#993f74"),
  },
  {
    id: "dev_f2",
    map: MAP_LONG,
    palette: palette("#71462a", "#57341f", "#171210", "#0c0907", "#5a3522", "#6c4bb5", "#503488"),
  },
];

export const professor: PixelCharacter = {
  id: "professor",
  map: MAP_PROFESSOR,
  palette: palette("#e9b98f", "#cf9a6d", "#c9c3cf", "#9a93a6", "#a85f50", "#f3efe6", "#cfc8bb"),
};
