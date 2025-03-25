export type RootDrawerParamList = {
  Home: undefined;
  About: undefined;
  Profile: undefined;
};

export type AboutTabParamList = {
  Info: undefined;
  Contact: undefined;
};

export type ChildStackParamList = {
  Children: undefined;
  Details: { childId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
