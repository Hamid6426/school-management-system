# School Management System Structure

## Root Level
- `.env`
- `.env.local`
- `package.json`
- `package-lock.json`
- `next.config.js`
- `.gitignore`
- `node_modules`
- `public`
    - `school-logo.svg`
    - `teacher-icon.svg`
    - `admin-icon.svg`
    - `student-icon.svg`
    - `parent-icon.svg`
    - `guest-icon.svg`

## `src` Directory

### `styles`
- `global.css`
- `darkmode.css`

### `fonts`
- `GeistMonoVF.woff`
- `GeistVF.woff`

### `lib`
- `mongodb.js`
- `models`
    - `User.js`
    - `Student.js` (Optional, if you want a separate model for students)
    - `Teacher.js` (Optional, if you want a separate model for teachers)
    - `Parent.js` (Optional, if you want a separate model for parents)
    - `Course.js`
    - `Attendance.js`
- `utils`
    - `VerifyToken.js`
    - `sendEmail.js` (For email-related utilities)
    - `formatDate.js` (For date formatting)
- `middlewares`
    - `authMiddleware.js`
    - `roleMiddleware.js`

### `components`
- `GetStarted.js`
- `Login.js`
- `Logout.js`
- `Header.js`
- `Dropdown.js`
- `ThemeToggle.js`
- `Profile.js`
- `Student.js`
- `Teacher.js`
- `Parent.js`
- `Courses.js`
- `Attendance.js`
- `Notification.js`
- `AdminDashboard.js`
- `Sidebar.js` (Could help in managing dynamic navigation across various roles)
- `navbar`
    - `AdminNavbar.js`
    - `ParentNavbar.js`
    - `StudentNavbar.js`
    - `TeacherNavbar.js`

## `pages` Directory
- `_app.js`
- `_document.js`
- `index.js`
- `layout.js`

### `api` Directory
- `login.js`
- `register.js`
- `forgot-password.js`
- `reset-password.js`
- `profile.js`
- `student.js`
- `teacher.js`
- `parent.js`
- `courses.js`
- `attendance.js`
- `notifications.js`
- `admin-dashboard.js`

### `authentication` Directory
- `login`
    - `index.js`
- `sign-up`
    - `index.js`
- `forgot-password`
    - `index.js`
- `reset-password`
    - `index.js`

### `dashboard` Directory

#### `admin`
- `manage-students`
    - `index.js`
- `manage-teachers`
    - `index.js`
- `manage-parents`
    - `index.js`
- `manage-courses`
    - `index.js`
- `attendance-reports`
    - `index.js`
- `admin-settings`
    - `index.js`
- `index.js` (Admin dashboard homepage)

#### `parent`
- `child-progress`
    - `index.js`
- `attendance`
    - `index.js`
- `parent-settings`
    - `index.js`
- `index.js` (Parent dashboard homepage)

#### `student`
- `courses.js`
    - `index.js`
- `attendance.js`
    - `index.js`
- `marks.js`
    - `index.js`
- `student-settings.js`
    - `index.js`
- `index.js` (Student dashboard homepage)

#### `teacher`
- `manage-students`
    - `index.js`
- `assign-grades`
    - `index.js`
- `attendance`
    - `index.js`
- `teacher-settings`
    - `index.js`
- `index.js` (Teacher dashboard homepage)

#### `guest`
- `about`
    - `index.js`
- `contact`
    - `index.js`
- `faq`
    - `index.js`
- `terms-and-conditions`
    - `index.js`
- `index.js` (Guest homepage)

<!-- School Management System

-   .env
-   .env.local
-   package.js
-   package.lock.js
-   next-config.js
-   .gitignore
-   node_modules    
-   public
    -   school-logo.svg
    -   teacher-icon.svg
    -   admin-icon.svg
    -   student-icon.svg
    -   parent-icon.svg
    -   guest-icon.svg
-   src
    -   styles
        -   global.css
        -   darkmode.css

    -   fonts
        -   GeistMonoVF.woff
        -   GeistVF.woff

    -   lib
        -   mongodb.js
        -   models
            -   User.js
        -   utils (frequently used functions)
            -   VerifyToken.js

    -   components
        -   GetStarted.js
        -   Login.js
        -   Logout.js
        -   Header.js
        -   Dropdown.js
        -   ThemeToggle.js
        -   profile.js
        -   student.js
        -   teacher.js
        -   parent.js
        -   courses.js
        -   attendance.js
        -   notification.js
        -   admin-dashboard.js
        -   navbar
            -   AdminNavbar.js
            -   ParentNavbar.js
            -   StudentNavbar.js
            -   TeacherNavbar.js
    -   pages
        -   _app.js
        -   _documents.js
        -   index.js
        -   layout.js
        -   api
            -   login.js
            -   register.js
            -   forgot-password.js
            -   reset-password.js
        -   authentication
            -   login
                -   index.js
            -   sign-up
                -   index.js
            -   forgot-password
                -   index.js
            -   reset-password
                -   index.js  (Admin dashboard homepage)
        -   dashboard
            -   admin
                -    manage-students
                    -   index.js
                -    manage-teachers
                    -   index.js
                -    manage-parents
                    -   index.js
                -    manage-courses
                    -   index.js
                -    attendance-reports
                    -   index.js
                -    admin-settings
                    -   index.js
                -   index.js
                
            -   parent
                -   child-progress
                    -   index.js
                -   attendance
                    -   index.js
                -   parent-settings
                    -   index.js
                -   index.js (Parent dashboard homepage)
            -   student
                -   courses.js
                    -   index.js
                -   attendance.js
                    -   index.js
                -   marks.js
                    -   index.js
                -   student-settings.js
                    -   index.js
                -   index.js (Student dashboard homepage)  
            -   teacher
                -   manage-students
                    -   index.js
                -   assign-grades
                    -   index.js
                -   attendance
                    -   index.js
                -   teacher-settings
                    -   index.js
                -   index.js (Teacher dashboard homepage)
                guest
                -   about
                    -   index.js
                -   contact
                    -   index.js
                -   faq
                    -   index.js
                -   terms-and-conditions
                    -   index.js
                -   index.js (Guest homepage) -->