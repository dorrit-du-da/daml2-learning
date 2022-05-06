import React, { useEffect } from "react";

import { Role as FundAdmin } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/FundAdmin/Role";
import { Role as FundManager } from "@daml.js/da-marketplace/lib/Marketplace/FundManagement/Role";
import { Alias } from "@daml.js/da-marketplace/lib/Tests/FundManagement/Setup";

import { userContext } from "../../config";
import CalculatedFundResultList from "./CalculatedFundResult";
import { SubscriptionCommonProps } from "./config";
import ConfirmedFundResultList from "./ConfirmedFundResult";
import FundSubscriptionList from "./FundSubscriptionList";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionRequestList from "./SubscriptionRequestList";

const Subscription = () => {
  const ledger = userContext.useLedger();
  const currentParty = userContext.useParty();
  const aliases = userContext.useStreamQuery(Alias).contracts;
  let alias = userContext.useStreamFetchByKey(Alias, () => currentParty, [
    currentParty,
  ]).contract?.payload;

  const [streamLoaded, setStreamLoaded] = React.useState(false);
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const operator = alias ? alias.operator : "non-existent";

  useEffect(() => {
    setTimeout(() => setStreamLoaded(true), 600); // use to debounce, todo judy is there better approach
  }, []);

  const fundAdmin = userContext
    .useStreamQuery(FundAdmin)
    .contracts.find(() => true)?.payload;

  const fundManager = userContext
    .useStreamQuery(FundManager)
    .contracts.find(
      (role) => role.payload.fundManager === currentParty
    )?.payload;

  const commonProps: SubscriptionCommonProps = {
    operator: operator,
    currentParty: currentParty,
    alias: alias,
    ledger: ledger,
    idToDisplayName: (partyId) => {
      // todo judy refactor this
      const currentAlias = aliases.find((alias) => alias.key === partyId);
      const displayName = currentAlias
        ? currentAlias.payload.displayName
        : "current party has no alias";
      return displayName;
    },
    fundAdminRole: fundAdmin,
    fundManagerRole: fundManager,
    streamLoaded: streamLoaded,
  };

  const [open, setOpen] = React.useState(false);
  const [isinCode, setIsinCode] = React.useState("");
  const [selectedDistributor, setSelectedDistributor] = React.useState("");
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  return (
    // todo judy maybe use context here
    <div>
      {
        <FundSubscriptionList
          common={commonProps}
          setOpen={setOpen}
          setIsinCode={setIsinCode}
          selectedDistributor={selectedDistributor}
          selectedAccount={selectedAccount}
          amount={amount}
          isSubscribing={isSubscribing}
          setIsSubscribing={setIsSubscribing}
        />
      }
      <SubscriptionForm
        common={commonProps}
        setOpen={setOpen}
        open={open}
        currentIsinCode={isinCode}
        selectedDistributor={selectedDistributor}
        selectedAccount={selectedAccount}
        amount={amount}
        setSelectedDistributor={setSelectedDistributor}
        setSelectedAccount={setSelectedAccount}
        setAmount={setAmount}
        isSubscribing={isSubscribing}
        setIsSubscribing={setIsSubscribing}
      />
      <CalculatedFundResultList common={commonProps}></CalculatedFundResultList>
      <ConfirmedFundResultList common={commonProps}></ConfirmedFundResultList>
      <SubscriptionRequestList common={commonProps} />
    </div>
  );
};

export default Subscription;
