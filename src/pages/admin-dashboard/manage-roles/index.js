import { useState } from 'react';
import RoleModal from '../../../components/Modals/RoleModal';

export default function ManageRoles() {
  const exampleUsers = [
    { _id: '1', fullName: 'John Doe', email: 'john@example.com' },
    { _id: '2', fullName: 'Jane Smith', email: 'jane@example.com' },
    { _id: '3', fullName: 'Mark Lee', email: 'mark@example.com' },
  ];

  const exampleRoles = [
    { _id: '1', userId: { _id: '1', fullName: 'John Doe' }, role: 'Admin' },
    { _id: '2', userId: { _id: '2', fullName: 'Jane Smith' }, role: 'Teacher' },
    { _id: '3', userId: { _id: '3', fullName: 'Mark Lee' }, role: 'Student' },
  ];

  const [roles, setRoles] = useState(exampleRoles);
  const [users] = useState(exampleUsers); // Static users, no need to fetch
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const handleAddRole = () => {
    setCurrentRole(null);
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setShowModal(true);
  };

  const handleDeleteRole = (id) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter((role) => role._id !== id));
    }
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <div className="container py-4">
      <h1>Manage Roles</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddRole}>
        Add New Role
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={role._id}>
              <td>{index + 1}</td>
              <td>{role.userId?.fullName || 'Unknown User'}</td>
              <td>{role.role}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEditRole(role)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRole(role._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <RoleModal
          roleData={currentRole}
          users={users}
          onClose={handleModalClose}
          onSave={(updatedRole) => {
            if (currentRole) {
              setRoles((prevRoles) =>
                prevRoles.map((r) => (r._id === updatedRole._id ? updatedRole : r))
              );
            } else {
              setRoles([...roles, updatedRole]);
            }
            handleModalClose();
          }}
        />
      )}
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import RoleModal from '../../../components/Modals/RoleModal';

// export default function ManageRoles() {
//   const [roles, setRoles] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentRole, setCurrentRole] = useState(null);

//   useEffect(() => {
//     const fetchRolesAndUsers = async () => {
//       try {
//         const roleRes = await fetch('/api/roles');
//         const userRes = await fetch('/api/users');
//         setRoles(await roleRes);
//         setUsers(await userRes);
//       } catch (error) {
//         console.error('Error fetching roles or users:', error);
//       }
//     };
//     fetchRolesAndUsers();
//   }, []);

//   const handleAddRole = () => {
//     setCurrentRole(null);
//     setShowModal(true);
//   };

//   const handleEditRole = (role) => {
//     setCurrentRole(role);
//     setShowModal(true);
//   };

//   const handleDeleteRole = async (id) => {
//     if (confirm('Are you sure you want to delete this role?')) {
//       await fetch(`/api/roles/${id}`, { method: 'DELETE' });
//       setRoles(roles.filter((role) => role._id !== id));
//     }
//   };

//   const handleModalClose = () => setShowModal(false);

//   return (
//     <div className="container py-4">
//       <h1>Manage Roles</h1>
//       <button className="btn btn-primary mb-3" onClick={handleAddRole}>
//         Add New Role
//       </button>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>User</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {roles.map((role, index) => (
//             <tr key={role._id}>
//               <td>{index + 1}</td>
//               <td>{role.userId?.fullName || 'Unknown User'}</td>
//               <td>{role.role}</td>
//               <td>
//                 <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEditRole(role)}>
//                   Edit
//                 </button>
//                 <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRole(role._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <RoleModal
//           roleData={currentRole}
//           users={users}
//           onClose={handleModalClose}
//           onSave={(updatedRole) => {
//             if (currentRole) {
//               setRoles((prevRoles) =>
//                 prevRoles.map((r) => (r._id === updatedRole._id ? updatedRole : r))
//               );
//             } else {
//               setRoles([...roles, updatedRole]);
//             }
//             handleModalClose();
//           }}
//         />
//       )}
//     </div>
//   );
// }
