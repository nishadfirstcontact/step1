import { ok, unauthorized, serverError } from 'wix-http-functions';
import wixData from 'wix-data';
import { getSecret } from 'wix-secrets-backend';

export async function get_fulldata(request) {
    try {
        const clientKey = request.headers["x-api-key"];
        const storedKey = await getSecret("SyncAPIKey");

        if (!clientKey || clientKey !== storedKey) {
            return unauthorized("Invalid API Key");
        }

        const results = await wixData.query("FullData")
            .limit(100)
            .find();

        return ok({ members: results.items });
    } catch (err) {
        console.error("Error occurred:", err);
        return serverError("Server error: " + err.message);
    }
}
