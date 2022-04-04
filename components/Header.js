import { ClockIcon, SearchIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { useStore } from "../appStore";
import { getAuth, reload, signOut } from "firebase/auth";

function Header() {
	const auth = getAuth();
	const user = useStore((state) => state.user);

	return (
		<header className="bg-[#3f0f40] flex fixed w-full items-center justify-between h-[60px] text-white">
			{/* Header Left */}
			<div className="flex w-4/12 items-center ml-3">
				<div className="icon-wrapper">
					<img
						onClick={() => {
							signOut(auth);
							location.reload();
						}}
						className="w-8 h-8 rounded-full"
						src={user?.photoURL}
						alt={user?.displayName}
					/>
				</div>
				<div className="icon-wrapper ml-auto mr-6">
					<ClockIcon className="h-6 w-6" />
				</div>
			</div>

			{/* Header Middle */}
			<div className="flex w-5/12 rounded-md bg-[#421f44] text-center px-8 text-gray-500 border">
				<SearchIcon className="h-6 w-6" />
				<input className="bg-transparent border-non text-center min-w-[30vw] outline-none" placeholder="Search Slack" />
			</div>

			{/* Header Right */}
			<div className="flex w-3/12">
				<div className="icon-wrapper ml-auto mr-6">
					<QuestionMarkCircleIcon className="h-6 w-6" />
				</div>
			</div>
		</header>
	);
}
export default Header;
