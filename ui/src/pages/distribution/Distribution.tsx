import React from 'react';

import {
    Role as DistributorRole
} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Distributor';
import {
    Role as FundManagerRole
} from '@daml.js/da-marketplace/lib/Marketplace/FundManagement/Role';
import { Alias } from '@daml.js/da-marketplace/lib/Tests/FundManagement/Setup';

import { userContext } from '../../config';
import AddDistributorForm from './AddDistributorForm';
import AgreementProposalList from './AgreementProposalList';
import { DistributionCommonProps } from './config';
import FundList from './FundList';

const Distribution: React.FC = () => {
  // Prepare common data for distribution todo judy can we move these out?
  const ledger = userContext.useLedger();
  const currentParty = userContext.useParty();
  const aliases = userContext.useStreamQueries(Alias).contracts;
  let alias = userContext.useStreamFetchByKey(Alias, () => currentParty, [
    currentParty,
  ]).contract?.payload;

  const fundManagerAlias = aliases.filter(
    (alias) => alias.payload.displayName == "FundManager" // not sure if this is the right way to find fundmanager
  );
  const fundManager =
    fundManagerAlias.length == 0 ? "" : fundManagerAlias[0].key;

  const operator = alias ? alias.operator : "non-existent";

  let fundManagerRole = userContext.useStreamFetchByKey(
    FundManagerRole,
    () => {
      return {
        _1: operator,
        _2: currentParty,
      };
    },
    [currentParty, operator]
  ).contract?.payload;

  let distributorRole = userContext.useStreamFetchByKey(
    DistributorRole,
    () => {
      return {
        _1: fundManager,
        _2: currentParty,
      };
    },
    [fundManager, currentParty]
  ).contract?.payload;

  const commonProps: DistributionCommonProps = {
    operator: operator,
    fundManager: fundManager,
    currentParty: currentParty,
    ledger: ledger,
    fundManagerRole: fundManagerRole,
    distributorRole: distributorRole,
    alias: alias,
    idToDisplayName: partyId => {
      const currentAlias = aliases.filter((alias) => alias.key == partyId);
      const displayName =
        currentAlias.length == 0 ? "current party has no alias" : currentAlias[0].payload.displayName;
      return displayName;
    }
  };

  const [openAddDistributorForm, setOpenAddDistributorForm] = React.useState(false);
  const [isinCode, setIsinCode] = React.useState("");

  return (
    <div>
      <FundList
        setIsinCode={setIsinCode}
        common={commonProps}
        setOpen={setOpenAddDistributorForm}
      />
      <AgreementProposalList common={commonProps} />
      <AddDistributorForm
        common={commonProps}
        setOpen={setOpenAddDistributorForm}
        open={openAddDistributorForm}
        currentIsinCode={isinCode}
      />
    </div>
  );
};

export default Distribution;
