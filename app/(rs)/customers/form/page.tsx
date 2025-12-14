import {getCustomer} from "@/lib/queries/getCustomer";
import { customer } from "@/db/schema";
import { BackButton } from "@/components/BackButton";

export default async function CustomerFormPage({searchParams}: {searchParams: Promise<{customerId: string}>}) {
   let customerRecord: typeof customer.$inferSelect | null = null;
   const {customerId} = await searchParams;
   try {
    //Edit customer form
    if(customerId){
        customerRecord = await getCustomer(parseInt(customerId));
        console.log('customerRecord:', customerRecord);
    }
   } catch (error) {
    if (error instanceof Error){
        throw new Error(error.message);
    }
   }

    if (customerId && !customerRecord) {
        return (
            <div className="px-2 w-full">
                <div className="flex flex-col mx-auto max-w-sm py-4" justify-center items-center gap-4>
                    <h2 className="text-2xl font-bold mb-2">Customer ID #{customerId} not found</h2>
                    <BackButton title="Back to Customers" variant="default"/>
                </div>
            </div>
        )
    }else {
        //new Customer form component
    }

}