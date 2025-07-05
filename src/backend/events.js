import { setGuestlist } from 'backend/gatherAPICalls.jsw';

export async function wixMembers_onMemberUpdated(event) {
    const member = event.entity;
    console.log("wixMembers_onMemberUpdated triggered for member:", member);

    let memberEmail = member.loginEmail;
    const memberNickname = member.profile?.nickname || "Guest";

    if (member.status === "APPROVED") {
        await setGuestlist(memberEmail, memberNickname);
    }
}
