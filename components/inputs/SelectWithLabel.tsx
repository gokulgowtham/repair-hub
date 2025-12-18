"use client"
import { useFormContext } from "react-hook-form"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type DataItem = {
    value: string
    label: string
}

type SelectWithLabelProps<T>= {
    fieldTitle: string
    nameInSchema: keyof T & string,
    className?: string,
    data: DataItem[]
}

export function SelectWithLabel<T>({fieldTitle, nameInSchema, data, className, ...props}: SelectWithLabelProps<T>) {
    const form = useFormContext()

    return (
        <FormField
        control={form.control}
        name={nameInSchema}
        render={({field})=>(
            <FormItem>
                <FormLabel className="text-base mb-2" htmlFor={nameInSchema}>{fieldTitle}</FormLabel>
                <FormControl>
                    <Select {...field} onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <>
                            <SelectTrigger 
                            id={nameInSchema} 
                            className={`w-full max-w-xs ${className}`}>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                {data.map((item)=>(
                                    <SelectItem key={`${nameInSchema}-${item.value}`} value={item.value}>
                                        <span className="font-normal">{item.label}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                            </>
                        </FormControl>
                    </Select>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        />
    )
}