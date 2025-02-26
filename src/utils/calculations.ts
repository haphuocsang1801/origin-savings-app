export const calculateMonthlyAmount = (totalAmount: number, totalMonths: number): number => {
  if (totalMonths <= 0 || totalAmount <= 0) return 0
  return totalAmount / totalMonths
}
