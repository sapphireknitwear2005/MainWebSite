// /data/estimatorData.js
export const garmentStyles = [
  {
    value: "tshirt",
    label: "T-Shirt",
    baseMOQ: 500,
    baseLead: 30,
    baseCost: 3,
  },
  { value: "hoodie", label: "Hoodie", baseMOQ: 300, baseLead: 45, baseCost: 8 },
  {
    value: "jacket",
    label: "Jacket",
    baseMOQ: 200,
    baseLead: 60,
    baseCost: 15,
  },
  {
    value: "trousers",
    label: "Trousers",
    baseMOQ: 400,
    baseLead: 40,
    baseCost: 7,
  },
];

export const fabrics = [
  { value: "cotton", label: "100% Cotton", moq: 0, lead: 0, cost: 1 },
  { value: "polyester", label: "Polyester", moq: 200, lead: 5, cost: 0.5 },
  { value: "blend", label: "Cotton-Poly Blend", moq: 300, lead: 7, cost: 0.8 },
  { value: "organic", label: "Organic Cotton", moq: 500, lead: 15, cost: 1.5 },
  { value: "recycled", label: "Recycled Fabric", moq: 500, lead: 20, cost: 2 },
];

export const colors = [
  { value: "solid", label: "Solid", moq: 0, lead: 0, cost: 0 },
  { value: "multi2", label: "2-3 Colors", moq: 100, lead: 3, cost: 0.3 },
  { value: "allover", label: "All-Over Print", moq: 300, lead: 10, cost: 1 },
];

export const printing = [
  { value: "none", label: "None", moq: 0, lead: 0, cost: 0 },
  { value: "screen", label: "Screen Print", moq: 100, lead: 5, cost: 0.5 },
  { value: "sublimation", label: "Sublimation", moq: 300, lead: 12, cost: 1 },
  { value: "digital", label: "Digital Print", moq: 200, lead: 7, cost: 0.8 },
];

export const embroidery = [
  { value: "none", label: "None", moq: 0, lead: 0, cost: 0 },
  { value: "logo", label: "Basic Logo", moq: 100, lead: 5, cost: 0.7 },
  { value: "full", label: "Full Embroidery", moq: 200, lead: 10, cost: 2 },
];

export const trims = [
  { value: "basic", label: "Basic Trims", moq: 0, lead: 0, cost: 0.2 },
  {
    value: "custom",
    label: "Custom Zippers & Labels",
    moq: 200,
    lead: 7,
    cost: 1,
  },
  {
    value: "premium",
    label: "Premium Packaging & Tags",
    moq: 300,
    lead: 10,
    cost: 2,
  },
];

export const compliance = [
  { value: "none", label: "None", lead: 0, cost: 0 },
  { value: "standard", label: "Standard Tests", lead: 7, cost: 0.3 },
  {
    value: "advanced",
    label: "Advanced Testing (REACH, CPSIA)",
    lead: 15,
    cost: 0.6,
  },
];

export const urgency = [
  { value: "standard", label: "Standard", lead: 0, cost: 0 },
  { value: "rush", label: "Rush Order", lead: -10, cost: 1 },
];
