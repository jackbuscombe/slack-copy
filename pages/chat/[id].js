import { StarIcon, InformationCircleIcon } from "@heroicons/react/outline";
import ChatInput from "../../components/ChatInput";
import { useStore } from "../../appStore";
import { collection, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import Message from "../../components/Message";
import { useRef } from "react";

function Chat() {
	const chatRef = useRef();
	const router = useRouter();
	const { id } = router.query;
	const roomId = useStore((state) => state.roomId);
	const [roomName, setRoomName] = useState();
	const [roomMessages, setRoomMessages] = useState([]);

	// Get Room Name
	useEffect(() => {
		const getName = async () => {
			const docRef = doc(db, "rooms", id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setRoomName(docSnap.data().name);
			} else {
				console.log("No chat ID exists!");
			}
		};
		getName();
	}, [id]);

	// Get Room Messages
	useEffect(() => {
		const q = query(collection(db, "rooms", id, "messages"), orderBy("timestamp", "asc"));
		onSnapshot(q, (querySnapshot) => {
			console.log("messages snapshot", querySnapshot?.docs);
			setRoomMessages(querySnapshot?.docs);
		});
	}, [id]);

	// Scroll to bottom
	useEffect(() => {
		chatRef?.current?.scrollIntoView({
			behavious: "smooth",
		});
	}, [roomMessages]);

	return (
		<div className="flex-[0.75] flex-grow overflow-y-scroll mt-[60px]">
			{roomName && roomMessages && (
				<>
					{/* Header */}
					<div className="flex sticky top-0 justify-between p-[20px] border-b bg-white">
						{/* Header Left */}
						<div className="flex items-center">
							<h4 className="flex lowercase ml-[10px] text-sm mr-[10px]">
								<strong>#{roomName}</strong>
							</h4>
							<div className="icon-wrapper">
								<StarIcon className="h-6 w-6" />
							</div>
						</div>

						{/* Header Right */}
						<div className="flex items-center">
							<div className="icon-wrapper">
								<InformationCircleIcon className="h-6 w-6" />
							</div>
							<p className="ml-[5px]"> Details</p>
						</div>
					</div>

					{/* Chat Messages */}
					<div>
						{roomMessages.map((doc) => {
							const { message, timestamp, user, userImage } = doc.data();

							return <Message key={doc.id} message={message} timestamp={timestamp} user={user} userImage={userImage} />;
						})}
						<div ref={chatRef} className="pb-[100px]"></div>
					</div>

					{/* Chat Input */}
					<ChatInput chatRef={chatRef} channelName={roomName} channelId={roomId} />
				</>
			)}
		</div>
	);
}
export default Chat;
