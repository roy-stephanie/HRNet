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
    <div>
      <Modal id="Confirmation" className={"custom modal-dialog"} isOpen={isModalOpen} onClose={closeModal} size={modalSize.toString()} ariaDescribedby={"Confirmation"} ariaLabelledby={"Confirmation"}>
        Employee Created!
      </Modal>
      <div className="container mx-auto">
        <div>
          <h1 className="text-center">Create Employee</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(); // Trigger form submission
            }}
          >
            <div>
              {/* First Name Field */}
              <div>
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
              <div>
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
            </div>

            <div>
              {/* Date of Birth Field */}
              <div>
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
              <div>
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
            </div>

            {/* Address Fieldset */}
            <fieldset>
              <legend>Address</legend>

              <div>
                {/* Street Field */}
                <div>
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
                </div>
              </div>

              <div>
                {/* City Field */}
                <div>
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
                </div>

                {/* State Field */}
                <div>
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
                </div>
              </div>

              <div>
                {/* Zip Code Field */}
                <div>
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
                </div>
              </div>
            </fieldset>

            {/* Department Field */}
            <div>
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
            <button className="btn btn-sm btn-primary mt-2" type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
