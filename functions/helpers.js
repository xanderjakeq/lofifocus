// https://config9.com/apps/firebase/how-to-get-public-download-link-within-a-firebase-storage-trigger-function-onfinalize/

const mediaLinkToDownloadableUrl = (object) => {
	let firstPartUrl = object.mediaLink.split("?")[0];
	let secondPartUrl = object.mediaLink.split("?")[1]; 

	let downloadUrl = firstPartUrl.replace("https://www.googleapis.com/download/storage", "https://firebasestorage.googleapis.com").replace("v1", "v0");

	downloadUrl += "?" + secondPartUrl.split("&")[1]; // 'alt=media'
	downloadUrl += "&token=" + object.metadata.firebaseStorageDownloadTokens;

	return downloadUrl;
}

const getCleanName = (name) => { 
	return name.split("/")[1].split(".")[0]
}

module.exports = { 
	getDownloadUrl: mediaLinkToDownloadableUrl,
	getCleanName
}