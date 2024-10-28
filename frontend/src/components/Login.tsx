import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { useAuth } from './AuthProviderUtils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  // periodically checks if the user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // this is the function that is called when the form is submitted
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    const errorMessage = await login(email, password);
    if (errorMessage) {
      // if there is an error, display it
      form.setError('email', { message: errorMessage });
    } else {
      navigate('/');
    }
  };

  return (
    <>
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
            <p className="text-xs">
              Don't have an account?{' '}
              <a href="/signup" className="text-black-500 underline">
                Sign up
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Login;
