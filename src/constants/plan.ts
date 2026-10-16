// TODO: load the plan from your API
export const PLAN = {
  weeklyFee: 399,
  keepPercent: 95,
  standardCommission: 25,
  planCommission: 5,
  averageFare: 250, // ₹ per trip, used by the calculator
  minTrips: 10,
  maxTrips: 100,
  defaultTrips: 40,
};

export function calculateSavings(trips: number) {
  const gross = trips * PLAN.averageFare;
  const standard = (gross * PLAN.standardCommission) / 100;
  const withPlan = PLAN.weeklyFee + (gross * PLAN.planCommission) / 100;
  return {standard, withPlan, savings: standard - withPlan};
}