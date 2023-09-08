import { initialProfile } from "@/lib/initial-profile";
import { Redirect } from "next/navigation";
import {db} from "@/lib/db";
import {InitialModal} from "@/components/modals/Initial-modal";

const SetupPage = async () => {
    const profile = initialProfile();
    const server  = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });
    if (server) {
        return <Redirect to={`/servers/${server.id}`} />;
    }

    return ( <InitialModal/> );
}
 
export default SetupPage;