const pKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAr+tSemRSg+gVeCi+nHcP
OQaEwXz95skMA65KySjXcJdwJEx7zFgvgE5wsXtiilDwAmBcZw6dk9/PSXd9klc/
1JjQvM4D/iwC1m8AuAEpKgHLMLy+AUt48FSbeNfPoHKxapJIPucMYO2lGmwndpNG
rEZAQ5e3a5H6h1RzcL6ub9Al4BIce1yfeJokMOiww1VksUFC7o7awr412CC1otw+
FiE+92PIFHsQPirAVoqh04nN/gtiu85ieGtNRW9rMi0oUS0YSn7sp2gOfsn8wN9T
yW1UcEBIxes1pwnKVjg67WHjKMAWFcbdL8xiia/RkUvL117vQUYUfy1xsoF0oDAq
2M9vXJN8Hil2Y1KT+oPT+RFBnsAp+MeU5+4DTWrwDruhI2dHYYjcSqW6G9Y4w8Bd
0UwBrv6iBr97mpsxlQenvUMOUNa4ygqcZTM1+IdxGf2OV2fXYcnZ13F2pyYntxAh
bwM+nPcXTkRji1SsJJaS+HfoGC5spUIwwBOO1ebzvmhQFWVu+Gs89PzW64v9ycku
RKn0aqHi4K/zZyqToUt2RwuRA1OhOn/lMHxw3V2xhb4GyMmjfWNWcMS4B16TScZG
oQsu1SA6TlNezYVCYO5nXXDsMu1c/u408r5qdTaJr1RL+YCnrqrEC67ina6121OT
0fbF8hDtC/kdYnO7h5Bub98CAwEAAQ==
-----END PUBLIC KEY-----`

export const publicKey = forge.pki.publicKeyFromPem(pKey)

export const tokenWebService = 'ABCFGTYU567RDTSGT678'

export const brandName = 'LBEL'
