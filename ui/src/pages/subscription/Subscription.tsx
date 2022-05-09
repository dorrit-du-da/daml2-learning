import React from "react";

import CalculatedFundResultList from "./CalculatedFundResult";
import ConfirmedFundResultList from "./ConfirmedFundResult";
import FundSubscriptionList from "./FundSubscriptionList";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionRequestList from "./SubscriptionRequestList";

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
