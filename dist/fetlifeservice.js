"use strict";
const Constants = require('./constants');
const node_fetch_1 = require('node-fetch');
class FetlifeService {
    login(username, password) {
        const body = {
            username,
            password,
            grant_type: Constants.GRANT_TYPE_PASSWORD
        };
        return node_fetch_1.default(`${Constants.BASE_URL}/api/oauth/token`, {
            body: JSON.stringify(body),
            method: 'POST'
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FetlifeService;
