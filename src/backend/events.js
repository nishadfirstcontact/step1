import { setGuestlist } from 'backend/gatherAPICalls.jsw';

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
