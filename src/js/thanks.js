import { loaderPageOff } from "./helpers/loader";
import { sendData } from "./app/question";

window.addEventListener("DOMContentLoaded", async () => {
	auth(() => {
		const buttonLinkBuyHere = document.querySelector("#link-buy-here");
		const bodyTerms = document.querySelector("#thanks-body");
		const wrapperThanks = document.querySelector("#thanks-page-wrapper");
		const textTermsContainer = document.querySelector("#text-terms-container");
		const textTerms = document.querySelector("#text-terms");

		buttonSend();
		const textsConditions = {
			PE: "",
			CO: "",
			MX: "",
			EC: "",
			CL: "",
		};
		// const textsConditions = {
		// 	PE: 'Valido para pedidos de mínimo S/160 y hasta S/500.',
		// 	CO: 'Valido para pedidos de mínimo $130.000 y hasta $500.000.',
		// 	MX: 'Valido para pedidos de mínimo $900 y hasta $6.000.',
		// 	EC: 'Valido para pedidos de mínimo $37 y hasta $250.',
		// 	CL: 'Valido para pedidos de mínimo $32.000.'
		// }

		const countriesNoTerms = ["PA", "GT", "SV", "BO", "CR", "DO"];

		if (localStorage.getItem("PAGE-LOCATION-COUNTRY")) {
			const country = localStorage.getItem("PAGE-LOCATION-COUNTRY");

			if (localStorage.getItem("PAGE-LINK-BUY")) {
				buttonLinkBuyHere.href = localStorage.getItem("PAGE-LINK-BUY");
			} else {
				buttonLinkBuyHere.href = "#";
			}

			if (countriesNoTerms.includes(country)) {
				bodyTerms.style.display = "none";
				textTermsContainer.style.display = "none";
				wrapperThanks.style.minHeight = "300px";
			} else {
				textTerms.innerHTML = textsConditions[country];

				bodyTerms.style.display = "block";
				textTermsContainer.style.display = "block";
			}
		} else {
			textTerms.innerHTML = "";

			bodyTerms.style.display = "none";
			textTermsContainer.style.display = "none";
			wrapperThanks.style.minHeight = "300px";
		}

		setTimeout(() => {
			loaderPageOff();
		}, 500);
	});
});

function auth(onAuth = () => {}) {
	const MAX_SECONDS = 120;
	const MAX_TIME = 1000 * MAX_SECONDS;

	if (localStorage.getItem("PAGE-SESSION")) {
		const pageSession = localStorage.getItem("PAGE-SESSION");
		const isAuth = Date.now() - parseInt(pageSession);
		const country = localStorage.getItem("PAGE-LOCATION-COUNTRY");

		if (isAuth <= MAX_TIME) {
			if (__isDev) console.log("events-data-layer:", "tipoPagina");
			dataLayer.push({ tipoPagina: "lbel", pais: country });
			if (__isDev) console.log("dataLayer-updated:", dataLayer);

			onAuth();
		} else {
			window.location = "./";
		}
	} else {
		window.location = "./";
	}
}

function buttonSend() {
	const stepButtons = Array.from(
		document.querySelectorAll('[data-toggle="button-step"]')
	);

	stepButtons.forEach((button) => {
		const idButton = button.id;

		button.addEventListener("click", async (event) => {			
			event.preventDefault();
			const data = document.getElementById("textareaRpta").value;
			console.log(data);
			if (idButton === "btn-respuesta-concurso") {
				console.log("accion boton");
				sendData(data);
			}
		});
	});
}

