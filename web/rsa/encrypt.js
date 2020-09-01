$(document).ready(function () {
	$("#plain_file").on("change", async function () {
		var filePath = $(this)[0].value;
		var extn = filePath
			.substring(filePath.lastIndexOf(".") + 1)
			.toLowerCase();
		if (typeof FileReader != "undefined") {
			if (extn == "txt") {
				let plainData = await readFile($(this)[0].files[0]);
				document.getElementById("plain_file_view").value = plainData;
			} else {
				alert("Pls select text files only");
			}
		} else {
			alert("This Application does not support FileReader.");
		}
	});
});

submit = async () => {
	// get public keys
	let public_key = document.getElementById("public_key").value;
	if (!public_key) {
		alert("Please Enter Your Public Key");
		return;
	}
	const [n, e] = public_key.split(",");

	public_key = [parseInt(n), parseInt(e)];

	// get file for encryption
	let file = document.getElementById("plain_file").files[0];
	if (!file) {
		alert("A File must have been selected !");
		return;
	}

	let plainData = await readFile(file);
	eel.rsa_encrypt(
		public_key,
		plainData
	)((data) => {
		let cipher_string = data[0];
		let time_taken = data[1];

		document.getElementById("time_taken_to_encrypt").value = time_taken;
		document.getElementById("encrypted_file_view").value = cipher_string;
	});
};

download = () => {
	let cipher_string = document.getElementById("encrypted_file_view").value;
	if (!cipher_string) {
		alert("No file to download");
		return;
	}

	var blob = new Blob([cipher_string], { type: "text/plain;charset=utf-8" });
	saveAs(blob, "enc.txt");
};
