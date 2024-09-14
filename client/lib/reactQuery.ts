"use client";

import {
  InvalidateQueryFilters,
  QueryClient,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useApiGet = <T = unknown>(
  {
    queryKey,
    queryFn,
    enabled,
  }: { queryKey?: QueryKey; queryFn: any; enabled?: boolean },
  queryClient?: Partial<QueryClient>
) => {
  return useQuery<T>(
    {
      queryKey: queryKey || ["default"],
      queryFn,
      enabled,
    },
    queryClient as QueryClient
  );
};

export const useApiSend = <TReturnData = unknown, TParameterData = unknown>(
  {
    mutationFn,
    onSuccess,
    onError,
    ...options
  }: UseMutationOptions<TReturnData, Error, TParameterData, unknown>,
  options2?:{invalidateKeys?: string[]}
) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);

      options2?.invalidateKeys &&
        (options2?.invalidateKeys as string[]).forEach((key) => {
          client.invalidateQueries(key as InvalidateQueryFilters);
        });
    },
    onError: (error, variables, context) => {
      onError && onError(error, variables, context);
    },
    retry: 2,
    ...options,
  });
};
