import React, { useState } from "react";
import { useSnackbar } from "notistack";

import { Role as DistributorRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Distributor";
import { Role as FundAdminRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/FundAdmin/Role";
import { Role as InvestmentManagerRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Investment/Role";
import { Role as FundManagerRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Role";
import { Role as TransferAgentRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/TransferAgent/Role";
import { Alias } from "@daml.js/da-marketplace/lib/Tests/FundManagement/Setup";
import { Party } from "@daml/types";

import { userContext } from "../config";

interface IFundManagementContext {
  operator: Party;
  fundManager: Party;
  currentAlias: Alias | undefined;
  fundManagerRole: FundManagerRole | undefined;
  investmentManagerRole: InvestmentManagerRole | undefined;
  transferAgentRole: TransferAgentRole | undefined;
  fundAdminRole: FundAdminRole | undefined;
  distributorRole: DistributorRole | undefined;
  streamLoading: boolean;
  idToDisplayName: (partyId: string) => string;
  isLoading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
  logError: (error: any) => void;
}

const FundManagementContext = React.createContext<IFundManagementContext>({
  operator: "non-existent operator",
  fundManager: "non-existent fundManager",
  currentAlias: undefined,
  fundManagerRole: undefined,
  investmentManagerRole: undefined,
  transferAgentRole: undefined,
  fundAdminRole: undefined,
  distributorRole: undefined,
  streamLoading: false,
  idToDisplayName: (partyId: string) => "",
  isLoading: false,
  startLoading: () => {},
  finishLoading: () => {},
  logError: () => {},
});

interface AuxProps {
  children: React.ReactNode;
}

export const FundManagementContextProvider: React.FC<AuxProps> = (props) => {
  const currentParty = userContext.useParty();
  const currentAlias = userContext
    .useStreamQueries(Alias, () => [{ currentParty: currentParty }], [
      currentParty,
    ])
    .contracts.find(() => true)?.payload;

  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const finishLoading = () => {
    setIsLoading(false);
  };

  const operator = currentAlias ? currentAlias.operator : "non-existent";

  const fundManagerRoleQueryResult = userContext.useQuery(
    FundManagerRole,
    () => {
      return { fundManager: currentParty };
    }
  );

  const fundManagerRole = fundManagerRoleQueryResult.contracts.find(
    () => true
  )?.payload;

  const streamLoading = fundManagerRoleQueryResult.loading;

  const investmentManagerRole = userContext
    .useQuery(
      InvestmentManagerRole,
      () => {
        return { provider: currentParty };
      },
      [currentParty]
    )
    .contracts.find(() => true)?.payload;

  const transferAgentRole = userContext
    .useQuery(
      TransferAgentRole,
      () => {
        return { provider: currentParty };
      },
      [currentParty]
    )
    .contracts.find(() => true)?.payload;

  const fundAdminRole = userContext
    .useQuery(
      FundAdminRole,
      () => {
        return { provider: currentParty };
      },
      [currentParty]
    )
    .contracts.find(() => true)?.payload;

  const distributorRole = userContext
    .useQuery(
      DistributorRole,
      () => {
        return { distributor: currentParty };
      },
      [currentParty]
    )
    .contracts.find(() => true)?.payload;

  const aliases = userContext.useStreamQueries(Alias).contracts;
  const fundManagerAlias = aliases.filter(
    (alias) => alias.payload.displayName === "FundManager" // not sure if this is the right way to find fundmanager
  );
  const fundManager =
    fundManagerAlias.length === 0 ? "" : fundManagerAlias[0].key;

  const idToDisplayName = (partyId: string) => {
    const currentAlias = aliases.find((alias) => alias.key === partyId);
    const displayName = currentAlias
      ? currentAlias.payload.displayName
      : "current party has no alias";
    return displayName;
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const logError = (error: any) => {
    const key = enqueueSnackbar(JSON.stringify(error), {
      variant: "error",
      onClick: () => {
        closeSnackbar(key);
      },
    });
  };

  return (
    <FundManagementContext.Provider
      value={{
        operator: operator,
        fundManager: fundManager,
        currentAlias: currentAlias,
        fundManagerRole: fundManagerRole,
        investmentManagerRole: investmentManagerRole,
        transferAgentRole: transferAgentRole,
        fundAdminRole: fundAdminRole,
        distributorRole: distributorRole,
        streamLoading: streamLoading,
        idToDisplayName: idToDisplayName,
        isLoading: isLoading,
        startLoading: startLoading,
        finishLoading: finishLoading,
        logError: logError,
      }}
    >
      {props.children}
    </FundManagementContext.Provider>
  );
};

export default FundManagementContext;
