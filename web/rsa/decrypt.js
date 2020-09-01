$(document).ready(function () {
	$("#encrypted_file").on("change", async function () {
		var filePath = $(this)[0].value;
		var extn = filePath
			.substring(filePath.lastIndexOf(".") + 1)
			.toLowerCase();
		if (typeof FileReader != "undefined") {
			if (extn == "txt") {
				let plainData = await readFile($(this)[0].files[0]);
				document.getElementById(
					"encrypted_file_view"
				).value = plainData;
			} else {
				alert("Pls select text files only");
			}
		} else {
			alert("This Application does not support FileReader.");
		}
	});
});

submit = async () => {
	// get private keys
	let private_key = document.getElementById("private_key").value;
	if (!private_key) {
		alert("Please Enter Your Private Key");
		return;
	}
	const [n, e] = private_key.split(",");

	private_key = [parseInt(n), parseInt(e)];

	// get file for encryption
	let file = document.getElementById("encrypted_file").files[0];
	if (!file) {
		alert("A File must have been selected !");
		return;
	}

	let encryptedData = await readFile(file);
	eel.rsa_decrypt(
		private_key,
		encryptedData
	)((data) => {
		let plain_string = data[0];
		let time_taken = data[1];

		document.getElementById("time_taken_to_decrypt").value = time_taken;
		document.getElementById("decrypted_file_view").value = plain_string;
	});
};

download = () => {
	let plain_string = document.getElementById("decrypted_file_view").value;
	if (!plain_string) {
		alert("No file to download");
		return;
	}

	var blob = new Blob([plain_string], { type: "text/plain;charset=utf-8" });
	saveAs(blob, "dec.txt");
};
