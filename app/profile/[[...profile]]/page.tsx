import { UserProfile } from '@clerk/nextjs'
import { requireOnboardedBusiness } from "@/lib/dal";
import { ProfileForm } from "../profile-form";

export default async function UserProfilePage(){
    const business = await requireOnboardedBusiness();

    return(
        <main className="flex flex-1 flex-col items-center gap-12 p-8">
            <UserProfile />

            <div className="w-full max-w-3xl">
                <ProfileForm
                    defaultValues={{
                        name: business.name,
                        cuisine: business.cuisine,
                        goal: business.goal,
                        signatureDishes: business.signatureDishes,
                        specials: business.specials,
                        socialHandles: business.socialHandles,
                        address: business.address,
                        phone: business.phone,
                    }}
                />
            </div>
        </main>
    )
};