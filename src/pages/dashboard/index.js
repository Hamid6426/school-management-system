const index = () => {
    const userRole = getUserRole(); // Assume this function gets the logged-in user role
  
    return (
      <div>
        {userRole === 'Admin' && <AdminDashboard />}
        {userRole === 'Teacher' && <TeacherDashboard />}
        {userRole === 'Student' && <StudentDashboard />}
        {userRole === 'Parent' && <ParentDashboard />}
      </div>
    );
  };
  
  export default index;
  