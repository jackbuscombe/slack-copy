import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useStore } from "../appStore";
import { useRouter } from "next/router";

function SidebarOption({ Icon, title, addChannelOption, id }) {
	const router = useRouter();

	const setRoomId = useStore((state) => state.setRoomId);

	const addChannel = () => {
		const channelName = prompt("Please enter the channel name");
		if (channelName) {
			addDoc(collection(db, "rooms"), {
				name: channelName,
			});
		}
	};

	const selectChannel = () => {
		if (id) {
			setRoomId(id);
		}
		router.push(`/chat/${id}`);
	};

	return (
		<div className="flex items-center text-sm pl-1 cursor-pointer hover:opacity-80 hover:bg-[#340e36]" onClick={addChannelOption ? addChannel : selectChannel}>
			{Icon && <Icon className="h-9 w-9 text-white p-2" />}
			{Icon ? (
				<h3 className="text-white">{title}</h3>
			) : (
				<h3 className="py-1 font-light">
					<span className="p-4 text-lg">#</span>
					{title}
				</h3>
			)}
		</div>
	);
}
export default SidebarOption;
