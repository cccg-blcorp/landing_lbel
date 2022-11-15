import { publicKey } from '../config'

export const encryptData = data => {

	for (const key in data) {
		data[key] = forge.util.encode64(publicKey.encrypt(data[key], 'RSA-OAEP', { md: forge.md.sha256.create(), mgf1: forge.mgf1.create() }))
	}

	return data

}
