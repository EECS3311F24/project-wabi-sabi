import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { useState } from 'react';
import SignupSuccess from './SignupSuccessCard';
import { Navigate } from 'react-router-dom';


// schema that defines the shape of the signup form
// so if you have email, password, confirm password, you put it in here so that
// you can validate the form data before submitting it
// -- here, we are adding an additional call "refine", which checks if the password and confirm password match
const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

/**
 * This component renders the signup form. A similar form can be found in Login.tsx.
 */
const Signup = () => {
  // useState is a react hook that helps us manage state
  // in this case, we are using it to manage the success state of the sign up
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // useForm is a custom hook provided by react-hook-form that helps us manage the form state
  // we pass in the form schema to validate the form
  // the default values are the initial values of the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // this is the function that calls the backend endpoint to sign up the user
  // the frontend will send the request to the /signup endpoint via fetch()
  // and the response will be stored in "response"
  const signup = async (email: string, password: string) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),

    };

    const response = await fetch('http://localhost:5000/signup', request);

    // await for response and convert it into JSON
    const data = await response.json();

    // if there was an error, return the error message
    if ('error' in data) {
      return data.error;
    } else {
      // what do we do if the sign up is successful?
      <Navigate to="/confirmation" />
    }
  };

  // this is the function that is called when the form is submitted
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    const errorMessage = await signup(email, password);
    if (errorMessage) {
      // if there is an error, display it
      form.setError('email', { message: errorMessage });
    } else {
      setSignUpSuccess(true);
      <Navigate to="/confirmation" />;
    }

    // remember to set setSignUpSuccess to true if the sign up is successful!
    // if there is an error however, we need to display it in the form...
  };

  // this return statement contains everything we're displaing in the page :)
  // we render SignupSuccess if the sign up was successful
  // otherwise, we render the sign up form
  return (
    <>
      {signUpSuccess && <SignupSuccess />}
      {!signUpSuccess && (
        <Card className="w-1/2">
          <CardContent className="py-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="text-center">
              <p className="text-xs">
                Back to{' '}
                <a href="/login" className="text-black-500 underline">
                  log in
                </a>
              </p>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Signup;
