import React, {useState} from 'react';
import {useForm} from '@tanstack/react-form';
import {useDispatch} from 'react-redux';
import cities from './cities';
import departments from './departments';
import {addEmployee} from '../store/employeesSlice';
import {Modal} from "react-light-dialog-modal";
import useWindowWidth from "../hooks/useWindowWidth";

/**
 * EmployeeForm component is responsible for rendering the employee creation form.
 * It handles form submission, modal management, and integration with Redux.
 */
const EmployeeForm = () => {
  const dispatch = useDispatch();
  const windowWidth = useWindowWidth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine modal size based on window width
  const modalSize = windowWidth > 768 ? 500 : 300;

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Initialize the form using useForm hook from @tanstack/react-form
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      address: {
        street: '',
        city: '',
        state: 'Alabama',
        zipCode: '',
      },
      department: 'Sales',
    },
    onSubmit: async ({value}) => {
      console.log('Form Values:', value);
      dispatch(addEmployee(value));  // Dispatch form values to the Redux store
      openModal(); // Open the modal to confirm employee creation
    },
  });

  return (
    <div>
      <Modal id={"modal1"} isOpen={isModalOpen} onClose={closeModal} size={modalSize} className="custom">Employee Created !</Modal>
      <h1 className="section-title">Create Employee</h1>
      <div className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(); // Trigger form submission
          }}
        >
          {/* First Name Field */}
          <div className="form-group">
            <form.Field
              name="firstName"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>First Name</label>
                  <input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </>
              )}
            />
          </div>

          {/* Last Name Field */}
          <div className="form-group">
            <form.Field
              name="lastName"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Last Name</label>
                  <input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </>
              )}
            />
          </div>

          {/* Date of Birth Field */}
          <div className="form-group">
            <form.Field
              name="dateOfBirth"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Date of Birth</label>
                  <input
                    type="date"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </>
              )}
            />
          </div>

          {/* Start Date Field */}
          <div className="form-group">
            <form.Field
              name="startDate"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Start Date</label>
                  <input
                    type="date"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </>
              )}
            />
          </div>

          {/* Address Fieldset */}
          <fieldset className="form-group form-address">
            <legend>Address</legend>

            {/* Street Field */}
            <form.Field
              name="address.street"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Street</label>
                  <input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </>
              )}
            />

            {/* City Field */}
            <form.Field
              name="address.city"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>City</label>
                  <input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </>
              )}
            />

            {/* State Field */}
            <form.Field
              name="address.state"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>State</label>
                  <select
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  >
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />

            {/* Zip Code Field */}
            <form.Field
              name="address.zipCode"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Zip Code</label>
                  <input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </>
              )}
            />
          </fieldset>

          {/* Department Field */}
          <div className="form-group">
            <form.Field
              name="department"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Department</label>
                  <select
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  >
                    {departments.map((department, index) => (
                      <option key={index} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
