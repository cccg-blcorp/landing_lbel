export const sendData = (data) => {
	console.log("method sendData", data);
	/*Credenciales PROD */
	var apiUrl = "https://api.belcorp.biz";
	var clientId = "interfacesIKU";
	var clientSecret = "vjm8GduiaTUpqT17gYW4jYqk8S88oC5DoRg2/WJZvpg=";

	// Credenciales QA
	// var apiUrl = "https://api-qa.belcorp.biz";
	// var clientId = "interfacesIKU";
	// var clientSecret = "2KgfGQ6g7cKh/G7GwaSFkbOjQS8VQ9QrzbXieSUlcrw=";

	var oauthTokenSettings = {
		url: apiUrl + "/oauth/token",
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			grant_type: "client_credentials",
			client_id: clientId,
			client_secret: clientSecret,
			scope: "scopeIKU",
		},
	};

	$.ajax(oauthTokenSettings).done(function (response) {
		var ecrmCampaignsSettings = {
			url: apiUrl + "/ecrm_campaigns",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": response.access_token,
			},
			data: JSON.stringify({
				userId: localStorage.getItem("idCDC"),
				initiative: "LB_PROGRESSIVE_PROFILING",
				fields: {
					comment: data,
				},
			}),
		};
		$.ajax(ecrmCampaignsSettings);
	});
};
