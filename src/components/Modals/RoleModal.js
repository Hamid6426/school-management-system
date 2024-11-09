import { useState, useEffect } from 'react';

export default function RoleModal({ roleData, users, onClose, onSave }) {
  const [formData, setFormData] = useState({
    userId: '',
    role: '',
  });

  useEffect(() => {
    if (roleData) {
      setFormData({
        userId: roleData.userId._id || '',
        role: roleData.role || '',
      });
    } else {
      setFormData({
        userId: '',
        role: '',
      });
    }
  }, [roleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRole = {
      ...formData,
      _id: roleData ? roleData._id : `${Date.now()}`, // Generate a new ID if adding a new role
      userId: users.find((user) => user._id === formData.userId),
    };

    onSave(updatedRole);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "#777" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content bg-dark2 text-dark">
          <div className="modal-header">
            <h5 className="modal-title">{roleData ? 'Edit Role' : 'Add Role'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">User</label>
                <select
                  name="userId"
                  className="form-control"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                  disabled={!!roleData}
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.fullName} - {user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {roleData ? 'Save Changes' : 'Add Role'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


// import { useState, useEffect } from 'react';

// export default function RoleModal({ roleData, users, onClose, onSave }) {
//   const [formData, setFormData] = useState({
//     userId: '',
//     role: '',
//   });

//   useEffect(() => {
//     if (roleData) {
//       setFormData({
//         userId: roleData.userId._id || '',
//         role: roleData.role || '',
//       });
//     }
//   }, [roleData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = roleData ? 'PUT' : 'POST';
//     const url = roleData ? `/api/roles/${roleData._id}` : '/api/roles';

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         onSave(data);
//         onClose();
//       } else {
//         alert(data.message || 'Error saving role');
//       }
//     } catch (error) {
//       alert('Failed to save role');
//     }
//   };

//   return (
//     <div className="modal show d-block" style={{ backgroundColor: "#777" }} tabIndex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content bg-dark2 text-dark">
//           <div className="modal-header">
//             <h5 className="modal-title">{roleData ? 'Edit Role' : 'Add Role'}</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label className="form-label">User</label>
//                 <select
//                   name="userId"
//                   className="form-control"
//                   value={formData.userId}
//                   onChange={handleChange}
//                   required
//                   disabled={!!roleData}
//                 >
//                   <option value="">Select User</option>
//                   {users.map((user) => (
//                     <option key={user._id} value={user._id}>
//                       {user.fullName} - {user.email}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Role</label>
//                 <select
//                   name="role"
//                   className="form-control"
//                   value={formData.role}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Role</option>
//                   <option value="Admin">Admin</option>
//                   <option value="Teacher">Teacher</option>
//                   <option value="Student">Student</option>
//                   <option value="Parent">Parent</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={onClose}>
//                 Close
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 {roleData ? 'Save Changes' : 'Add Role'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
