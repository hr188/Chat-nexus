
import { currentProfile } from "@/lib/curr-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { NavigationItem } from "./navigation-item";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
    const profile = await currentProfile();
    
    if(!profile){
        return  redirect("/");
    }

    const servers = await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId :profile.id,
                }
            }
        }
    });

    return ( 
    <div  className="space-y-4 flex flex-col items-center h-full  text-primary w-full dark:bg-[#1E1F22] py-3 " >
         
         <NavigationAction /> {/* add a server + button  */ }
         <Separator className="h-2px bg-zinc-300 dark:bg-zinc-700  rounded-md w-10 mx-auto" />

         <ScrollArea className="flex-1 w-full  " >
            {servers.map((server)=>(
                 <NavigationItem
                 id={server.id}
                 name = {server.name}
                 imageUrl={server.imageUrl}
                 />
            ))}
           
         </ScrollArea>
        <div className=" pb-3 mt-auto  flex item-center flex-col gap-y-4" >
            <ModeToggle/>
            <UserButton
            afterSignOutUrl="/"
            appearance={{
                elements:{
                    avatarBox:"h-[48px] w-[48px]"
                }
            }}
            />
        </div>

    </div> );
}
 
export default NavigationSidebar;