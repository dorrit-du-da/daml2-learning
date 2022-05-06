import {
    Role as DistributorRole
} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Distributor';
import {
    Role as FundManagerRole
} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Role';
import { Alias } from '@daml.js/da-marketplace/lib/Tests/FundManagement/Setup';
import Ledger from '@daml/ledger';
import { Party } from '@daml/types';

export type DistributionCommonProps = {
  operator: Party
  fundManager: Party
  currentParty: Party
  alias: Alias | undefined
  fundManagerRole: FundManagerRole | undefined
  distributorRole: DistributorRole | undefined
  ledger: Ledger
  idToDisplayName: (partyId:string) => string
}