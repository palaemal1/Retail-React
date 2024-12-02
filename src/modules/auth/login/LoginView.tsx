"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { loginMutation } from "@/api/auth/index";
import { useAuth } from "@/hooks"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom"
const formSchema = z.object({
  password: z.string().min(5, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
});

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { userLogin } = useAuth();
    const { toast } = useToast();
    const location = useLocation()
	const navigate = useNavigate()

    const { mutate: loginUser } = loginMutation.useMutation({
		onMutate: () => setIsLoading(true),
		onSuccess: (data) => {
			userLogin(data.token)

			const routeToRedirect = location.state?.from
				? location.state.from.pathname
				: "/"
			navigate(routeToRedirect, { replace: true })

			toast({
				title: `You logged in with the following email: ${
					form.getValues().email
				}`,
				description: "Successful login",
				//variant: "success",
			})
		},
		onError: (error) => {
			console.error("Error during login:", error)

			toast({
				title: `Login fail!`,
				description:
					"An error occurred during login. Please try again.",
				variant: "destructive",
			})
		},
		onSettled: () => {
			setIsLoading(false)
		},
	})

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
    shouldUnregister:true
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    loginUser(data);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-15">
        <Card className="justify-center mx-auto items-center ">
          <CardHeader>
            <CardTitle className="justify-center mx-auto"> Login</CardTitle>
            <CardDescription className="justify-center mx-auto font-bold">
              Pearl Center
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start items-start mx-5 w-full sm:w-96">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input
												placeholder="Email"
												disabled={isLoading}
												{...field}
											/>
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start items-start mx-5 w-full sm:w-96">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
												type="password"
												placeholder="Password"
												disabled={isLoading}
												{...field}
											/>
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </FormItem>
                )}
              />
              
              <div className="my-9 py-5 mx-5">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          <p className="py-1 text-xs text-center mb-5">
						Don't have an account?{" "}
						<span className="hover:underline active:underline text-primary font-medium cursor-pointer">
							Sign up for free
						</span>
					</p>
        </Card>
      </div>
    </div>
  );
};

export default LoginView;
