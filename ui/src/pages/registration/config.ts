import { DealingFrequency, DividendPolicy } from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Registration/Util';

export const dealingFrequencyOptions = [
  {
    value: DealingFrequency.DAILY,
    label: DealingFrequency.DAILY,
  },
  {
    value: DealingFrequency.WEEKLY,
    label: DealingFrequency.WEEKLY,
  },
  {
    value: DealingFrequency.MONTHLY,
    label: DealingFrequency.MONTHLY,
  }
];


export const dividendPolicyOptions = [
  {
    value: DividendPolicy.DISTRIBUTION,
    label: DividendPolicy.DISTRIBUTION,
  },
  {
    value: DividendPolicy.ACCUMULATION,
    label: DividendPolicy.ACCUMULATION,
  }
];
