import React from 'react';
import { Form } from 'react-bootstrap';

const CreateEditForm = ({ formsubmit, children, className, validated }) => {
  const handleFormSubmit = e => {
    e.preventDefault();
    formsubmit();
  }
  return (
    <Form noValidate validated={validated}  className={className} onSubmit={handleFormSubmit}>{children}</Form>
  )
}

CreateEditForm.propTypes = {

}

export default CreateEditForm
