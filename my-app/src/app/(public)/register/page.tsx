'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {  Form ,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { registerNewUser } from '@/actions/users';



const RegisterPage = () => {

 const [loading, setLoading] = useState(false)

 const router = useRouter();


  const formSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['user','salon-spa-owner'])
  })


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues:{
      name: "",
      email: "",
      password: "",
      role: "user",
    }
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
     
      try{

        setLoading(true)

        const response = await registerNewUser(values)

        if(response.success){
          toast.success("Account created successfully")
          router.push('/login')
        }else{
          toast.error(response.message);
        }

      }catch(error: any){
        toast.error(error.message)
      }finally{
        setLoading(false);
      }
  }

  return (
    <div className='auth-bg'>
        <div className='bg-white p-5 rounded-sm w-[500px]'>
            <h1 className="text-xl font-bold! text-gray-600">
              Register your account
            </h1>

            <hr className='my-7 border-t border-gray-300'/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                 control={form.control}
                 name="name"
                 render={({ field }) => (
                 <FormItem>
                  <FormLabel>Name</FormLabel>
                   <FormControl>
                     <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>)}/>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>


            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-20">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="user" />
                        </FormControl>
                        <FormLabel className="font-normal">User</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="salon-spa-owner" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Salon/Spa Owner
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>

                <div className="flex justify-between items-center">
                 <div className="flex gap-5 text-sm">
                   Already have an account?{" "}
                   <Link href="/login" className="underline">
                     Login
                   </Link>
                  </div>
                <Button type="submit" disabled={loading}>
                  Submit
               </Button>
            </div>

                </form>
            </Form>
        </div>
    </div>
  )
}

export default RegisterPage