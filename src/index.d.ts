declare const COLOR: {
  BLACK: string;
  RED: string;
  GREEN: string;
  YELLOW: string;
  BLUE: string;
  MAGENTA: string;
  CYAN: string;
  WHITE: string;
  BRIGHT_BLACK: string;
  BRIGHT_RED: string;
  BRIGHT_GREEN: string;
  BRIGHT_YELLOW: string;
  BRIGHT_BLUE: string;
  BRIGHT_MAGENTA: string;
  BRIGHT_CYAN: string;
  BRIGHT_WHITE: string;
};

declare class Printer {
  constructor(options?: any);
}
declare namespace dialog {
  function question(ques?: any): void;
  function select(question: any, options: any): any;
}
declare namespace tty {
  function clear(): void;
}
export { COLOR, Printer, dialog, tty };
