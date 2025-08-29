// /data/estimatorLogic.js

// Adjustment table for MOQ, lead time (days), risk factor, and cost impact ($)
const adjustments = {
  // Fabrics
  cotton: { moq: 500, lead: 20, risk: 0, cost: 2 },
  organic_cotton: { moq: 800, lead: 25, risk: 2, cost: 3 },
  polyester: { moq: 600, lead: 18, risk: -1, cost: 1.5 },
  recycled_polyester: { moq: 1000, lead: 30, risk: 3, cost: 2.5 },
  wool: { moq: 300, lead: 35, risk: 2, cost: 4 },
  silk: { moq: 200, lead: 40, risk: 4, cost: 5 },
  linen: { moq: 400, lead: 28, risk: 1, cost: 3 },
  denim: { moq: 600, lead: 32, risk: 2, cost: 3.5 },
  fleece: { moq: 700, lead: 26, risk: 0, cost: 2.2 },
  jersey: { moq: 500, lead: 22, risk: 0, cost: 1.8 },
  spandex: { moq: 800, lead: 24, risk: 1, cost: 2.5 },

  // Trims
  zipper: { moq: 0, lead: 3, risk: 0, cost: 0.5 },
  buttons: { moq: 0, lead: 2, risk: 0, cost: 0.3 },
  snaps: { moq: 0, lead: 2, risk: 0, cost: 0.4 },
  elastic: { moq: 0, lead: 2, risk: 0, cost: 0.2 },
  velcro: { moq: 0, lead: 2, risk: 0, cost: 0.6 },
  drawcord: { moq: 0, lead: 3, risk: 0, cost: 0.4 },
  lining: { moq: 0, lead: 5, risk: 0, cost: 1 },
  labels: { moq: 0, lead: 1, risk: 0, cost: 0.1 },

  // Embellishments
  embroidery_flat: { moq: 100, lead: 5, risk: 1, cost: 0.8 },
  embroidery_3d: { moq: 150, lead: 7, risk: 2, cost: 1.2 },
  applique: { moq: 200, lead: 6, risk: 1, cost: 1 },
  patches_woven: { moq: 300, lead: 4, risk: 1, cost: 0.7 },
  patches_embroidery: { moq: 250, lead: 6, risk: 1, cost: 1 },
  screen_print: { moq: 400, lead: 5, risk: 0, cost: 0.5 },
  digital_print: { moq: 200, lead: 7, risk: 1, cost: 1 },
  sublimation: { moq: 500, lead: 10, risk: 2, cost: 1.5 },
  heat_transfer: { moq: 300, lead: 4, risk: 1, cost: 0.6 },
  vinyl_print: { moq: 300, lead: 4, risk: 1, cost: 0.7 },
  foil_print: { moq: 400, lead: 6, risk: 2, cost: 1 },
  flock_print: { moq: 350, lead: 6, risk: 1, cost: 0.9 },
  discharge_print: { moq: 500, lead: 7, risk: 2, cost: 1 },
  plastisol_print: { moq: 400, lead: 5, risk: 0, cost: 0.8 },
  rhinestones: { moq: 200, lead: 10, risk: 3, cost: 1.5 },
  sequins: { moq: 250, lead: 12, risk: 3, cost: 2 },
  beading: { moq: 150, lead: 15, risk: 4, cost: 2.5 },
  studs: { moq: 300, lead: 8, risk: 2, cost: 1 },
  laser_cut: { moq: 200, lead: 7, risk: 2, cost: 1.2 },
  embossing: { moq: 300, lead: 6, risk: 2, cost: 1 },

  // Compliance
  standard: { moq: 0, lead: 0, risk: 0, cost: 0 },
  strict: { moq: 100, lead: 3, risk: -4, cost: 0.5 },
  premium: { moq: 150, lead: 5, risk: -5, cost: 0.8 },
  lenient: { moq: -100, lead: -2, risk: 2, cost: -0.3 },

  // Logistics
  sea: { moq: 0, lead: 30, risk: 0, cost: 0.2 },
  air: { moq: 0, lead: 10, risk: 1, cost: 0.8 },
  express: { moq: 0, lead: 5, risk: 2, cost: 1 },
  rail: { moq: 0, lead: 20, risk: 1, cost: 0.5 },
};

export function calculateEstimate(selections) {
  let baseMOQ = 500;
  let baseLeadTime = 25;
  let riskFactor = 0;
  let costPerPiece = 5; // base FOB

  selections.forEach((selection) => {
    if (selection && adjustments[selection]) {
      baseMOQ += adjustments[selection].moq;
      baseLeadTime += adjustments[selection].lead;
      riskFactor += adjustments[selection].risk;
      costPerPiece += adjustments[selection].cost;
    } else {
      console.warn(`⚠️ No adjustment found for: ${selection}`);
    }
  });

  // Risk buffer
  if (riskFactor > 5) baseLeadTime += 5;
  if (riskFactor < -3) baseLeadTime -= 3;

  return {
    moq: Math.max(100, baseMOQ),
    leadTime: Math.max(7, baseLeadTime),
    risk: riskFactor,
    priceRange: `$${(costPerPiece * 0.9).toFixed(2)} – $${(
      costPerPiece * 1.1
    ).toFixed(2)} FOB/pc`,
  };
}
