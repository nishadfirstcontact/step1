import { setGuestlist } from 'backend/gatherAPICalls.jsw';
import { fetch } from 'wix-fetch';

export async function wixMembers_onMemberUpdated(event) {
    const member = event.entity;
    console.log("Event triggered for:", member);

    let memberEmail = member.loginEmail;
    const memberNickname = member.profile?.nickname || "Guest";

    if (member.status === "APPROVED") {
        console.log("Approved user:", memberEmail);
        await setGuestlist(memberEmail, memberNickname);
    }
}




export function FullData_afterInsert(item, context) {
    const endpoint = "https://firstcontactlgbt.wixsite.com/_functions/receiveStudioMember";
    const apiKey = "my-super-secret-api-key-12345";

    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify(item)
    });
}
