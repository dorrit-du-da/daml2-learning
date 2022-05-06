import { Role as FundAdmin } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/FundAdmin/Role";
import { Role as FundManager } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Role";
import { Alias } from "@daml.js/da-marketplace/lib/Tests/FundManagement/Setup";
import Ledger from "@daml/ledger";
import { Party } from "@daml/types";

export type SubscriptionCommonProps = {
  operator: Party;
  currentParty: Party;
  alias: Alias | undefined;
  ledger: Ledger;
  fundAdminRole: FundAdmin | undefined;
  fundManagerRole: FundManager | undefined;
  idToDisplayName: (partyId: string) => string;
  streamLoaded: boolean;
};
