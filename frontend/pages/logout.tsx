import { FC, useCallback } from "react";
import {
  useLogoutUserMutation,
  useMeQuery,
} from "../graphql/generated/graphql";
import { setAccessToken } from "../utils/accessToken";

const Logout: FC = () => {
  const [logout, { client }] = useLogoutUserMutation();
  const { data, loading, error } = useMeQuery();

  const onLogout = useCallback(async () => {
    await logout();
    setAccessToken("");
    await client!.resetStore();
  }, [logout, client]);

  if (error || loading || !data?.me) {
    return null;
  }

  return (
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  );
};

export default Logout;
