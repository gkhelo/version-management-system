export type SnackbarMessage = {
  message: string | null;
  status: number | null;
  severity: Severity;
};

export enum Severity {
  SUCCESS = "success",
  ERROR = "error",
}
