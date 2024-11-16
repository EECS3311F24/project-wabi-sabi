# Frontend Component Docs

## Table of Contents

1. [AuthProvider Documentation](#authprovider-documentation)
2. [Login Component Documentation](#login-component-documentation)
3. [Logout Component Documentation](#logout-component-documentation)
4. [DashboardContainer Documentation](#dashboardcontainer-documentation)
5. [Navbar Component Documentation](#navbar-component-documentation)
6. [Onboarding Component Documentation](#onboarding-component-documentation)
7. [ProtectedRoute Component Documentation](#protectedroute-component-documentation)
8. [Signup Component Documentation](#signup-component-documentation)
9. [SignupSuccess Component Documentation](#signupsuccess-component-documentation)
10. [TimerDashboard Component Documentation](#timerdashboard-component-documentation)
11. [TodoDashboard Component Documentation](#tododashboard-component-documentation)
12. [AddTask Component Documentation](#addtask-component-documentation)
13. [AddSubTask Component Documentation](#addsubtask-component-documentation)

---

<br><br>

# AuthProvider Documentation

## Overview

`AuthProvider` is a React context provider that manages user authentication throughout the application. It wraps the entire app and provides authentication functions, allowing components to access the authentication state and methods easily.

## Interfaces

### AuthContextType

Defines the shape of the authentication context:

- **isLoggedIn**: `boolean` - Indicates whether the user is logged in.
- **authToken**: `string | null` - Stores the authentication token.
- **login**: `(email: string, password: string) => Promise<string | undefined>` - Function to log in a user. Returns an error message if login fails.
- **logout**: `() => void` - Function to log out the user.

### AuthProviderProps

Props for the `AuthProvider` component:

- **children**: `React.ReactNode` - The components that will be wrapped by the provider.

### LoginSuccessResponse

Structure of the response for a successful login:

- **token**: `string` - The authentication token.

### LoginErrorResponse

Structure of the response for a failed login:

- **error**: `string` - Error message indicating the reason for the failed login.

## Usage

Wrap your application in the `AuthProvider` to enable access to the authentication context throughout the component tree

<br><br>

# DashboardContainer Documentation

## Overview

The `DashboardContainer` organizes the structure of the dashboard page. It includes a navigation bar, main content area, and logout functionality within a sidebar. This component provides a clean and structured layout for displaying different views within the dashboard and uses `Outlet` to render child routes.

## Dependencies

This component relies on:

- **`Logout`**: a component providing the logout option for the user, displayed within the right sidebar.
- **`Outlet`**: a React Router component used for rendering child routes dynamically.
- **`Navbar`**: a navigation bar component displayed at the top of the main content area.

## Component Structure

- **Container**: wraps the entire dashboard layout to manage the structure of the page.
  - **Left Sidebar**: placeholder for any additional sidebar content or UI elements (currently empty).
  - **Main Panel**: contains the primary content area, including:
    - **Navbar**: the navigation bar for dashboard navigation.
    - **Outlet**: a placeholder for rendering the currently active route’s content within the dashboard.
  - **Right Sidebar**: contains the `Logout` component, giving the user an accessible way to log out.

## Usage

The `DashboardContainer` should be used as a wrapper for all dashboard-related routes, allowing each view to be rendered within the main panel using `Outlet`. Place it in the routing configuration for paths that require this structured layout.

## Additional Notes

- **Customization**: Additional elements can be added to the left and right sidebars as needed to enhance the dashboard layout.
- **Responsive Design**: Ensure that the `.container` and sidebar classes are styled for responsiveness if the layout will be used on different screen sizes.
- **Routing**: The `Outlet` component allows for flexible routing, enabling dynamic content display based on the current route.

<br><br>

# Login Component Documentation

## Overview

The `Login` component is a user authentication form that allows users to sign in to the application. It includes input validation, error handling, and submission functionality, encapsulated within a structured UI layout. It uses the `AuthProvider` context to manage the authentication process and redirects authenticated users to the main page.

## Dependencies

This component relies on several libraries and components:

- **React Hook Form**: Manages form state and validation.
- **Zod**: Provides schema validation for the form fields.
- **React Router**: Used for navigating the user upon successful login.
- **ShadCN UI components**: UI components like `Card`, `Input`, and `Button`.

## Interfaces

### FormSchema

Defines the structure and validation for the form data:

- **email**: Required string that must be a valid email format.
- **password**: Required string with a minimum length of 8 characters.

### Login Component Structure

The `Login` component is composed of the following elements:

- **Card**: Wrapper container for the form.
- **CardContent**: Section containing the actual form.
- **Form**: Higher-order component from ShadCN that wraps the form.
- **FormField**: Component used for each form field (e.g., email, password).
- **FormItem**: Contains the individual form elements like labels, inputs, and error messages.
- **FormLabel**: Label for each form field.
- **FormControl**: Contains the input element.
- **FormMessage**: Displays error messages related to the field.
- **CardFooter**: Footer section with a link to the sign-up page.

## Usage

1. **Form Initialization**: Uses `useForm` from `react-hook-form` with `zodResolver` for validation based on the schema.
2. **Authentication Context**: Retrieves `isLoggedIn` and `login` methods from `useAuth`, provided by `AuthProvider`.
3. **Redirect on Login**: If the user is already authenticated, it redirects them to the main page.

<br><br>

# Logout Component Documentation

## Overview

The `Logout` component provides a dropdown menu with an option for the user to log out of the application. It utilizes the `AuthProvider` context to handle user authentication, specifically the `logout` function, to allow users to log out from any part of the application.

## Dependencies

This component relies on the following:

- **`useAuth`**: A custom hook from `AuthProviderUtils` to access the `logout` function for user authentication management.
- **Wabi Sabi Logo**: An SVG logo (`wabiSabiLogo`) used as the trigger for the dropdown menu.
- **Dropdown Menu Components**: UI components imported from `ui/dropdown-menu` to create a styled and functional dropdown menu:
  - `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, and `DropdownMenuTrigger`.

## Component Structure

- **Dropdown Trigger**: Displays the Wabi Sabi logo as the clickable icon that triggers the dropdown menu. It has a hover effect to indicate interactivity.
- **DropdownMenuContent**: Contains menu items for user actions within the dropdown.
  - **DropdownMenuLabel**: Displays "My Account" as a label within the dropdown.
  - **DropdownMenuSeparator**: Adds a divider to separate items visually.
  - **DropdownMenuItem**: A clickable item labeled "Log out" that triggers the `logout` function on click. It includes an icon (`LogOut`) from `lucide-react` alongside the label for a visual indication of the logout action.

## Usage

Place the `Logout` component within the navigation or header area of the application to give users easy access to log out. The component will call the `logout` function provided by `useAuth` when the "Log out" option is selected.

## Additional Notes

- **Accessibility**: The dropdown menu is accessible with the Wabi Sabi logo acting as the trigger. Users can easily identify it as an interactive element due to the hover effect.
- **Customization**: The `Logout` component can be customized with different icons or menu items based on user requirements.
- **Error Handling**: Ensure `logout` from `AuthProvider` is correctly implemented to handle any errors during the logout process.

<br><br>

# Navbar Component Documentation

## Overview

The `Navbar` component allows users to navigate between different dashboard sections, specifically a "Timer" and a "To-Do" page. It displays visually distinct buttons that indicate the currently active page based on color and style. This component utilizes React Router hooks to manage navigation and track the user's current location within the application.

## Dependencies

This component relies on:

- **React Router**:
  - `useNavigate`: A hook to programmatically navigate between pages.
  - `useLocation`: A hook to access the current URL path and determine the active page.
- **Button Components**:
  - `SelectedButton`: Displays a styled button to indicate the active page.
  - `UnselectedButton`: Displays a styled button to indicate inactive pages.
- **Icons**:
  - **Clock Icons**: `ClockOrange` and `ClockWhite` to represent the "Timer" page in active and inactive states.
  - **Todo Icons**: `TodoOrange` and `TodoWhite` to represent the "To-Do" page in active and inactive states.

## Component Structure

- **State (`activePage`)**: Manages the currently active page, defaulting to `"timer"`.
- **Effect Hook**: Tracks changes to the URL path and updates `activePage` based on the current location, ensuring the correct button is highlighted.
- **Button Components**:
  - **SelectedButton**: Renders with the active icon (orange) and highlights the current page.
  - **UnselectedButton**: Renders with the inactive icon (white) for unselected pages.

## Functionality

- **Active Page Detection**: Uses `useLocation` to dynamically set the `activePage` based on the current URL path.
- **Navigation**: `handleNavClick` updates the active page state and uses `navigate` to switch routes when a button is clicked.
- **Button Styling**: Active and inactive pages are visually distinguished by color through the `SelectedButton` and `UnselectedButton` components.

## Usage

Include the `Navbar` component within a layout or container that requires navigation between the "Timer" and "To-Do" dashboard views. This will allow users to click buttons to navigate between these sections easily, with visual feedback for the current active section.

## Additional Notes

- **Dynamic Active State**: The `Navbar` component automatically detects and updates the active page based on the current URL, making it responsive to direct URL navigation.
- **Icon Customization**: Different icons or colors can be easily swapped for additional or alternative dashboard sections.
- **Responsive Layout**: Ensure that styling in `.top-navbar` is responsive if needed for different screen sizes.

<br><br>

# Onboarding Component Documentation

## Overview

The `Onboarding` component provides a welcoming interface for new users, allowing them to either sign up or log in. It displays a brand logo and a motivational message, and dynamically switches between the `Signup` and `Login` components based on the current URL path. This component serves as the entry point for user authentication.

## Dependencies

This component relies on:

- **React Router**:
  - `useLocation`: A hook to access the current URL path and determine whether to display the signup or login form.
- **React**:
  - `useMemo`: Used to memoize the `isSignup` value to avoid recalculating on every render.
- **Components**:
  - `Login`: Component that renders the login form.
  - `Signup`: Component that renders the signup form.
- **Logo**:
  - `wabiSabiLogo`: A brand logo image displayed prominently on the onboarding page.

## Component Structure

- **State (`isSignup`)**: A memoized boolean that checks if the current path is `/signup`, determining which form to display.
- **Logo**: Displays the Wabi Sabi logo at the center of the main panel for brand recognition.
- **Main Content**:
  - **Motivational Message**: A tagline ("Put your life in focus") below the logo for branding purposes.
  - **Dynamic Form**: Renders the `Signup` form if `isSignup` is `true`; otherwise, renders the `Login` form.

## Functionality

- **Dynamic Form Switching**: The `isSignup` variable determines which form to render based on the URL path (`/signup` for the signup form, otherwise the login form).
- **Responsive Layout**:
  - The component uses flexbox to center elements and adjust layout based on screen size, with specific styles applied for larger screens.
  - The tagline is hidden on smaller screens and only shown on medium and larger screens for better mobile compatibility.

## Usage

Use the `Onboarding` component as the main entry point for user authentication. This component should be included in routes where users can access the login or signup forms.

## Additional Notes

- **Customization**: The logo, tagline, and forms can be replaced or customized based on branding and application requirements.
- **Responsive Design**: Ensure `.container`, `.left-sidebar`, and `.right-sidebar` styles are responsive to handle various screen sizes if the onboarding layout is to be ad

<br><br>

# ProtectedRoute Component Documentation

## Overview

The `ProtectedRoute` component is a higher-order component that restricts access to certain routes based on the user’s authentication status. If the user is logged in, it renders the specified child component. If the user is not logged in, it redirects them to the login page.

## Dependencies

This component relies on:

- **React Router**:
  - `Navigate`: Used to programmatically redirect unauthenticated users to the login page.
- **`useAuth`**: A custom hook from `AuthProviderUtils` that provides access to the current authentication status.

## Props

### ProtectedRouteProps

- **children**: `ReactNode` - The components that should be rendered if the user is authenticated.

## Component Functionality

- **Authentication Check**: Uses `isLoggedIn` from `useAuth` to determine if the user is logged in.
- **Conditional Rendering**:
  - If `isLoggedIn` is `true`, renders the `children` components, allowing access to the protected route.
  - If `isLoggedIn` is `false`, redirects the user to the `/login` page.

## Usage

Wrap any routes or components that require authentication with `ProtectedRoute` to ensure only logged-in users can access them. Place it in your routing configuration or directly around components that need protection.

Example:

```tsx
<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```

<br><br>

# Signup Component Documentation

## Overview

The `Signup` component provides a form for users to create a new account. It includes fields for email, password, and password confirmation with validation rules to ensure data integrity. On successful submission, it either shows a success message or redirects to a confirmation page. If there is an error, it displays the error message in the form.

## Dependencies

This component relies on:

- **Form Components**:
  - **`Card`, `CardContent`, `CardFooter`**: UI components used to structure the form.
  - **Form and Form Elements**: `Form`, `FormControl`, `FormField`, `FormItem`, `FormLabel`, and `FormMessage` to structure and manage the form layout.
  - **Input**: Used for capturing user data for each field.
  - **Button**: A submit button to trigger form submission.
- **Validation**:
  - **Zod**: A validation library used to define and enforce the schema for form fields.
  - **React Hook Form**: Manages form state and validation.
- **Routing**:
  - **Navigate**: Used to redirect users to a confirmation page upon successful signup.
- **Custom Components**:
  - `SignupSuccess`: A component to display a success message after signup.

## Component Structure

- **Form Schema (`formSchema`)**:
  - **email**: A required string that must be a valid email format.
  - **password**: A required string with a minimum of 8 characters.
  - **confirmPassword**: Validates that it matches the `password` field.
- **State (`signUpSuccess`)**: Tracks whether the signup was successful, controlling whether to show the form or the success message.
- **Form Fields**:
  - **Email**: Captures the user’s email address.
  - **Password**: Captures the user’s chosen password.
  - **Confirm Password**: Confirms that the password matches.

## Functionality

- **Form Validation**: Uses `zod` and `react-hook-form` to validate that the email is valid and the password fields match and meet length requirements.
- **Signup Function (`signup`)**: Sends the signup data to the backend API. If the signup is successful, `signUpSuccess` is set to `true` to show the success message.
- **Error Handling**: If an error occurs (e.g., email already in use), the error message is displayed in the form.
- **Form Submission (`onSubmit`)**: Manages form submission, calling `signup` and handling the success state or displaying any errors.

## Usage

Include the `Signup` component on a route that allows new users to create an account. The component automatically validates data and shows appropriate messages based on the response.

## Additional Notes

- **Form Redirect**: The component uses `<Navigate to="/confirmation" />` to redirect upon successful signup. Update the path if a different confirmation or welcome page is needed.
- **Error Feedback**: Error messages from the backend are displayed under the relevant fields, providing clear feedback to the user.
- **Customization**: Adjust form fields, validation requirements, and success messages as needed to fit specific application requirements.

<br><br>

# SignupSuccess Component Documentation

## Overview

The `SignupSuccess` component displays a confirmation message to the user after a successful signup. It provides a simple, centered card with a message indicating the signup was successful and includes a link to return to the login page.

## Dependencies

This component relies on:

- **Card Components**:
  - **`Card`, `CardContent`, `CardFooter`**: UI components used to create a structured, centered card layout for the success message.

## Component Structure

- **Card**: A container for the confirmation message.
  - **CardContent**: Contains the main success message.
  - **CardFooter**: Provides a footer with a link for navigating back to the login page.

## Functionality

- **Success Message**: Displays a message ("You have successfully signed up") to confirm that the signup process was completed.
- **Login Link**: Provides a link that redirects the user back to the login page.

## Usage

Use the `SignupSuccess` component within the signup flow to provide feedback upon a successful registration. It can be displayed conditionally after the signup form submission succeeds.

## Additional Notes

- **Customization**: The message text or link styling can be modified to align with application-specific design guidelines.
- **Routing**: Ensure that the `/login` path aligns with the actual login route in the application.
- **User Experience**: The component provides a straightforward confirmation to reassure the user that their account creation was successful.

<br><br>

# TimerDashboard Component Documentation

## Overview

The `TimerDashboard` component provides a timer interface for a Pomodoro-style timer with three modes: **Pomodoro**, **Short Break**, and **Long Break**. It uses a countdown timer to track session and break durations, with controls for play, pause, reset, and mode switching. The component automatically switches modes when the timer completes each cycle.

## Dependencies

This component relies on:

- **Custom Hooks**:
  - `useCountdown`: A hook to handle the countdown timer logic, including toggling, resetting, and setting the timer duration.
- **UI Components**:
  - `Button`: Used for various control actions (play, pause, reset, and mode switching).
  - `SelectedButton`: A visually distinct button for indicating the currently active timer mode.
  - `ClockFace`: Displays the remaining minutes and seconds in the timer.
- **Assets**:
  - **Icons**: Images for play, pause, reset, and skip icons to represent each button’s function.

## Component Structure

- **Timer Modes**:

  - **Pomodoro**: A 25-minute work session.
  - **Short Break**: A 5-minute break following each Pomodoro session, up to 4 short breaks in a cycle.
  - **Long Break**: A 15-minute break after 4 short breaks in the cycle.

- **State Management**:

  - **timerState**: Tracks the current mode (`pomodoro`, `shortBreak`, or `longBreak`).
  - **sessionCount**: Tracks the number of completed Pomodoro sessions.
  - **breaksCount**: Tracks the number of short breaks in a cycle.
  - **MAX_SHORT_BREAKS**: Limits the number of short breaks before switching to a long break.

- **Effect Hook**: Watches the countdown and automatically switches between timer modes based on `minutes`, `seconds`, and `timerState`.

## Functionality

- **Countdown Timer**: The timer countdown is managed by `useCountdown`, which provides functions to toggle, reset, and set the timer duration.
- **Mode Switching**:
  - **Auto-Switch**: When a timer completes, it switches to the next appropriate mode.
  - **Manual Mode Change**: Allows users to manually switch between Pomodoro, Short Break, and Long Break modes.
- **Timer Control Buttons**:
  - **Play/Pause Button**: Toggles the countdown timer.
  - **Reset Button**: Resets the current mode’s timer.
  - **Mode Buttons**: Switches the timer mode, with the selected mode visually highlighted.

## Usage

Place the `TimerDashboard` component within the application where users can interact with the Pomodoro timer. Users can start, pause, reset, and switch between modes as desired.

<br><br>

# TodoDashboard Component Documentation

## Overview

The `TodoDashboard` component is a page for displaying the users task in a table and updating the table. Each table row has a checkbox to mark completion, task title, due date(optional) and the three dots icon for deletion. The page uses an button above the table that pops up another page, `AddTask` to add tasks. 

## Dependencies

This component relies on:

- **AuthProvider**: It gets the user's authentication token.
- **Table Components**: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell` for displaying the tasks in a table.
- **Dropdown Menu Components**: For task options like deletion.
- **Checkbox**: For toggling between completed and not completed.
- **AddTask**: A component that displays a pop page for adding a task.

## Component Structure

- **State Management**:
  - `tasks`: Tracks the currenly add task(including an empty one)
  - `dialogOpen`: Tracks if the pop page is open or not
.
- **Functions**:
  - `getTasks`: Makes a GET request to backend to get the list of tasks.
  - `addTask`: Makes a POST request to add a new task to the list and updates the on the table.
  - `toggleCompletionCheckBox`: Updates the completion status of a task.
  - `deleteTask`: Deletes a task from the list and updates the table.

## Usage

1. **Fetching Tasks**: When the page loads, `getTasks` is called to retrieve and render the user’s tasks from the backend.
2. **Adding a Task**: Opens the `AddTask` dialog, where the user can add a new task. If a title is provided, it triggers `addTask` to add the task to the backend and update the UI.
3. **Marking Tasks as Complete**: Toggles the completion status using `toggleCompletionCheckBox`.
4. **Deleting a Task**: Deletes the task from the list and the backend using `deleteTask`.

## Additional Notes

- **Error Handling**:  All errors occured while make a reqeust a backend are logged to the console.


<br><br>

# AddTask Component Documentation

## Overview

The `AddTask` displays a form with two inputs and a button. The first one is for the task title, and the other one is for due date which is optional. It makes sure the user 
enters the title of the task before making a submission.

## Dependencies

This component relies on:

- **Dialog Components**: `Dialog`, `DialogTrigger`, `DialogOverlay`, `DialogContent`, `DialogTitle`, and `DialogDescription` for displaying the pop up page.
- **Button Components**: `SelectedButton` to open the pop up page and `UnselectedButton` for adding a task.
- **ShadCN UI Components**: Provides the styling and layout for the pop up page.

## Interfaces

### AddTaskProps

Defines the properties of the prop for `AddTask` component:

- **dialogOpen**: `boolean` - Manages the visibilty of the page(Open or Closed). 
- **setDialogOpen**: `(open: boolean) => void` - A fucntion that changes the dialog or the pop up page(Open or Closed).
- **addTask**: `(taskTitle: string, dueDate?: string, subTasks?: string[]) => void` - A function that to add a task given a task title and user input.

## Component Structure

- **State Management**:
  - `taskTitle`: Stores the task's title.
  - `dueDate`: Stores the due date of a task. Its empty if the due date is not provided.
  - `emptyTitleError`: Manages the visibility of a warning message if the title is empty.
  - `subTasks`: Stores the list of subtasks. Initially empty


- **Functionality**:
  - `handleSubmit`: Makes sure that the task title is provided by the user. If the task title is provided it adds the task else it returns a warning message below task title input.
  - `handleSubtasksChange`: updates with the subtasks list passed from `AddSubTask`

## Functionality
- **Input Validation**: It makes sure that a task title is provided before adding the task. If the title is missing, a warning message below task title input is displayed.
- **Form Submission**: When the form is submitted a `addTask` is called to add the task.

## Usage

Users can use the `AddTask` component within any dashboard or task list component where users need to add new tasks. Place it within a button-triggered dialog to keep the form accessible yet unobtrusive.

## Additional Notes

- **Error Feedback**: A warning text is displayed if the user tries to add a task without a task title.


<br><br>

# AddSubTask Component Documentation

## Overview

The `AddSubTask` displays a table of subtasks created. Users can add these subtasks using a pop-up form that requires a subtask title.

## Dependencies

This component relies on:

- **Dialog Components**: `Dialog`, `DialogTrigger`, `DialogHeader`, `DialogContent`, and `DialogTitle` for displaying the inner pop up page.
- **Button Components**: `Button` to open the pop up page.
- **ShadCN UI Components**: Provides the styling and layout for the pop up page.
- **Table Components**: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell` for displaying the tasks in a table.

## Interfaces

### AddTaskProps

Defines the properties of the prop for `AddTask` component:

- **parentTaskId**: `string` - A string that holds the parent's task id
- **onSubtasksChange**: `(subtasks: SubTask[]) => void` - A function that updates the list of subtasks

## Component Structure

- **State Management**:
  - `subTaskTitle`: Stores the subtask's title.
  - `subTasks`: Stores the list of subtasks. Initially empty
  - `isSubtaskDialogOpen`: Manages the visibility of the inner subtask dialogue popup.

- **Functionality**:
  - `handleAddSubtask`: Makes sure that the subtask title is provided by the user. If the subtask title is provided it adds the subtask else it returns a warning message below task title input.

## Functionality
- **Input Validation**: It makes sure that a task title is provided before adding the subtask. If the title is missing, a warning message below subtask title input is displayed.
- **Form Submission**: When the form is submitted a `handleAddSubtask` is called to add the subtask into the list.

## Usage

Users can use the `AddSubTask` component within any task list component where users need to add new subtasks to their new tasks. Place it within a button-triggered dialog within the `AddTask` dialog to keep the form accessible yet unobtrusive.

## Additional Notes

- **Error Feedback**: A warning text is displayed if the user tries to add a subtask without a task title.
