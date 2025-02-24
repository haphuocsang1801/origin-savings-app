import { MAX_AMOUNT, MIN_AMOUNT } from "@/utils/constants";

export const calculateMonthlyAmount = (totalAmount: number, totalMonths: number): number => {
  if (totalMonths <= 0 || totalAmount <= 0) return 0;
  return totalAmount / totalMonths;
};

export const validateAmount = (amount: number): boolean => {
  return amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
};
