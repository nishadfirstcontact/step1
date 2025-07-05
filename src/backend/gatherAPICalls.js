import { secrets } from 'wix-secrets-backend.v2';

export async function setGuestlist(email, nickname) {
    const API_KEY = await secrets.getSecretValue("kGyAO34s4Q4Qv544");
    const SPACE_ID = await secrets.getSecretValue("Yt32dlYXKfLgGkuI\\nishad");
    try {
        const response = await fetch("https://api.gather.town/api/setEmailGuestlist", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                apiKey: API_KEY.value,
                spaceId: SPACE_ID.value,
                guestlist: { [email]: { name: nickname, role: "guest" } },
                overwrite: false
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Guest list updated successfully:', data);
        } else {
            console.error('Error from Gather API:', await response.text());
        }
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}
