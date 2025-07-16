import wixData from 'wix-data';
import { secrets } from 'wix-secrets-backend.v2';
import axios from 'axios';

export async function syncAllFullDataToEditor() {
    const secret = await secrets.getSecretValue("SyncAPIKey");
    const API_KEY = secret.value;

    const editorEndpoint = "https://YOUR_EDITOR_SITE/_functions/receiveStudioMember"; // Replace this

    const result = await wixData.query("Members/FullData").limit(100).find();
    const members = result.items;

    for (let member of members) {
        try {
            const response = await axios.post(editorEndpoint, member, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY
                }
            });
            console.log(`✅ Synced: ${member.loginEmail}`);
        } catch (err) {
            console.error(`❌ Sync failed: ${member.loginEmail}`, err.response?.data || err.message);
        }
    }

    return { status: "done", count: members.length };
}
