submit = () => {
	eel.rsa_key_gen()((data) => {
		const [public, private] = data;

		// Display key
		document.getElementById("public_key").value = public;
		document.getElementById("private_key").value = private;
	});
};
