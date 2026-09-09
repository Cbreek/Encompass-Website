export const CONTACT = {
  company: "Ferrigno Vineyards",
  legal: "Ferrigno LLC",
  address: "One Park Plaza, Suite 600, Irvine, CA 92614",
  phone: "1 (949) 533-1882",
  phoneHref: "tel:19495331882",
  email: "joeferrigno91@gmail.com",
  instagram: "https://www.instagram.com/ferrignovineyards/",
  partnerWinery: "Dunning Vineyards",
  partnerAddress: "1953 Niderer Road, Paso Robles, CA 93446",
};

export type Wine = {
  slug: string;
  name: string;
  varietal: string;
  appellation: string;
  vintageNote: string;
  blurb: string;
  notes: string[];
  pairings: string[];
  spec: { label: string; value: string }[];
  accent: string;
  price: number;
  priceCase?: number;
  status: "Available" | "Allocated" | "Spring release";
};

export const WINES: Wine[] = [
  {
    slug: "cabernet",
    name: "Limited Bottling Cabernet Sauvignon",
    varietal: "Cabernet Sauvignon",
    appellation: "Willow Creek District, Paso Robles",
    vintageNote: "Small lot. A few hundred cases each harvest.",
    blurb:
      "Hand-picked from vines planted more than forty years ago, fermented in small lots and raised in second-use French oak so the fruit — not the barrel — does the talking.",
    notes: ["Black currant", "Dried cherry", "Cedar", "Sage", "Fine graphite tannin"],
    pairings: ["Dry-aged ribeye", "Braised short rib", "Aged pecorino", "Mushroom risotto"],
    spec: [
      { label: "Vines", value: "40+ years old" },
      { label: "Farming", value: "Sustainably grown, hand-harvested" },
      { label: "Oak", value: "Second-use light French oak" },
      { label: "Made with", value: "Bob Dunning, Dunning Vineyards" },
    ],
    accent: "var(--wine)",
    price: 65,
    priceCase: 702,
    status: "Available",
  },
  {
    slug: "intenso",
    name: "Intenso",
    varietal: "Estate red blend",
    appellation: "Willow Creek District, Paso Robles",
    vintageNote: "The darker, deeper bottling. Made only in strong years.",
    blurb:
      "Longer on skins and a touch more time in barrel — Intenso is the wine Joe pours when dinner runs late. Denser fruit, more spine, and a finish that keeps going after the plates are cleared.",
    notes: ["Black plum", "Cocoa nib", "Cracked pepper", "Dried fig", "Warm earth"],
    pairings: ["Bistecca", "Osso buco", "Lamb ragù", "Hard aged cheeses"],
    spec: [
      { label: "Style", value: "Full-bodied, structured" },
      { label: "Extended maceration", value: "Longer skin contact" },
      { label: "Oak", value: "French oak, extended élevage" },
      { label: "Production", value: "Very limited" },
    ],
    accent: "var(--gold)",
    price: 85,
    priceCase: 918,
    status: "Allocated",
  },
  {
    slug: "rose",
    name: "Tempranillo Rosé",
    varietal: "Tempranillo",
    appellation: "Paso Robles",
    vintageNote: "Released each spring. Gone by early autumn.",
    blurb:
      "Pressed early and kept cold, this is the bottle that lives on a patio table between the burrata and the sunset. Coral in the glass, dry on the finish.",
    notes: ["Wild strawberry", "Blood orange", "White peach", "Sea salt"],
    pairings: ["Burrata and prosciutto", "Grilled halibut", "Paella", "Anything at 5 p.m."],
    spec: [
      { label: "Style", value: "Dry, coastal, early-pressed" },
      { label: "Serve", value: "Chilled, 48–52°F" },
      { label: "Best with", value: "An ocean view" },
      { label: "Availability", value: "Spring release, limited" },
    ],
    accent: "var(--terracotta)",
    price: 32,
    priceCase: 346,
    status: "Spring release",
  },
];

export type Placement = {
  name: string;
  city: string;
  type: "Restaurant" | "Wine Bar" | "Retail";
  pour: string;
};

export const PLACEMENTS: Placement[] = [
  { name: "Louie's by the Bay", city: "Newport Beach", type: "Restaurant", pour: "Cabernet & Rosé" },
  { name: "El Paseo Cantina", city: "Newport Beach", type: "Restaurant", pour: "Cabernet" },
  { name: "Sol Mexican Grill", city: "Newport Beach", type: "Restaurant", pour: "Cabernet" },
  { name: "Javier's", city: "Newport Beach", type: "Restaurant", pour: "Rosé" },
  { name: "The Bungalow", city: "Corona del Mar", type: "Restaurant", pour: "Cabernet" },
  { name: "Dunning Vineyards", city: "Paso Robles", type: "Wine Bar", pour: "Tasting by appointment" },
];

export const TIMELINE = [
  {
    year: "The vines",
    title: "Forty-plus years in the ground",
    body: "Old head-trained Cabernet in the Willow Creek District, where hot afternoons and cold ocean air arriving over the Santa Lucias slow everything down and concentrate it.",
  },
  {
    year: "The harvest",
    title: "Picked by hand, in the dark",
    body: "Fruit comes off cold at dawn, sorted by the family, and goes into small open-top lots. Nothing is rushed and nothing is done at scale.",
  },
  {
    year: "The cellar",
    title: "Made with Bob Dunning",
    body: "Joe partners with veteran Paso winemaker Bob Dunning at Dunning Vineyards on Niderer Road — more than 30 years of Willow Creek experience behind every barrel.",
  },
  {
    year: "The table",
    title: "Built for food, not for scores",
    body: "Second-use light French oak, on purpose. The wine is meant to sit next to dinner and make it better — which is why you find it on restaurant lists before you find it in stores.",
  },
];
