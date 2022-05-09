import React, { useEffect } from "react";
import { useSnackbar } from "notistack";

import { Role as DistributorRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Distribution/Distributor";
import { Role as FundAdminRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/FundAdmin/Role";
import { Role as FundManagerRole } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Role";
import { Alias } from "@daml.js/da-marketplace/lib/Tests/FundManagement/Setup";
import { Party } from "@daml/types";

import { userContext } from "../config";

interface IFundManagementContext {
  operator: Party;
  fundManager: Party;
  currentAlias: Alias | undefined;
  fundManagerRole: FundManagerRole | undefined;
  fundAdminRole: FundAdminRole | undefined;
  distributorRole: DistributorRole | undefined;
  streamLoaded: boolean;
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
  fundAdminRole: undefined,
  distributorRole: undefined,
  streamLoaded: false,
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

  const [isLoading, setIsLoading] = React.useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const finishLoading = () => {
    setIsLoading(false);
  };

  const operator = currentAlias ? currentAlias.operator : "non-existent";

  const fundManagerRole = userContext
    .useStreamQueries(FundManagerRole, () => [{ fundManager: currentParty }], [
      currentParty,
    ])
    .contracts.find(() => true)?.payload;

  const fundAdminRole = userContext
    .useStreamQueries(FundAdminRole, () => [{ provider: currentParty }], [
      currentParty,
    ])
    .contracts.find(() => true)?.payload;

  const distributorRole = userContext
    .useStreamQueries(DistributorRole, () => [{ distributor: currentParty }], [
      currentParty,
    ])
    .contracts.find(() => true)?.payload;

  const [streamLoaded, setStreamLoaded] = React.useState(false);
  useEffect(() => {
    setTimeout(() => setStreamLoaded(true), 600); // use to debounce, todo judy is there better approach
  }, []);

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
        fundAdminRole: fundAdminRole,
        distributorRole: distributorRole,
        streamLoaded: streamLoaded,
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
