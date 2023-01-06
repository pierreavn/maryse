export type Preferences = {
  lang: string;
  repos: PreferencesRepo[];
};

export type PreferencesRepo = {
  url: string;
  slug: string;
};
