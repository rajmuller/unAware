import { createSelector } from "reselect";
import { ModalState } from "./slices/modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalSelector = (state: any): ModalState => state.modal;

export const activeModalSelector = createSelector(
  modalSelector,
  (state) => state.active
);
