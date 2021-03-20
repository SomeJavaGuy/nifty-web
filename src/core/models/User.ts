export default interface User {
  id: string;
  twitchId: string;
  email: string;

  displayName?: string;
  description?: string;
  profileImage?: string;
  offlineImage?: string;
}
