import React from "react";

import AddDistributorForm from "./Form/AddDistributorForm";
import AgreementList from "./List/AgreementList";
import AgreementProposalList from "./List/AgreementProposalList";
import FundList from "./List/FundList";

const Distribution: React.FC = () => {
  const [openAddDistributorForm, setOpenAddDistributorForm] =
    React.useState(false);
  const [isinCode, setIsinCode] = React.useState("");

  return (
    <div>
      <FundList setIsinCode={setIsinCode} setOpen={setOpenAddDistributorForm} />
      <AgreementProposalList />
      <AgreementList />
      <AddDistributorForm
        setOpen={setOpenAddDistributorForm}
        open={openAddDistributorForm}
        currentIsinCode={isinCode}
      />
    </div>
  );
};

export default Distribution;
