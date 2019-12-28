
export const isLicenseValid = async (license) => { 
	let url = 'https://gumroad-validation.herokuapp.com/validate';

	if (!license) { 
		return false;
	}
	
	const licenseResponse = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify({
			product_permalink: 'ToxHN', //change this later
			license_key: license
		}),
		headers:{
			'Content-Type': 'application/json'
		}
	});

	if (licenseResponse.status === 404) {
		return false
	}
	
	const data = await licenseResponse.json();
	const purchaseData = data.purchase;

	if (!purchaseData.subscription_cancelled_at && !purchaseData.subscription_failed_at) { 
		return true;
	} else { 
		return false;
	}
}