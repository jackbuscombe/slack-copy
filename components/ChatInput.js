import { useRef } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useStore } from "../appStore";

function ChatInput({ channelName, channelId, chatRef }) {
	const user = useStore((state) => state.user);
	const inputRef = useRef(null);
	const sendMessage = async (e) => {
		e.preventDefault();

		if (!channelId) {
			return false;
		}

		addDoc(collection(db, "rooms", channelId, "messages"), {
			message: inputRef.current.value,
			timestamp: serverTimestamp(),
			user: user?.displayName,
			userImage: user?.photoURL,
		});

		chatRef.current.scrollIntoView({
			behaviour: "smooth",
		});

		inputRef.current.value = "";
	};
	return (
		<div className="rounded-md">
			<form className="relative flex justify-center">
				<input ref={inputRef} className="fixed bottom-[30px] w-[60%] border border-gray-500 rounded-sm p-[20px] outline-none" placeholder={`Message #${channelName}`} />
				<button type="submit" hidden onClick={sendMessage}>
					SEND
				</button>
			</form>
		</div>
	);
}
export default ChatInput;
