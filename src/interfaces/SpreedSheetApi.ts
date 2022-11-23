export interface SpreedSheet {
  cols: Col[];
  rows: Row[];
  parsedNumHeaders: number;
}

export interface Col {
  id: string;
  label: string;
  type: string;
  pattern?: string;
}

export interface Row {
  c: C[];
}

export interface C {
  v: boolean | number | string;
  f?: string;
}
