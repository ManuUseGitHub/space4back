export const getGender = (gender: string | undefined) => {
	if (!gender) {
		return "";
	}
	return {
		m: `${icons.pMars} text-blue-400`,
		f: `${icons.pVenus} text-pink-400`,
		x: `${icons.pTimes} text-purple-400`,
	}[gender];
};
