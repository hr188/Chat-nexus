import { currentUser ,redirectToSignIn } from "@clerk/nextjs/server"; 
import { db } from "@/lib/db";

export const initialProfile = async () => {
    const user = await currentUser();
    if (!user) {
        return redirectToSignIn();
    }
    
    const { id } = user;
    const profile = await db.profile.findUnique({
        where: { userId: id },
    });
    
    if(profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data:{
            userId: id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,

        }
    })
    return newProfile;
};