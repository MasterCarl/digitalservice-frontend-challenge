import { DataContributionMeta } from "../App";

export const parentOrganizationMap = {
  "Statistisches Bundesamt": "Bundesministerium des Innern",
  mCLOUD: "Bundesministerium für Digitales und Verkehr",
  "Bundesamt für Justiz": "Bundesministerium der Justiz",
  "Deutsches Patent- und Markenamt": "Bundesministerium der Justiz",
  "Bundesanstalt für Arbeitsschutz und Arbeitsmedizin":
    "Bundesministerium für Arbeit und Soziales",
  /* "Bundesinstitut für Bau-, Stadt- und Raumforschung …) im Bundesamt für Bauwesen und Raumordnung (BBR)":
    "",
  Generalzolldirektion: "",
  "Max Rubner-Institut": "",
  "ITZ-Bund": "",
  "Bundeszentralamt für Steuern": "",
  Bundesverwaltungsamt: "",
  "Bundesamt für Soziale Sicherung": "",
  Bundessortenamt: "",
  Bundesausgleichsamt: "",
  "Bundesanstalt für Materialforschung und -prüfung ": "",
  "Bundesamt für Verbraucherschutz und Lebensmittelsicherheit": "",
  "Bundesamt für Wirtschaft und Ausfuhrkontrolle": "", */
};

export const isMinistry = (datum: DataContributionMeta) => {
  const name = datum.department.trim().toLowerCase();
  return name.includes("bundesministerium") || name === "auswärtiges amt";
};
