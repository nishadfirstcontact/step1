import wixData from 'wix-data';
import { ok, badRequest } from 'wix-http-functions';

export async function post_receiveMembers(request) {
  try {
    const body = await request.body.json();
    await wixData.insert("Members", body);
    return ok({ message: "Member saved successfully" });
  } catch (e) {
    return badRequest({ error: e.message });
  }
}

export async function post_receiveGroups(request) {
  try {
    const body = await request.body.json();
    await wixData.insert("Groups", body);
    return ok({ message: "Group saved successfully" });
  } catch (e) {
    return badRequest({ error: e.message });
  }
}
