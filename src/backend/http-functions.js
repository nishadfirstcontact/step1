import { ok, serverError } from 'wix-http-functions';
import wixData from 'wix-data';

export function get_fulldata(request) {
    return wixData.query("Members/FullData")
        .limit(100)
        .find()
        .then(results => ok({ members: results.items }))
        .catch(error => serverError(error));
}
