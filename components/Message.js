function Message({ message, timestamp, user, userImage }) {
	return (
		<div className="flex items-center p-[20px]">
			<img className="h-[50px] rounded-md" src={userImage} alt="" />
			<div className="pl-[10px]">
				<h4 className="font-bold">
					{user} <span className="text-gray-500 font-light ml-[4px] text-sm">{new Date(timestamp?.toDate()).toUTCString()}</span>
				</h4>
				<p>{message}</p>
			</div>
		</div>
	);
}
export default Message;
