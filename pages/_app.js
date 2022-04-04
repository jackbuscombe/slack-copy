import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "../components/Login";
import { useStore } from "../appStore";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
	const auth = getAuth();
	const user = useStore((state) => state.user);
	const setUser = useStore((state) => state.setUser);
	const [userLoading, setUserLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			}
			setUserLoading(false);
		});
	}, []);

	if (userLoading) {
		return (
			<div className="h-screen bg-[#f8f8f8] grid place-items-center">
				<div className="flex flex-col bg-white p-[100px] text-center items-center rounded-md shadow-lg">
					<img className="object-contain h-[100px] mb-[40px]" src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="" />
					<img className="h-40 w-40 object-contain" src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt="" />
				</div>
			</div>
		);
	}

	return (
		<div className="h-screen overflow-hidden">
			{!user ? (
				<Login />
			) : (
				<>
					<Header />

					<div className="flex h-full">
						<Sidebar />
						<Component {...pageProps} />
					</div>
				</>
			)}
		</div>
	);
}

export default MyApp;
