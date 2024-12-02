import Cookies from "js-cookie"
import { useState } from "react"

export default function useAuth() {
	const token = Cookies.get("react-token")
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)

	const userLogin = (token: string) => {
		Cookies.set("react-token", token)
		setIsAuthenticated(true)
	}

	const userLogout = () => {
		Cookies.remove("react-token")
		setIsAuthenticated(false)
	}

	return { isAuthenticated, userLogin, userLogout }
}
