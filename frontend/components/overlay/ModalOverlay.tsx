// /* eslint-disable react/jsx-props-no-spreading */
// import * as React from "react";
// import { FC, ReactNode, Children } from "react";
// import { useTransition, animated } from "react-spring";
//
// import { useCapture } from "../../hooks";
// import Overlay from "./Overlay";
//
//
// import { useDismiss } from "../Dismissable";
// import { ModalFC } from "../modal/types";
// import PullToDismiss, { springConfig } from "../PullToDismiss";
//
// type ModalOverlayProps = {
//   activeName?: string;
//   transitions?: ReturnType<typeof useTransition>;
// };
//
// export const useModalOverlay = (): ModalOverlayProps => {
//   const dismiss = useDismiss();
//   const onClick = useCapture(dismiss, { targetCheck: true });
//   const activeName = useSelector(activeModalSelector);
//   const transitions = useTransition(activeName, (name) => name || "none", {
//     from: { transform: "translate3d(0, 100%, 0)" },
//     enter: { transform: "translate3d(0, 0%, 0)" },
//     leave: { transform: "translate3d(0, 100%, 0)" },
//     config: springConfig,
//   });
//
//   return { onClick, activeName, transitions };
// };
//
// const findActiveModal = (
//   children: ReturnType<ModalFC<unknown>>[],
//   activeName: ModalName
// ): ReactNode => {
//   return children.find(({ type }) => type.modalName === activeName);
// };
//
// const ModalOverlay: FC<ModalOverlayProps> = ({
//   children,
//   activeName,
//   transitions,
//   ...overlayProps
// }) => {
//   const visible = !!activeName;
//
//   return (
//     <Overlay
//       {...(overlayProps as ExtractComponentProps<typeof Overlay>)}
//       variant="bottomLeft"
//       backgroundColor={Color.curtain0}
//       css={{
//         pointerEvents: visible ? "initial" : "none",
//         maxHeight: "100%",
//         overflow: "hidden",
//         opacity: Number(visible),
//         transition: "opacity .2s ease-in-out",
//         "> *": {
//           position: "absolute",
//           width: "100%",
//         },
//       }}
//     >
//       {transitions.map(({ props, key, item }) => {
//         const activeModal = findActiveModal(
//           Children.toArray(children) as ReturnType<ModalFC<unknown>>[],
//           item as ModalName
//         );
//         return (
//           <animated.div key={key} style={props}>
//             <PullToDismiss>{activeModal}</PullToDismiss>
//           </animated.div>
//         );
//       })}
//     </Overlay>
//   );
// };
//
// export default ModalOverlay;
