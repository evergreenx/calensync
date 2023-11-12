export interface Timezone {
  value: string;

  text: string;
}

declare const timezones: Timezone[];

export global {
  timezones;
}
