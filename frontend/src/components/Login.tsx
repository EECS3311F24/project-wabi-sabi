import wabiSabiLogo from '../assets/wabi-sabi-logo.svg';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';

// schema that defines the shape of the form data
// so if you have email, password, username, you put it in here so that
// you can validate the form data before submitting it
// also because frontend forms are dogshit that they need dependcies for everything
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

/**
 * This is our Login component that is used to render the login form.
 * The structure of this is as follows
 * > Wabi Sabi Logo
 * > Card (contains the login form)
 * -- CardContent (where we actually display whatever our card contains; in this case, the form)
 *    -- Form (wraps the form)
 *      -- form (actual form that we submit)
 *       -- FormField (wraps the specific field like email, password)
 *        -- FormItem (contains the label, input, and error message)
 *          -- FormLabel (label for the form field)
 *          -- FormControl (contains the input)
 *          -- FormMessage (error message)
 * > Footer with link to sign up
 * --
 * Link to docs: https://ui.shadcn.com/docs/components/form
 * @returns
 */
const Login = () => {
  // useForm is a custom hook provided by react-hook-form that helps us manage form state
  // we pass in the form schema and a resolver to validate the form

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // this is the function that is called when the form is submitted
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //TODO: we need to call the login API here
    console.log(values);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img src={wabiSabiLogo} alt="Wabi Sabi Logo" className="w-1/2 h-auto mt-20" />
        <h2 className="text-center text-l hidden md:block" style={{ fontSize: '1em' }}>
          Put your life in focus.
        </h2>
      </div>
      <div className="mt-20 flex justify-center items-center">
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
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="text-center">
              <p className="text-sm">
                Don't have an account?{' '}
                <a href="/signup" className="text-black-500 underline">
                  Sign up
                </a>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
