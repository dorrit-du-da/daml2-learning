import {
    Role as DistributorRole
} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Distributor';
import { Alias } from '@daml.js/da-marketplace/lib/Tests/FundManagement/Setup';
import Ledger from '@daml/ledger';
import { Party } from '@daml/types';

export type SubscriptionCommonProps = {
  operator: Party;
  distributor: Party;
  currentParty: Party;
  alias: Alias | undefined;
  distributorRole: DistributorRole | undefined;
  ledger: Ledger;
  idToDisplayName: (partyId: string) => string;
};
