---
# ── Recipe format ──────────────────────────────────────────────────────────
# Files starting with "_" are excluded from the collection; this one is both
# documentation and a template you can paste to an AI together with your
# rough ingredients and notes:
#
#   "Here is a recipe format (attached). Generate a recipe for <DISH> using
#    this exact frontmatter structure. My ingredients/notes: <NOTES>.
#    Ingredient lines must follow '<amount> <unit> <name>' (e.g. '250 g flour',
#    '2 tbsp soy sauce', '1 clove garlic, grated', '2 eggs') so amounts can be
#    scaled. Use metric units (g, ml) and °C; tsp/tbsp are fine for small
#    amounts. The `table` is a tree read left to
#    right: leaves are ingredients, each `action` combines everything in its
#    `from` list. Method steps are complete sentences, notes are practical
#    tips, keep it faithful to my notes."
#
title: Dish name
description: One or two sentences selling the dish.
pubDate: 2026-08-17
draft: true # remove once the recipe is verified
servings: 4 # base for the servings multiplier
yields: about 30 dumplings # optional, free text
time: # minutes; total defaults to prep + cook + rest
  prep: 30
  cook: 15
# Optional standalone prep steps (preheat, line pans, bring to temp) shown
# as full-width rows at the top of the table; °C is auto-converted
# prep:
#   - Preheat oven to 230 °C
# The visual table (recipetables.com style). Leaves are ingredients in the
# format "<amount> <unit> <name>" — parsed for scaling and unit conversion.
# Recognized units: g kg ml l tsp tbsp cup oz lb cm in pinch clove slice can
# sheet piece sprig stalk stick block knob bunch handful. Unitless counts
# ("2 eggs") scale too; anything else ("a splash of...") stays static.
table:
  action: final step, producing the dish
  from:
    - action: an intermediate step
      from:
        - 250 g ingredient one
        - 2 tbsp ingredient two
    - 1 pinch ingredient three
# Optional flat list — only needed when there is no `table`
# ingredients:
#   - 250 g ingredient one
method: # detailed numbered steps; °C is auto-converted to °F ("180 °C")
  - First step as a complete sentence.
  - Second step.
notes: # optional practical tips
  - Substitutions, storage, what to watch out for.
sources: # optional inspiration links
  - title: Source name
    url: https://example.com
# Allergens (gluten, soy, egg, dairy, nuts, fish, ...) and vegan/vegetarian
# are AUTO-DETECTED from the ingredient text. Only override when detection
# misses something:
# allergens: [sesame]
# diet: vegetarian # vegan | vegetarian | pescatarian
# heroImage: /images/recipes/dish.jpg # optional
tags: [cooking]
---

Anything written here (markdown body) renders as free-form text between the
recipe table and the ingredients — the story behind the dish, variations,
pictures.
