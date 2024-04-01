"use client"

import React from "react"

import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import LoadingButton from "../ui/loading-button"
import useMutateOrder from "@/hooks/use-mutate-order"
import { Textarea } from "../ui/textarea"
import { StorefrontProduct } from "@/types"

type Props = {
  cartItems: StorefrontProduct[]
}

export const CheckoutForm: React.FC<Props> = ({ cartItems }) => {
  const { form, isPending, onSubmit, buttonText } = useMutateOrder(
    undefined,
    cartItems
  )

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div>
            <FormField
              control={form.control}
              name="buyerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Shipping address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Billboard</FormLabel>
              <Select
                disabled={true}
                value={"pay_with_cash"}
                defaultValue={"pay_with_cash"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={"pay_with_cash"}
                      placeholder="Select a billboard"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"pay_with_cash"}>Pay with cash</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </div>
          <LoadingButton
            isLoading={isPending}
            disabled={cartItems.length === 0}
            className="w-full mt-6 rounded-full"
            type="submit"
          >
            {buttonText}
          </LoadingButton>
        </form>
      </Form>
    </>
  )
}
