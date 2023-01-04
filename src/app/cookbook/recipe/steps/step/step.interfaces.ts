export type StepPart = {
  type: StepPartType;
  raw: string;
  index: number;
  options: string[];
  label?: string;
};

export enum StepPartType {
  TEXT = "text",
  GIZMO = "gizmo",
  INGREDIENT = "ingredient",
}
