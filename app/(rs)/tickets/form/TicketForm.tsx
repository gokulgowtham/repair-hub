'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import { insertTicketSchema, type insertTicketSchemaType, type selectTicketSchemaType } from '@/zod-schemas/ticket';
import { selectCustomerSchemaType } from '@/zod-schemas/customer';
import { TextAreaWithLabel } from '@/components/inputs/TextAreaWithLabel';
import { InputWithLabel } from '@/components/inputs/InputWithLabel';
import { CheckBoxWithLabel } from '@/components/inputs/CheckBoxWithLabel';

type TicketFormProps = {
    customer: selectCustomerSchemaType;
    ticket?: selectTicketSchemaType;
}
export default function TicketForm({customer, ticket}: TicketFormProps) {
    const defaultValues: insertTicketSchemaType = {
        id: ticket?.id ?? '(New)',
        customerId: ticket?.customerId ?? customer.id,
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        tech: ticket?.tech ?? 'new-ticket@example.com',
        completed: ticket?.completed ?? false,
    }

    const form = useForm<insertTicketSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertTicketSchema),
        defaultValues,
    });
    
    async function submitForm(data: insertTicketSchemaType){
        console.log('data:', data);
    }
    return (
        <div className="flex flex-col gap-1 sm: px-8">
            <div>
                <h2 className="text-2xl font-bold">
                    {ticket?.id ?'Edit': 'New'} Ticket {ticket?.id ? `#${ticket.id}` : ''}
                </h2>
            </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertTicketSchemaType> fieldTitle="Title" nameInSchema="title" />
                        <InputWithLabel<insertTicketSchemaType> fieldTitle="Tech" nameInSchema="tech" disabled />
                        <CheckBoxWithLabel<insertTicketSchemaType> fieldTitle="Completed" nameInSchema="completed" message="Yes" />
                        <div className="mt-2 space-y-2">
                            <h3 className="text-lg font-bold">Customer Information</h3>
                            <hr className="w-4/5" />
                            <p><span className="font-bold">Name:</span> {customer.firstName} {customer.lastName}</p>
                            <p><span className="font-bold">Address:</span> {customer.address1} {customer?.address2 ?? ''} {customer.city} {customer.state} {customer.zip}</p>
                            <hr className="w-4/5" />
                            <p><span className="font-bold">Email:</span> {customer.email}</p>
                            <p><span className="font-bold">Phone:</span> {customer.phone}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <TextAreaWithLabel<insertTicketSchemaType> fieldTitle="Description" nameInSchema="description" className="h-70" />
                        <div className="flex gap-2">
                            <Button type="submit" className="w-3/4" variant="default" title="Save Ticket">Save Ticket</Button>
                            <Button type="button" className="w-1/4" variant="destructive" title="Reset" onClick={() => form.reset(defaultValues)}>Reset</Button>
                        </div>
                    </div>
            </form>
        </Form>
        </div>
    )
}