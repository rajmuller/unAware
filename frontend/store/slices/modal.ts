import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = {
  active: string | null;
};

const initialState: ModalState = {
  active: null,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeActive: (state: ModalState, action: PayloadAction<string>) => {
      return { ...state, active: action.payload };
    },
    dismiss: (state: ModalState) => {
      return { ...state, active: null };
    },
  },
});

export default modal;
