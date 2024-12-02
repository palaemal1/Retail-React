import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import type { LoginType, LoginResponse } from "./types"
import authService from "./service"

export const loginMutation = {
	useMutation: (
		opt?: UseMutationOptions<LoginResponse, Error, LoginType, void>
	) =>
		useMutation({
			mutationKey: ["login"],
			mutationFn: (payload: LoginType) => authService.login(payload), 
			...opt, // additional options
		}),
}
