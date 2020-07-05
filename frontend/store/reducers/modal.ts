import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = {
  active: string;
};

const modal = createSlice({
  name: "modal",
  initialState: null,
  reducers: {
    changeActive: (state: ModalState, action: PayloadAction<ModalState>) => {
      return { ...state, active: action.payload };
    },
  },
});

export default modal;
