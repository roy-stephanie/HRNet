import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useDispatch } from 'react-redux';
import cities from './cities';
import departments from './departments';
import { addEmployee } from '../store/employeesSlice';
import { Modal } from "react-light-dialog-modal";
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
    onSubmit: async ({ value }) => {
      console.log('Form Values:', value);
      dispatch(addEmployee(value));  // Dispatch form values to the Redux store
      openModal(); // Open the modal to confirm employee creation
    },
  });

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Modal id={"modal1"} isOpen={isModalOpen} onClose={closeModal} size={modalSize} className="custom">
        Employee Created!
      </Modal>
      <div className="card shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body">
          <h1 className="section-title text-center mb-4">Create Employee</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(); // Trigger form submission
            }}
          >
            <div className="row mb-3">
              {/* First Name Field */}
              <div className="col-md-6">
                <form.Field
                  name="firstName"
                  children={(field) => (
                    <>
                      <label htmlFor={field.name} className="form-label">First Name</label>
                      <input
                        id={field.name}
                        className="form-control rounded-pill"
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
              <div className="col-md-6">
                <form.Field
                  name="lastName"
                  children={(field) => (
                    <>
                      <label htmlFor={field.name} className="form-label">Last Name</label>
                      <input
                        id={field.name}
                        className="form-control rounded-pill"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                    </>
                  )}
                />
              </div>
            </div>

            <div className="row mb-3">
              {/* Date of Birth Field */}
              <div className="col-md-6">
                <form.Field
                  name="dateOfBirth"
                  children={(field) => (
                    <>
                      <label htmlFor={field.name} className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        id={field.name}
                        className="form-control rounded-pill"
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
              <div className="col-md-6">
                <form.Field
                  name="startDate"
                  children={(field) => (
                    <>
                      <label htmlFor={field.name} className="form-label">Start Date</label>
                      <input
                        type="date"
                        id={field.name}
                        className="form-control rounded-pill"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                    </>
                  )}
                />
              </div>
            </div>

            {/* Address Fieldset */}
            <fieldset className="form-group form-address mb-3">
              <legend className="fw-bold">Address</legend>

              <div className="row mb-3">
                {/* Street Field */}
                <div className="col-md-12">
                  <form.Field
                    name="address.street"
                    children={(field) => (
                      <>
                        <label htmlFor={field.name} className="form-label">Street</label>
                        <input
                          id={field.name}
                          className="form-control rounded-pill"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="row mb-3">
                {/* City Field */}
                <div className="col-md-6">
                  <form.Field
                    name="address.city"
                    children={(field) => (
                      <>
                        <label htmlFor={field.name} className="form-label">City</label>
                        <input
                          id={field.name}
                          className="form-control rounded-pill"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />
                      </>
                    )}
                  />
                </div>

                {/* State Field */}
                <div className="col-md-6">
                  <form.Field
                    name="address.state"
                    children={(field) => (
                      <>
                        <label htmlFor={field.name} className="form-label">State</label>
                        <select
                          id={field.name}
                          className="form-select rounded-pill"
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
                </div>
              </div>

              <div className="row mb-3">
                {/* Zip Code Field */}
                <div className="col-md-6">
                  <form.Field
                    name="address.zipCode"
                    children={(field) => (
                      <>
                        <label htmlFor={field.name} className="form-label">Zip Code</label>
                        <input
                          id={field.name}
                          className="form-control rounded-pill"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                        />
                      </>
                    )}
                  />
                </div>
              </div>
            </fieldset>

            {/* Department Field */}
            <div className="mb-3">
              <form.Field
                name="department"
                children={(field) => (
                  <>
                    <label htmlFor={field.name} className="form-label">Department</label>
                    <select
                      id={field.name}
                      className="form-select rounded-pill"
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
            <button type="submit" className="btn btn-primary rounded-pill w-100">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
