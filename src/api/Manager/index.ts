import managerService from './service';
import type {ManagerType} from './types';
import { APIResponse } from '@/shared/types';
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

export const fetchManager = {
	useQuery: (opt?: UseQueryOptions<ManagerType[], Error>) =>
		useQuery<ManagerType[], Error>({
			queryKey: ["getManagerView"],
			queryFn: async () => {
				const response: APIResponse<ManagerType[]> =
					await managerService.managerView()

				return response.data
			},
			...opt,
		}),
}
