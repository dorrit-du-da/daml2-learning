import React from "react";

import SubscriptionForm from "./Form/SubscriptionForm";
import FundSubscriptionList from "./List/FundSubscriptionList";
import SubscriptionRequestList from "./List/SubscriptionRequestList";
import CalculatedFundResultList from "./Results/CalculatedFundResult";
import ConfirmedFundResultList from "./Results/ConfirmedFundResult";

const Subscription = () => {
  const [open, setOpen] = React.useState(false);
  const [isinCode, setIsinCode] = React.useState("");
  const [selectedDistributor, setSelectedDistributor] = React.useState("");
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  return (
    // todo judy maybe use context here
    <div>
      <FundSubscriptionList
        setOpen={setOpen}
        setIsinCode={setIsinCode}
        selectedDistributor={selectedDistributor}
        selectedAccount={selectedAccount}
        amount={amount}
      />
      <SubscriptionForm
        setOpen={setOpen}
        open={open}
        currentIsinCode={isinCode}
        selectedDistributor={selectedDistributor}
        selectedAccount={selectedAccount}
        amount={amount}
        setSelectedDistributor={setSelectedDistributor}
        setSelectedAccount={setSelectedAccount}
        setAmount={setAmount}
      />
      <SubscriptionRequestList />
      <CalculatedFundResultList />
      <ConfirmedFundResultList />
    </div>
  );
};

export default Subscription;
