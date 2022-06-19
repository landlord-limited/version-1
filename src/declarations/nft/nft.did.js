export const idlFactory = ({ IDL }) => {
  const NFT = IDL.Service({
    'getAsset' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'getCanisterId' : IDL.Func([], [IDL.Principal], ['query']),
    'getDescription' : IDL.Func([], [IDL.Text], ['query']),
    'getLLC' : IDL.Func([], [IDL.Text], ['query']),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'getType' : IDL.Func([], [IDL.Text], ['query']),
    'getValue' : IDL.Func([], [IDL.Text], ['query']),
    'transferOwnership' : IDL.Func([IDL.Principal], [IDL.Text], []),
  });
  return NFT;
};
export const init = ({ IDL }) => {
  return [
    IDL.Text,
    IDL.Principal,
    IDL.Vec(IDL.Nat8),
    IDL.Text,
    IDL.Text,
    IDL.Text,
  ];
};
