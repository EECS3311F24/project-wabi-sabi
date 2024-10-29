import { Card, CardContent, CardFooter } from './ui/card';

/**
 * The confirmation that pops up if the user signed up successfully.
 * @returns
 */
const SignupSuccess = () => {
  return (
    <>
      <Card className="w-1/2">
        <CardContent className="py-6">
          <h2>You have successfully signed up.</h2>
        </CardContent>
        <CardFooter>
          <div className="text-center">
            <p className="text-xs">
              <a href="/login" className="text-black-500 underline">
                Return to login
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignupSuccess;
