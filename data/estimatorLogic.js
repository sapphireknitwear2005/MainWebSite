// /data/estimatorLogic.js
export function calculateEstimate(inputs) {
  let {
    garment,
    fabric,
    color,
    print,
    embroidery,
    trim,
    compliance,
    urgency,
    qty,
  } = inputs;

  // Base from garment
  let moq = garment.baseMOQ;
  let lead = garment.baseLead;
  let cost = garment.baseCost;

  // Add adjustments
  [fabric, color, print, embroidery, trim, compliance, urgency].forEach(
    (opt) => {
      moq += opt.moq || 0;
      lead += opt.lead || 0;
      cost += opt.cost || 0;
    }
  );

  // Final adjustments
  if (qty < moq) {
    return {
      error: `MOQ not met. Minimum required: ${moq} pcs.`,
    };
  }

  let totalCost = (cost * qty).toFixed(2);
  return {
    moq,
    lead,
    cost: cost.toFixed(2),
    totalCost,
  };
}
