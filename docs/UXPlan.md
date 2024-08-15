# Daily Habit Tracker App - UX Requirements

## **Project Overview**

This document outlines the UX requirements for the **Daily Habit Tracker** app. The goal is to design a user-friendly and functional app that tracks daily habits and provides insights into user progress. The app will support multiple platforms, including Android, iOS, React Native, and Flutter, and will be built using a Node.js backend with GraphQL.

## **Screens and Their Purpose**

### **1. Login/Sign Up Screen**

- **Purpose**: Authenticate users and enable account creation.
- **Components**:
  - Email/Username input field.
  - Password input field.
  - Login button.
  - Sign Up button.
  - Forgot Password link.
- **Backend Interaction**:
  - **Login**: Authenticate user with GraphQL mutation.
  - **Sign Up**: Register new user with GraphQL mutation.

### **2. Dashboard/Home Screen**

- **Purpose**: Provide an overview of the user’s habits and progress.
- **Components**:
  - List of habits with progress indicators (e.g., streaks).
  - "Add New Habit" button.
  - Summary of completed habits for the day/week/month.
- **Backend Interaction**:
  - **Fetch**: Retrieve all user habits with GraphQL query.
  - **Update**: Update habit progress with GraphQL mutation.

### **3. Habit Details Screen**

- **Purpose**: Display detailed information about a specific habit.
- **Components**:
  - Habit name, description, and frequency.
  - Progress tracking (e.g., completion rate, streak).
  - Edit button.
  - Delete button.
- **Backend Interaction**:
  - **Fetch**: Retrieve specific habit details with GraphQL query.
  - **Update**: Edit habit details with GraphQL mutation.
  - **Delete**: Remove habit with GraphQL mutation.

### **4. Add/Edit Habit Screen**

- **Purpose**: Create a new habit or modify an existing one.
- **Components**:
  - Input fields for habit name, description, and frequency.
  - Save button.
- **Backend Interaction**:
  - **Create**: Add new habit with GraphQL mutation.
  - **Update**: Modify existing habit with GraphQL mutation.

### **5. Habit Tracking Screen**

- **Purpose**: Track and mark habits as completed for the day.
- **Components**:
  - List of daily habits with checkboxes or toggle switches.
  - Calendar view to track daily progress.
- **Backend Interaction**:
  - **Update**: Record completion status with GraphQL mutation.

### **6. Profile/Settings Screen**

- **Purpose**: Manage user profile and app settings.
- **Components**:
  - Profile information (e.g., email, password).
  - Notification preferences.
  - Logout button.
- **Backend Interaction**:
  - **Fetch**: Retrieve user profile details with GraphQL query.
  - **Update**: Edit profile or settings with GraphQL mutation.
  - **Logout**: Invalidate user session/token.

## **User Flow**

1. **Login/Sign Up** → **Dashboard**
   - Users log in or sign up and are redirected to the Dashboard.

2. **Dashboard** → **Add Habit** / **Habit Details**
   - Users can add a new habit or select an existing habit to view details.

3. **Add/Edit Habit** → **Dashboard**
   - After saving or editing a habit, users return to the Dashboard with updated data.

4. **Dashboard** → **Habit Tracking**
   - Users navigate to the daily Habit Tracking Screen from the Dashboard.

5. **Dashboard** → **Profile/Settings**
   - Users access settings or profile management from the Dashboard.

## **CRUD Operations in the UI**

- **Create**:
  - Use the **Add/Edit Habit Screen** to input new habit data.
  - On save, send a GraphQL mutation to create a new habit and update the Dashboard.

- **Read**:
  - Display habits on the **Dashboard** and **Habit Details Screen**.
  - Use GraphQL queries to fetch user-specific habit data.

- **Update**:
  - Edit habits on the **Add/Edit Habit Screen**.
  - Mark habits as completed on the **Habit Tracking Screen**.
  - Use GraphQL mutations to save changes and update the UI.

- **Delete**:
  - Provide a delete option on the **Habit Details Screen**.
  - Confirm deletion, remove the habit using a GraphQL mutation, and update the Dashboard.

## **Button Actions and Navigation**

- **Login/Sign Up Button**: Redirects users to the Dashboard upon successful login.
- **Add New Habit Button**: Navigates to the Add/Edit Habit Screen.
- **Habit Item on Dashboard**: Opens the Habit Details Screen.
- **Save/Edit Button on Habit Screen**: Saves changes and returns to the Dashboard.
- **Delete Button on Habit Details Screen**: Prompts for confirmation and deletes the habit.
- **Checkbox/Toggle in Habit Tracking Screen**: Updates habit completion status.

## **Design Considerations**

- **Consistency**: Ensure a uniform design across all screens.
- **Usability**: Prioritize intuitive navigation and clear interactions.
- **Accessibility**: Implement features like large touch targets, high-contrast colors, and screen reader support.
- **Responsiveness**: Design for various screen sizes and orientations.

## **Additional Notes**

- **Prototyping**: Create interactive prototypes to validate the design and user flow.
- **User Testing**: Conduct user testing to gather feedback and refine the design.
- **Feedback Loop**: Regularly update the design based on user feedback and testing results.
