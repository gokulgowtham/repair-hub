import { getTicket } from "@/lib/queries/getTicket";
import { customer, ticket } from "@/db/schema";
import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";

export default async function TicketFormPage({ searchParams }: { searchParams: Promise<{ ticketId: string, customerId: string }> }) {
    let ticketRecord: typeof ticket.$inferSelect | null = null;
    let customerRecord: typeof customer.$inferSelect | null = null;
    const { ticketId, customerId } = await searchParams;
    console.log('ticketId:', ticketId);
    console.log('customerId:', customerId);
    try {
        //Edit customer form
        if (ticketId) {
            ticketRecord = await getTicket(parseInt(ticketId));
            console.log('ticketRecord:', ticketRecord);
        }
        if (customerId) {
            customerRecord = await getCustomer(parseInt(customerId));
            console.log('customerRecord:', customerRecord);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }

    if (!ticketId && !customerId) {
        return (
            <div className="px-2 w-full">
                <div className="flex flex-col mx-auto  py-4" justify-center items-center gap-4>
                    <h2 className="text-2xl font-bold mb-2">Ticket ID  or Customer ID required to load ticket form</h2>
                    <BackButton title="Back to Tickets" variant="default" />
                </div>
            </div>
        )
    } else {
        //new Ticket form component
        if (customerId) {
            const customerRecord = await getCustomer(parseInt(customerId));

            if (!customerRecord) {
                return (
                    <div className="px-2 w-full">
                        <div className="flex flex-col mx-auto  py-4" justify-center items-center gap-4>
                            <h2 className="text-2xl font-bold mb-2">Customer ID #{customerId} not found</h2>
                            <BackButton title="Back to Customers" variant="default" />
                        </div>
                    </div>
                )
            }
            if (!customerRecord.active) {
                return (
                    <div className="px-2 w-full">
                        <div className="flex flex-col mx-auto  py-4" justify-center items-center gap-4>
                            <h2 className="text-2xl font-bold mb-2">Customer ID #{customerId} is not active</h2>
                            <BackButton title="Back to Customers" variant="default" />
                        </div>
                    </div>
                )
            }

            // return ticket form component
        }

        //edit ticket form component
        if (ticketId) {
            if (!ticketRecord) {
                return (
                    <div className="px-2 w-full">
                        <div className="flex flex-col mx-auto py-4" justify-center items-center gap-4>
                            <h2 className="text-2xl font-bold mb-2">Ticket ID #{ticketId} not found</h2>
                            <BackButton title="Back to Tickets" variant="default" />
                        </div>
                    </div>
                )

            }
            const customer = await getCustomer(ticketRecord.customerId);
            // Return ticket form component with customer
            console.log('ticket form component with customer:', customer);
        }
    }
}