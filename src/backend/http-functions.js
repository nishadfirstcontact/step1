import { ok, unauthorized, serverError } from 'wix-http-functions';
import wixData from 'wix-data';
import { getSecret } from 'wix-secrets-backend';

export async function get_fulldata(request) {
    try {
        const clientKey = request.headers["x-api-key"];
        console.log("🔐 Received API key:", clientKey);

        const storedKey = await getSecret("SyncAPIKey");
        console.log("🔐 Stored API key from secret:", storedKey);

        if (!clientKey || clientKey !== storedKey) {
            console.log("❌ API Key mismatch");
            return unauthorized("Invalid API Key");
        }

        const results = await wixData.query("FullData").limit(100).find();
        console.log("✅ Query successful. Total items:", results.totalCount);

        return ok({ members: results.items });

    } catch (err) {
        console.error("🔥 Server Error:", err.message, err.stack);
        return serverError("Server error: " + err.message);
    }
}
