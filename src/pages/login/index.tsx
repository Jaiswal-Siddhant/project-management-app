
import Head from "next/head";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect } from "react";
import { FullPageLoader } from "~/Components/FullpageLoader/FullpageLoader";
import { useRouter } from "next/router";

const Login = () => {
	const { data: session } = useSession()
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (session) {
				await router.push("/dashboard")
			}
		})().catch(console.error)
	}, [session])

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		try {

			event.preventDefault();
			FullPageLoader.open()

			const formData = new FormData(event.currentTarget);
			const email = formData.get("email");
			const password = formData.get("password");

			const res = await signIn("credentials", {
				email,
				password,
				redirect: false, // Prevent automatic redirection
			});

			if (res?.error) {
				toast("Invalid credentials");
				return;
			}

			await router.push("/dashboard");
		} catch (error) {
			console.error('Error:', error);
		} finally {
			FullPageLoader.close()
		}
	};

	const handleSignUp = async () => {
		await router.push("/signup")
	}

	return (
		<div>
			<Head>
				{/* <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="" /> */}
				{/* <link
					rel="stylesheet"
					as="style"
					onload="this.rel='stylesheet'"
					href="https://fonts.googleapis.com/css2?display=swap&amp;family=Manrope%3Awght%40400%3B500%3B700%3B800&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900"
				/> */}

				<title>Project Management || Login</title>
				<link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />

				{/* <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script> */}
			</Head>
			<body>
				<div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" >
					<div className="layout-container flex h-full grow flex-col">
						<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
							<div className="flex items-center gap-4 text-[#111418]">
								<div className="size-4">
									<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clip-path="url(#clip0_6_319)">
											<path
												d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
												fill="currentColor"
											></path>
										</g>
										<defs>
											<clipPath id="clip0_6_319"><rect width="48" height="48" fill="white"></rect></clipPath>
										</defs>
									</svg>
								</div>
								<h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Task Manager</h2>
							</div>
							<div className="flex flex-1 justify-end gap-8">
								<div className="flex items-center gap-9">
									<a className="text-[#111418] text-sm font-medium leading-normal" href="#">Features</a>
									<a className="text-[#111418] text-sm font-medium leading-normal" href="#">Pricing</a>
									<a className="text-[#111418] text-sm font-medium leading-normal" href="#">Resources</a>
								</div>
								<button
									className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0d7cf2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
								>
									<span className="truncate">Sign in</span>
								</button>
							</div>
						</header>
						<form className="w-full flex flex-1 justify-center py-5" onSubmit={onSubmit} method="POST">
							<div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5  flex-1">
								<h1 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5">Sign in</h1>
								<div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
									<label className="flex flex-col  flex-1">
										<p className="text-[#111418] text-base font-medium leading-normal pb-2">Username</p>
										<input
											placeholder="Username"
											type="email" required
											name="email"
											className="form-input flex min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
										/>
									</label>
								</div>
								<div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
									<label className="flex flex-col min-w-40 flex-1">
										<span className="text-[#111418] text-base font-medium leading-normal pb-2">Password</span>
										<input
											placeholder="Password"
											type="password"
											name="password"
											required
											className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
										/>
									</label>
								</div>
								<span className="text-[#60758a] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline">Forgot your username or password?</span>
								<div className="flex px-4 py-3">
									<button
										type="submit"

										className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#0d7cf2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
									>
										<span className="truncate">Sign in</span>
									</button>
								</div>
								<span className="text-[#60758a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center" >Dont have an account?</span>
								<div className="flex px-4 py-3">
									<button
										onClick={handleSignUp}
										className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
									>
										<span className="truncate">Create a new account</span>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</body>
		</div>

	);
};

export default Login;
