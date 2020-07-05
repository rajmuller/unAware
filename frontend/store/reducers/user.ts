import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  userType: string;
  username: string;
  sessionId: string;
  jsm1sessionid: string;
  target: string;
};

const user = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    loginSuccess: (state: UserState, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    logout: () => null,
    loginRequested: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{
        username: string;
        password: string;
        target: string;
      }>
    ) => {
      return { ...state, target: action.payload.target };
    },
  },
});

export default user;
