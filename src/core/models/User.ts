export default interface User {
  id: string;
  twitchId: string;
  email: String;

  displayName?: String;
  description?: String;
  profileImage?: String;
  offlineImage?: String;
}
