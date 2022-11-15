import { navigateTo } from "./navigation";
import { tokenWebService } from "../config";
import { saveUpdate } from "../app/services";
import { showPageError } from "../lib/errors";
import { validateFields } from "../lib/fields";
import { getState, updateState } from "./state";
import { encryptData } from "../helpers/encrypt";
import { removeDragAnimation } from "../lib/draggable";
import {
	loaderPageOff,
	loaderPageOn,
	buttonLoadingOn,
	buttonLoadingOff,
} from "../helpers/loader";
import { disableInputEmail } from "../helpers/utils";
import { startDataLayerSession } from "./events";


const saveStep = async (inputOptions) => {
	let options = {
		el: null,
		discount: null,
		idSection: null,
		navigation: null,
		btnText:
			'Guardar y Continuar <span class="icon icon-arrow-right text-size-xl ml-1"></span>',
	};

	options = {
		...options,
		...inputOptions,
	};

	try {
		buttonLoadingOn(options.el);

		const state = getState();

		updateState("save-step", {
			dc:
				state.e !== "" &&
				state.nm !== "" &&
				state.ln !== "" &&
				state.pn !== "" &&
				state.ct !== "" &&
				state.bd !== "" &&
				state.gd !== "" &&
				state.p1 !== "" &&
				state.p2 !== ""
					? "25% OFF"
					: options.discount,
		});

		let data = encryptData({
			...getState(),
			k: tokenWebService,
		});

		let saved = await saveUpdate(data);

		buttonLoadingOff(options.el, options.btnText);

		if (saved) {
			if (__isDev) console.log(`step-${options.idSection}:`, "saved");

			if (options.idSection === "register") {
				disableInputEmail();
				startDataLayerSession(getState().UID, "register");
			}

			if (getState().dc === "25% OFF") {
				navigateTo("confirm-data");
			} else {
				navigateTo(options.navigation);
			}

			/**
			 * GTM
			 */
			if (options.idSection === "birthday") {
				if (__isDev) console.log("events-data-layer:", "cumpleaños");
				dataLayer.push({ event: "cumpleaños" });
				if (__isDev) console.log("dataLayer-updated:", dataLayer);
			}

			if (options.idSection === "register") {
				if (__isDev) console.log("events-data-layer:", "registrate");
				dataLayer.push({ event: "registrate" });
				if (__isDev) console.log("dataLayer-updated:", dataLayer);
			}

			if (options.idSection === "register-mail") {
				if (__isDev) console.log("events-data-layer:", "registrate2");
				dataLayer.push({ event: "registrate2" });
				if (__isDev) console.log("dataLayer-updated:", dataLayer);
			}
		} else {
			showPageError("save");
			if (__isDev) console.log(`step-${options.idSection}:`, "do not saved");
		}
	} catch (error) {
		buttonLoadingOff(options.el, options.btnText);
		showPageError("server");
		console.error(`step-${options.idSection}:`, "service-save-update error");
		console.error(error);
	}
};

export const renderSteps = () => {
	const stepButtons = Array.from(
		document.querySelectorAll('[data-toggle="button-step"]')
	);

	stepButtons.forEach((button) => {
		const idSection = button.closest("section").id;
		const idButton = button.id;

		let isValidate = false;

		button.addEventListener("click", async (event) => {
			event.preventDefault();

			/**
			 * welcome-mail
			 */
			if (idButton === "btn-welcome-mail") {
				updateState({
					dc: "0% OFF",
				});

				if (getState().nm === "") {
					navigateTo("register");
				} else {
					navigateTo("register-mail");
				}
			}

			/**
			 * register
			 */
			if (idButton === "btn-register") {
				isValidate = validateFields(
					idSection,
					"nm:required,ln:required,e:required|email,pn:required|number|phone,ot:checked"
				);
				if (__isDev) console.log(`validation-#${idSection}:`, isValidate);

				if (isValidate) {
					saveStep({
						el: button,
						discount: "5% OFF",
						navigation: "birthday",
						idSection: idSection,
					});
				}
			}

			/**
			 * register-mail
			 */
			if (idButton === "btn-step1a") {
				isValidate = validateFields(
					idSection,
					"pn:required|number|phone,ot:checked"
				);
				if (__isDev) console.log(`validation-#${idSection}:`, isValidate);

				if (isValidate) {
					saveStep({
						el: button,
						discount: "5% OFF",
						navigation: "birthday",
						idSection: idSection,
					});
				}
			}

			/**
			 * birthday
			 */
			if (idButton === "btn-step1b") {
				isValidate = validateFields(idSection, "bd:required|date|older");
				if (__isDev) console.log(`validation-#${idSection}:`, isValidate);

				if (isValidate) {
					saveStep({
						el: button,
						discount: "10% OFF",
						navigation: "gender",
						idSection: idSection,
					});
				}
			}

			/**
			 * gender
			 */
			if (idButton === "btn-step2") {
				isValidate = validateFields(idSection, "gd:required");
				if (__isDev) console.log(`validation-#${idSection}:`, isValidate);

				if (isValidate) {
					saveStep({
						el: button,
						discount: "15% OFF",
						navigation: "main-needs",
						idSection: idSection,
					});
				}
			}

			/**
			 * main-needs
			 */
			if (idButton === "btn-step3") {
				removeDragAnimation();

				updateState(idSection, {
					p1:
						getState().p1 === ""
							? document.querySelector('input[name="p1"]').value
							: getState().p1,
				});

				saveStep({
					el: button,
					discount: "20% OFF",
					navigation: "favorite-products",
					idSection: idSection,
				});
			}

			/**
			 * favorite-products
			 */
			if (idButton === "btn-step4") {
				removeDragAnimation();
				updateState(idSection, {
					p2:
						getState().p2 === ""
							? document.querySelector('input[name="p2"]').value
							: getState().p2,
				});

				saveStep({
					el: button,
					discount: "25% OFF",
					navigation: "confirm-data",
					idSection: idSection,
				});
			}

			/**
			 * confirm-data
			 */
			if (idButton === "btn-confirm") {
				loaderPageOn();

				try {
					updateState(idSection, {
						rf: "1",
					});

					let data = encryptData({
						...getState(),
						k: tokenWebService,
					});

					let saved = await saveUpdate(data);

					if (saved) {
						localStorage.setItem("PAGE-SESSION", Date.now());
						window.location = "./gracias-por-tus-respuestas.html";
					} else {
						loaderPageOff();
						showPageError("save");
						if (__isDev) console.log(`step-${idSection}:`, "do not saved");
					}
				} catch (error) {
					loaderPageOff();
					showPageError("server");
					console.error(`step-${idSection}:`, "service-save-update error");
					console.error(error);
				}
			}
		});
	});
};

