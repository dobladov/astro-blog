// Unit conversion and amount formatting, used both at build time
// (initial render) and in the browser (servings multiplier / unit toggle).
// Cooking-friendly round factors: 1 tsp = 5 ml, 1 tbsp = 15 ml, 1 cup = 240 ml.

export type System = "metric" | "us";

const METRIC = new Set(["g", "kg", "ml", "l", "cm"]);
const US = new Set(["tsp", "tbsp", "cup", "oz", "lb", "in"]);

export interface Quantity {
  amount: number;
  unit: string | null;
}

export const convert = (
  amount: number,
  unit: string | null,
  target: System,
): Quantity => {
  if (!unit) return { amount, unit };

  if (target === "us") {
    if (!METRIC.has(unit)) return { amount, unit };
    switch (unit) {
      case "g":
      case "kg": {
        const grams = unit === "kg" ? amount * 1000 : amount;
        return grams >= 454
          ? { amount: grams / 453.6, unit: "lb" }
          : { amount: grams / 28.35, unit: "oz" };
      }
      case "ml":
      case "l": {
        const ml = unit === "l" ? amount * 1000 : amount;
        if (ml < 15) return { amount: ml / 5, unit: "tsp" };
        if (ml < 60) return { amount: ml / 15, unit: "tbsp" };
        return { amount: ml / 240, unit: "cup" };
      }
      case "cm":
        return { amount: amount / 2.54, unit: "in" };
    }
  }

  // target === "metric" — tsp/tbsp are left alone, spoons are universal
  switch (unit) {
    case "cup": {
      const ml = amount * 240;
      return ml >= 1000 ? { amount: ml / 1000, unit: "l" } : { amount: ml, unit: "ml" };
    }
    case "oz":
      return { amount: amount * 28.35, unit: "g" };
    case "lb": {
      const grams = amount * 453.6;
      return grams >= 1000
        ? { amount: grams / 1000, unit: "kg" }
        : { amount: grams, unit: "g" };
    }
    case "in":
      return { amount: amount * 2.54, unit: "cm" };
  }

  // Metric units scaled past 1000 read better in the next unit up
  if (unit === "g" && amount >= 1000) return { amount: amount / 1000, unit: "kg" };
  if (unit === "ml" && amount >= 1000) return { amount: amount / 1000, unit: "l" };
  return { amount, unit };
};

const VULGARS: Array<[number, string]> = [
  [1 / 8, "⅛"],
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [1 / 2, "½"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
];

// Units where fractions read naturally ("½ cup", "1½ tbsp"); null (bare
// counts like "2 eggs") formats the same way
const FRACTIONAL = new Set([
  "tsp",
  "tbsp",
  "cup",
  "pinch",
  "clove",
  "slice",
  "can",
  "piece",
  "sheet",
  "block",
  "in",
]);

const trim = (value: number): string => String(Number.parseFloat(value.toFixed(2)));

export const formatAmount = (amount: number, unit: string | null): string => {
  if (unit === null || FRACTIONAL.has(unit)) {
    const whole = Math.floor(amount + 1e-9);
    const fraction = amount - whole;
    if (fraction < 0.03) return String(whole);
    const vulgar = VULGARS.find(([value]) => Math.abs(fraction - value) < 0.05);
    if (vulgar) return whole ? `${whole}${vulgar[1]}` : vulgar[1];
    return trim(Math.round(amount * 10) / 10);
  }
  if (unit === "kg" || unit === "l" || unit === "lb") {
    return trim(Math.round(amount * 100) / 100);
  }
  if (unit === "oz") return trim(Math.round(amount * 10) / 10);
  // g, ml, cm
  return amount < 10 ? trim(Math.round(amount * 10) / 10) : String(Math.round(amount));
};

const PLURALS: Record<string, string> = {
  cup: "cups",
  pinch: "pinches",
  clove: "cloves",
  slice: "slices",
  can: "cans",
  sheet: "sheets",
  piece: "pieces",
  sprig: "sprigs",
  stalk: "stalks",
  stick: "sticks",
  block: "blocks",
  bunch: "bunches",
  handful: "handfuls",
};

export const displayUnit = (unit: string, amount: number): string =>
  amount > 1 ? (PLURALS[unit] ?? unit) : unit;
