import { useMutation, useQueryClient } from "react-query";
import ServerApi from "../api/ServerApi";
import { QueryKeyType } from "../types/QueryKeyType";

const useDeleteMutation = (type: QueryKeyType) => {
  const queryClient = useQueryClient();

  const deleteByType = (id: string | number) => {
    switch (type) {
      case QueryKeyType.USERS:
        return ServerApi.deleteUser(id);
      case QueryKeyType.VENDORS:
        return ServerApi.deleteVendor(id);
      default:
        throw new Error("Incorrect delete type");
    }
  };

  const { mutate } = useMutation((id: string | number) => deleteByType(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(type);
    },
  });
  return mutate;
};

export default useDeleteMutation;
