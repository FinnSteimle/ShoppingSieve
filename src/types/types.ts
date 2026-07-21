export interface Product {
  id: string;
  name: string;
  rawIngredientsText: string;
  avoidedIngredientsFound?: string[];
  isSafe?: boolean;
}
