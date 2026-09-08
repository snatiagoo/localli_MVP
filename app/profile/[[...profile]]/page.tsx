import { UserProfile } from '@clerk/nextjs'
import { requireOnboardedBusiness } from "@/lib/dal";
import { ProfileForm } from "../profile-form";

export default async function UserProfilePage(){
    const business = await requireOnboardedBusiness();

    return(
        <main className="flex min-h-screen flex-col items-center gap-12 p-8">
            <UserProfile />

            <div className="w-full max-w-lg">
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