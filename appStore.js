import create from "zustand";

export const useStore = create((set) => ({
	roomId: null,
	setRoomId: (e) => set({ roomId: e }),

	user: null,
	setUser: (e) => set({ user: e }),
}));
