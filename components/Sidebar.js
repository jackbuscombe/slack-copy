import { PencilIcon, GlobeAltIcon, ChatAltIcon, InboxIcon, MailOpenIcon, BookmarkIcon, UsersIcon, ViewGridIcon, DocumentDuplicateIcon, ChevronUpIcon, ChevronDownIcon, PlusIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useStore } from "../appStore";

function Sidebar() {
	const [channels, setChannels] = useState([]);
	const user = useStore((state) => state.user);

	useEffect(() => {
		const q = query(collection(db, "rooms"));
		onSnapshot(q, (querySnapshot) => {
			console.log(querySnapshot.docs);
			setChannels(querySnapshot.docs);
		});
	}, []);

	const addChannel = () => {
		const channelName = prompt("Please enter the channel name");
		if (channelName) {
			addDoc(collection(db, "rooms"), {
				name: channelName,
			});
		}
	};

	return (
		<div className="flex flex-col bg-[#3f0f40] text-white flex-[0.3] border-t-[#49274b] min-w-[260px] mt-[60px]">
			{/* Sidebar Header */}
			<div className="flex border-b-[#49274b] pb-[10px] p-[13px]">
				<div className="flex-1">
					<h2 className="text-lg font-bold mb-1">PAPAFAM HQ</h2>
					<h3 className="flex font-semibold items-center">
						<GlobeAltIcon className="h-4 w-4 text-green-500 mr-2 animate-pulse" />
						{user.displayName}
					</h3>
				</div>
				<div onClick={addChannel} className="icon-wrapper bg-white">
					<PencilIcon className="h-6 w-6 text-gray-700" />
				</div>
			</div>
			<div className="flex-grow overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-[#3f0f40]">
				<SidebarOption Icon={ChatAltIcon} title="Threads" />
				<SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
				<SidebarOption Icon={MailOpenIcon} title="Saved items" />
				<SidebarOption Icon={BookmarkIcon} title="Channel browser" />
				<SidebarOption Icon={UsersIcon} title="People & user groups" />
				<SidebarOption Icon={ViewGridIcon} title="Apps" />
				<SidebarOption Icon={DocumentDuplicateIcon} title="File browser" />
				<SidebarOption Icon={ChevronUpIcon} title="Show less" />

				<hr className="my-2 border-[#49274b]" />

				<SidebarOption Icon={ChevronDownIcon} title="Channels" />

				<hr className="my-2 border-[#49274b]" />

				<SidebarOption Icon={PlusIcon} title="Add Channel" addChannelOption />

				{channels?.map((channel) => (
					<SidebarOption key={channel.id} id={channel.id} title={channel.data().name} />
				))}
			</div>
		</div>
	);
}
export default Sidebar;
