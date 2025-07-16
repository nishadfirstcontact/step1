import { ok, unauthorized, serverError } from 'wix-http-functions';
import wixData from 'wix-data';
import { getSecret } from 'wix-secrets-backend';

export async function get_fulldata(request) {
    const clientKey = request.headers["x-api-key"];
    const storedKey = await getSecret("SyncAPIKey");

    if (!clientKey || clientKey !== storedKey) {
        return unauthorized("Invalid API Key");
    }

    try {
        const results = await wixData.query("Members/FullData")
            .limit(100)
            .find();
        return ok({ members: results.items });
    } catch (err) {
        return serverError(err);
    }
}
