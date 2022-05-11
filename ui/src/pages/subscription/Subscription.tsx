import React, { useState } from "react";

import SubscriptionForm from "./Form/SubscriptionForm";
import FundSubscriptionList from "./List/FundSubscriptionList";
import SubscriptionRequestList from "./List/SubscriptionRequestList";
import CalculatedFundResultList from "./Results/CalculatedFundResult";
import ConfirmedFundResultList from "./Results/ConfirmedFundResult";

const Subscription = () => {
  const [open, setOpen] = useState(false);
  const [isinCode, setIsinCode] = useState("");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState(0);

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
