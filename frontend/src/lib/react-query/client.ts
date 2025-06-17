import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { parseApiError } from "@/shared/utils";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {},
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(parseApiError(error));
    },
  }),
});

export default queryClient;
