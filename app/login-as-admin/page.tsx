"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useMutation } from '@apollo/client/react';
import gql from "graphql-tag";
import { useRouter } from 'next/navigation';

const LOGIN_MUTATION = gql`
mutation Login($input: LoginInput) {
  	login(input: $input) {
		status
		message
		data {
			id
			firstName
			lastName
			userName
			email
			profilePicture
			phoneNo
			isAdmin
		}
    token    
	}
}
`

interface FormData {
	email: string;
	password: string;
	remember: boolean;
}

interface FormErrors {
	email?: string;
	password?: string;
	general?: string;
}


export default function AdminLoginPage() {
	const router = useRouter();
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
		remember: false
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [login, { loading }] = useMutation(LOGIN_MUTATION);

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!validateEmail(formData.email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		// Password validation
		if (!formData.password.trim()) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));

		// Clear error when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors(prev => ({
				...prev,
				[name]: undefined
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			const { data }: any = await login({
				variables: {
					input: {
						userName: formData.email, // Using email as userName based on the schema
						password: formData.password
					}
				}
			});

			if (data?.login?.status) {
				// Check if user is admin
				if (!data.login.data?.isAdmin) {
					setErrors({
						general: 'Access denied. Admin privileges required.'
					});
					return;
				}

				// Store token in cookie for server-side access
				if (data.login.token) {
					document.cookie = `auth-token=${data.login.token}; path=/; max-age=${formData.remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60}; secure; samesite=strict`;
				}

				// Store user data if needed
				if (data.login.data) {
					localStorage.setItem('user', JSON.stringify(data.login.data));
				}

				// Redirect to admin dashboard
				router.push('/admin');
			} else {
				setErrors({
					general: data?.login?.message || 'Login failed. Please try again.'
				});
			}
		} catch (error: unknown) {
			console.error('Login error:', error);
			const errorMessage = error instanceof Error ? error.message : 'An error occurred during login. Please try again.';
			setErrors({
				general: errorMessage
			});
		}
	};

	return (
		<main className="min-h-dvh flex flex-col">
			<SiteHeader />
			<section className="flex-1 flex items-center justify-center px-6 md:px-8 lg:px-10 py-12 md:py-16">
				<div className="w-full max-w-md">
					<Card className="shadow-sm">
						<CardHeader className="space-y-1">
							<CardTitle className="text-3xl font-bold tracking-tight text-center">Admin Access</CardTitle>
							<CardDescription className="text-center">
								Enter your credentials to access the admin dashboard
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* General Error Message */}
							{errors.general && (
								<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
									{errors.general}
								</div>
							)}

							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder="admin@example.com"
										className={errors.email ? 'border-red-500 bg-red-50 focus-visible:ring-red-500' : ''}
									/>
									{errors.email && (
										<p className="text-sm text-red-600">{errors.email}</p>
									)}
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="password">Password</Label>
										<a href="#" className="text-sm text-primary hover:underline">
											Forgot password?
										</a>
									</div>
									<Input
										id="password"
										name="password"
										type="password"
										value={formData.password}
										onChange={handleInputChange}
										placeholder="••••••••"
										className={errors.password ? 'border-red-500 bg-red-50 focus-visible:ring-red-500' : ''}
									/>
									{errors.password && (
										<p className="text-sm text-red-600">{errors.password}</p>
									)}
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox
										id="remember"
										name="remember"
										checked={formData.remember}
										onCheckedChange={(checked) =>
											setFormData(prev => ({ ...prev, remember: checked as boolean }))
										}
									/>
									<Label htmlFor="remember">Remember me</Label>
								</div>

								<Button
									type="submit"
									className="w-full"
									disabled={loading}
								>
									{loading ? (
										<>
											<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Signing in...
										</>
									) : (
										"Sign in"
									)}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</section>
			<SiteFooter />
		</main>
	)
}
