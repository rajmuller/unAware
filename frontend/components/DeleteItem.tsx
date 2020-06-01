import { FC, useCallback } from "react";
import PropTypes from "prop-types";

import {
  ItemsDocument,
  useDeleteItemMutation,
} from "../graphql/generated/graphql";

type DeleteItemProps = { itemId: string };

const DeleteItem: FC<DeleteItemProps> = ({ itemId }) => {
  const [deleteItemMutation] = useDeleteItemMutation();

  const deleteItem = useCallback(async () => {
    await deleteItemMutation({
      variables: { id: itemId },
      refetchQueries: [{ query: ItemsDocument }],
    });
  }, [itemId]);

  return (
    <button type="button" onClick={deleteItem}>
      DeleteItem
    </button>
  );
};

DeleteItem.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default DeleteItem;
