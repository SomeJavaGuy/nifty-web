import Clip from "./Clip";
import MintingSettings from "./MintingSettings";

export default interface Sale {
  id: string;

  clipId: string;
  userId: string;

  mintingSettings: MintingSettings;
  clip: Clip;
}
