"use client";
import { useState } from "react";
import { useToast } from "@/hooks/toast/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import NumberInputV2 from "@/components/form-components/NumberInputV2";
const formSchema = z.object({
  name_3692739294: z.number().min(0).max(100),
  name_3692739295: z.number().min(0).max(100),
  name_3692739296: z.number().min(0).max(100),
});

export default function TestForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-2 max-w-3xl w-full py-10"
      >
        <FormField
          control={form.control}
          name="name_3692739294"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumberInputV2 type="number" {...field} />
              </FormControl>
              <FormLabel />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name_3692739295"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumberInputV2 type="number" {...field} />
              </FormControl>
              <FormLabel />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name_3692739296"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumberInputV2 type="number" {...field} />
              </FormControl>
              <FormLabel />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
