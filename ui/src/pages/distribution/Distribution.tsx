import React from "react";

import AddDistributorForm from "./AddDistributorForm";
import AgreementList from "./AgreementList";
import AgreementProposalList from "./AgreementProposalList";
import FundList from "./FundList";

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
