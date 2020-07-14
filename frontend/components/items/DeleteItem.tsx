import { FC, useCallback } from "react";
import PropTypes from "prop-types";

import {
  ItemsDocument,
  NumberOfItemsDocument,
  useDeleteItemMutation,
} from "../../graphql/generated/graphql";

type DeleteItemProps = {
  id: string;
  title: string;
};

const DeleteItem: FC<DeleteItemProps> = ({ id, title }) => {
  const [deleteItemMutation] = useDeleteItemMutation();

  const deleteItem = useCallback(async () => {
    // TODO: replace it with a proper modal
    if (window.confirm(`Confirm to delete ${title}`)) {
      await deleteItemMutation({
        variables: { id },
        refetchQueries: [
          { query: ItemsDocument, variables: { skip: 0, take: 4 } },
          { query: NumberOfItemsDocument },
        ],
      });
    }
  }, [id]);

  return (
    <button type="button" onClick={deleteItem}>
      Delete Item
    </button>
  );
};

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteItem;
