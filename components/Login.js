import { getAuth, signInWithPopup } from "firebase/auth";
import { useStore } from "../appStore";
import { provider } from "../firebase";

function Login() {
	const auth = getAuth();
	const setUser = useStore((state) => state.setUser);

	const signIn = (e) => {
		e.preventDefault();
		signInWithPopup(auth, provider)
			.then((result) => {
				setUser(result.user);
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	return (
		<div className="h-screen bg-[#f8f8f8] grid place-items-center">
			<div className="flex flex-col bg-white p-[100px] text-center rounded-md shadow-lg">
				<img className="object-contain h-[100px] mb-[40px]" src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="" />
				<h1 className="text-xl font-bold">Sign in to the the the the the the the React Slack</h1>
				<p>react.slack.com</p>
				<button className="bg-green-700 w-[60%] self-center font-bold p-4 mt-8 text-white rounded-md" onClick={signIn}>
					Sign in with Google
				</button>
			</div>
		</div>
	);
}
export default Login;
