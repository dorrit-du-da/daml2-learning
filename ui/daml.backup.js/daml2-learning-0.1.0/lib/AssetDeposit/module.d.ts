// Generated from AssetDeposit.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type AssetDeposit = {
  owner: damlTypes.Party;
  account: string;
  provider: string;
  asset: string;
  quantity: damlTypes.Numeric;
};

export declare interface AssetDepositInterface {
  Archive: damlTypes.Choice<AssetDeposit, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
}
export declare const AssetDeposit:
  damlTypes.Template<AssetDeposit, undefined, 'e6020302d835b9ba320f49b65ac14ad8ecb0a0ab32b275ca4b44b16a16aa6ad7:AssetDeposit:AssetDeposit'> & AssetDepositInterface;

export declare namespace AssetDeposit {
  export type CreateEvent = damlLedger.CreateEvent<AssetDeposit, undefined, typeof AssetDeposit.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetDeposit, typeof AssetDeposit.templateId>
  export type Event = damlLedger.Event<AssetDeposit, undefined, typeof AssetDeposit.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetDeposit, undefined, typeof AssetDeposit.templateId>
}


