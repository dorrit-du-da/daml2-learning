// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { encode } from 'jwt-simple';
import { isRunningOnHub } from '@daml/hub-react';
import Ledger, { CanReadAs } from '@daml/ledger';
import { createLedgerContext } from "@daml/react";

// Context for the party of the user.
export const userContext = createLedgerContext();
// Context for the public party used to query user aliases.
// On Daml hub, this is a separate context. Locally, we have a single
// token that has actAs claims for the user’s party and readAs claims for
// the public party so we reuse the user context.
export const publicContext = isRunningOnHub()
  ? createLedgerContext()
  : userContext;

  
export type UserManagement = {
  tokenPayload: (loginName: string, ledgerId: string) => Object,
  primaryParty: (loginName: string, ledger: Ledger) => Promise<string>,
  publicParty: (loginName: string, ledger: Ledger) => Promise<string>,
};

export type Insecure = {
  provider: "none",
  userManagement: UserManagement,
  makeToken: (party: string) => string,
};

export type DamlHub = {
  provider: "daml-hub",
};

export type Authentication = Insecure | DamlHub;

// This needs to be used for ledgers in SDK < 2.0.0 and VMBC <= 1.6
export const noUserManagement: UserManagement = {
  tokenPayload: (loginName: string, ledgerId: string) =>
  ({
    "https://daml.com/ledger-api": {
      "ledgerId": ledgerId,
      "applicationId": 'daml2-learning',
      "actAs": [loginName]
    }
  }),
  primaryParty: async (loginName: string, ledger: Ledger) => loginName,
  // Without user management, we force a specific party id here because
  // we mainly care about this for vmbc and there we can support this.
  publicParty: async (loginName: string, ledger: Ledger) => 'public',
};

// Used on SDK >= 2.0.0 with the exception of VMBC
export const withUserManagement: UserManagement = {
  tokenPayload: (loginName: string, ledgerId: string) =>
  ({
    sub: loginName,
    scope: "daml_ledger_api"
  }),
  primaryParty: async (loginName, ledger: Ledger) => {
    const user = await ledger.getUser();
    if (user.primaryParty !== undefined) {
      return user.primaryParty;
    } else {
      throw new Error(`User '${loginName}' has no primary party`);
    }

  },
  publicParty: async (loginName, ledger: Ledger) => {
    const rights = await ledger.listUserRights();
    const readAsRights: CanReadAs[] = rights.filter((x) : x is CanReadAs => x.type === "CanReadAs");
    if (readAsRights.length === 0) {
      throw new Error(`User '${loginName} has no readAs claims for a public party`);
    } else if (readAsRights.length > 1) {
      throw new Error(`User '${loginName} has readAs claims for more than one party`);
    } else {
      return readAsRights[0].party;
    }
  }
};

export const userManagement: UserManagement =
  // We default to assuming that user management is enabled so we interpret everything that
  // isn’t explicitly "false" as supporting user management.
  process.env.REACT_APP_SUPPORTS_USERMANAGEMENT?.toLowerCase() !== "false" ? withUserManagement : noUserManagement;

export const authConfig: Authentication = (() => {
  if (isRunningOnHub()) {
    const auth: DamlHub = {
      provider: "daml-hub",
    };
    return auth;
  } else {
    const ledgerId: string = process.env.REACT_APP_LEDGER_ID ?? "daml2-learning-sandbox"
    const auth: Insecure = {
      provider: "none",
      userManagement: userManagement,
      makeToken: (loginName) => {
        const payload = userManagement.tokenPayload(loginName, ledgerId);
        return encode(payload, "secret", "HS256");
      }
    };
    return auth;
  }
})();
