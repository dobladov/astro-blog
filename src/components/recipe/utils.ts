// Recipe tree — the format from https://recipetables.com, as described in
// https://joshnesbitt.dev/thoughts/recipe-data-your-mind-can-make-sense-of
// Leaves are ingredients, nodes are actions combining everything beneath them.

export interface RecipeAction {
  action: string;
  from: TableNode[];
}

export type TableNode = string | RecipeAction;

export const isAction = (node: TableNode): node is RecipeAction =>
  typeof node !== "string";

/** Ingredients (leaves) of a tree, in reading order */
export const leaves = (node: TableNode): string[] =>
  isAction(node) ? node.from.flatMap(leaves) : [node];

export interface ParsedIngredient {
  amount: number | null;
  unit: string | null;
  rest: string;
}

const FRACTION_CHARS: Record<string, number> = {
  "½": 1 / 2,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "¼": 1 / 4,
  "¾": 3 / 4,
  "⅛": 1 / 8,
};

const UNIT_ALIASES: Record<string, string> = {
  g: "g",
  gram: "g",
  grams: "g",
  kg: "kg",
  ml: "ml",
  l: "l",
  litre: "l",
  litres: "l",
  liter: "l",
  liters: "l",
  tsp: "tsp",
  teaspoon: "tsp",
  teaspoons: "tsp",
  tbsp: "tbsp",
  tablespoon: "tbsp",
  tablespoons: "tbsp",
  cup: "cup",
  cups: "cup",
  oz: "oz",
  ounce: "oz",
  ounces: "oz",
  lb: "lb",
  lbs: "lb",
  pound: "lb",
  pounds: "lb",
  cm: "cm",
  in: "in",
  inch: "in",
  inches: "in",
  pinch: "pinch",
  pinches: "pinch",
  clove: "clove",
  cloves: "clove",
  slice: "slice",
  slices: "slice",
  can: "can",
  cans: "can",
  sheet: "sheet",
  sheets: "sheet",
  piece: "piece",
  pieces: "piece",
  sprig: "sprig",
  sprigs: "sprig",
  stalk: "stalk",
  stalks: "stalk",
  stick: "stick",
  sticks: "stick",
  block: "block",
  blocks: "block",
  knob: "knob",
  bunch: "bunch",
  bunches: "bunch",
  handful: "handful",
  handfuls: "handful",
};

const parseAmount = (text: string): number => {
  const trimmed = text.trim();
  const unicode = trimmed.match(/^(\d+)?\s*([½⅓⅔¼¾⅛])$/);
  if (unicode?.[2]) {
    return (
      (unicode[1] ? Number(unicode[1]) : 0) + (FRACTION_CHARS[unicode[2]] ?? 0)
    );
  }
  const vulgar = trimmed.match(/^(?:(\d+)\s+)?(\d+)\/(\d+)$/);
  if (vulgar) {
    return (
      (vulgar[1] ? Number(vulgar[1]) : 0) + Number(vulgar[2]) / Number(vulgar[3])
    );
  }
  return Number.parseFloat(trimmed.replace(",", "."));
};

/**
 * Split an ingredient line ("250 g flour", "2 eggs", "1 clove garlic, grated")
 * into a scalable amount, a canonical unit and the remaining text.
 * Lines that don't match (ranges, "a pinch of salt") stay static.
 */
export const parseIngredient = (raw: string): ParsedIngredient => {
  const text = raw.trim();
  const match = text.match(
    /^((?:\d+\s+)?\d+\/\d+|\d+(?:[.,]\d+)?\s*[½⅓⅔¼¾⅛]?|[½⅓⅔¼¾⅛])\s*(.+)$/,
  );
  if (!match || !match[1] || !match[2]) {
    return { amount: null, unit: null, rest: text };
  }
  const remainder = match[2];
  // Ranges ("1-2 tbsp") and fractions split oddly — leave them static
  if (/^[-–—/]/.test(remainder)) return { amount: null, unit: null, rest: text };
  const amount = parseAmount(match[1]);
  if (!Number.isFinite(amount)) return { amount: null, unit: null, rest: text };
  const unitMatch = remainder.match(/^([a-zA-Z]+)\.?\s*(.*)$/);
  const unit = unitMatch?.[1]
    ? (UNIT_ALIASES[unitMatch[1].toLowerCase()] ?? null)
    : null;
  const rest = unit && unitMatch ? (unitMatch[2] ?? "") : remainder;
  return { amount, unit, rest };
};

// Allergen / diet auto-detection — keyword based, so it errs on the side of
// warning. Frontmatter `allergens` extends the list, `diet` overrides.

const ALLERGEN_PATTERNS: Array<[string, RegExp]> = [
  [
    "gluten",
    /\b(flour|wheat|bread|breadcrumbs?|panko|pasta|noodles?|udon|ramen|soy sauce|seitan|barley|rye|beer|wrappers?|roux|couscous|semolina)\b/,
  ],
  ["soy", /\b(soy|soya|tofu|edamame|miso|tempeh)\b/],
  ["egg", /\b(eggs?|mayonnaise|mayo|aioli)\b/],
  [
    "dairy",
    /\b(milk|butter|cheese|cream|yogh?urt|ghee|parmesan|mozzarella|feta)\b/,
  ],
  ["nuts", /\b(almonds?|walnuts?|cashews?|hazelnuts?|pistachios?|pecans?)\b/],
  ["peanuts", /\b(peanuts?|groundnut)\b/],
  ["sesame", /\b(sesame|tahini)\b/],
  [
    "fish",
    /\b(fish|anchov(?:y|ies)|salmon|tuna|cod|sardines?|dashi|bonito|katsuobushi|worcestershire)\b/,
  ],
  [
    "shellfish",
    /\b(shrimps?|prawns?|crabs?|lobsters?|oysters?|mussels?|clams?|squid)\b/,
  ],
  ["mustard", /\bmustard\b/],
  ["celery", /\bceleriac|celery\b/],
  ["sulphites", /\bwine\b/],
];

const MEAT =
  /\b(pork|beef|chicken|lamb|veal|duck|turkey|bacon|ham|jam[oó]n|serrano|iberico|chorizo|sausages?|mince|meat|steak|prosciutto|pancetta|salami|lard)\b/;

const FISH =
  /\b(fish|salmon|tuna|cod|anchov|sardine|prawn|shrimp|crab|lobster|dashi|bonito|katsuobushi|oyster|squid|octopus|mussel|clam|eel|unagi)\b/;

const ANIMAL_PRODUCT =
  /\b(eggs?|milk|butter|cheese|cream|yogh?urt|honey|mayonnaise|mayo|ghee|gelatine?)\b/;

export const detectAllergens = (ingredients: string[]): string[] => {
  const joined = ingredients.join("\n").toLowerCase();
  return ALLERGEN_PATTERNS.filter(([, pattern]) => pattern.test(joined)).map(
    ([name]) => name,
  );
};

export const detectDiet = (
  ingredients: string[],
): "vegan" | "vegetarian" | null => {
  const joined = ingredients.join("\n").toLowerCase();
  if (MEAT.test(joined) || FISH.test(joined)) return null;
  return ANIMAL_PRODUCT.test(joined) ? "vegetarian" : "vegan";
};

export const formatMinutes = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
};
