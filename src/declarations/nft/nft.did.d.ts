import type { Principal } from '@dfinity/principal';
export interface NFT {
  'getAsset' : () => Promise<Array<number>>,
  'getCanisterId' : () => Promise<Principal>,
  'getDescription' : () => Promise<string>,
  'getLLC' : () => Promise<string>,
  'getOwner' : () => Promise<Principal>,
  'getType' : () => Promise<string>,
  'getValue' : () => Promise<string>,
  'transferOwnership' : (arg_0: Principal) => Promise<string>,
}
export interface _SERVICE extends NFT {}
