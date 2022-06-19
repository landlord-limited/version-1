import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class NFT (description: Text, owner: Principal, content: [Nat8], valuation: Text, propertyType: Text, llc: Text) = this {
    private let propertyDescription = description;
    private var nftOwner = owner;
    private let imageBytes = content;
    private let value = valuation;
    private let assetType = propertyType;
    private let nameOfLLC = llc;

    public query func getDescription() : async Text{
        return propertyDescription;
    };

    public query func getOwner() : async Principal{
        return owner;
    };

    public query func getAsset() : async [Nat8]{
        return imageBytes;
    };

    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

    public query func getValue() : async Text{
        return value;
    };

    public query func getType() : async Text{
        return assetType;
    };

    public query func getLLC() : async Text{
        return nameOfLLC;
    };

    public shared(msg) func transferOwnership(newOwner: Principal) : async Text {
        if (msg.caller == nftOwner) {
            nftOwner := newOwner;
            return "Success";
        } else {
            return "Error: Not initiated by owner";
        }
    }
}