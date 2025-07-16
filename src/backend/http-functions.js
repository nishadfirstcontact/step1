import { ok, unauthorized, serverError } from 'wix-http-functions';
import wixData from 'wix-data';
import { getSecret } from 'wix-secrets-backend';

export async function get_fulldata(request) {
    try {
        // Safe header access
        const clientKey = request.headers.get("x-api-key");
        const storedKey = await getSecret("SyncAPIKey");

        console.log("🔐 Client Key:", clientKey);
        console.log("🔐 Stored Key:", storedKey);

        if (!clientKey || clientKey !== storedKey) {
            console.log("❌ API Key mismatch");
            return unauthorized("Invalid API Key");
        }

        const results = await wixData.query("FullData").limit(100).find();

        console.log("✅ Data fetched:", results.totalCount);
        return ok({ members: results.items });

    } catch (err) {
        console.error("🔥 Server error:", err.message, err.stack);
        return serverError("Internal error: " + err.message);
    }
}
