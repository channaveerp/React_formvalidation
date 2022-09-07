import React, { useEffect, useState } from 'react';
import './form.css';

const Form = () => {
  const [formValue, setFormvalue] = useState({
    username: '',
    email: '',
    password: '',
  });
  console.log(formValue);
  const [formerrors, setformErrors] = useState({});
  const [isSubmit, setIssubmit] = useState(false);

  const handlechange = (e) => {
    let { name, value } = e.target;
    setFormvalue({ ...formValue, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(formValue));
    setIssubmit(true);
  };

  useEffect(() => {
    console.log(formerrors);
    if (Object.keys(formerrors).length === 0 && isSubmit) {
      console.log('formValue', formValue);
    }
  }, [formValue]);

  // validation

  const validate = (values) => {
    var errors = {};
    var regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.username) {
      errors.username = 'user name is required';
    }
    if (!values.email) {
      errors.email = 'user email is required';
    } else if (!regx.test(values.email)) {
      errors.email = 'This is not valid email';
    }
    if (!values.password) {
      errors.password = 'The password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more then four charector';
    } else if (values.password.length > 10) {
      errors.password = 'Password must be less then ten charector';
    }
    return errors;
  };

  return (
    <div>
      <div className='op'>
        <prev>{JSON.stringify(formValue, undefined, 3)}</prev>
      </div>

      <div className='container'>
        <form action='' onSubmit={handlesubmit} className='form'>
          <div>
            <label htmlFor=''>usename</label>
            <br />
            <input
              type='text'
              placeholder='enter suername'
              name='username'
              value={formValue.username}
              onChange={handlechange}
            />
          </div>
          <p style={{ color: 'red' }}>{formerrors.username}</p>
          <div>
            <label htmlFor=''>Email</label>
            <br />
            <input
              type='text'
              placeholder='enter Email'
              name='email'
              value={formValue.email}
              onChange={handlechange}
            />
            <p style={{ color: 'red' }}>{formerrors.email}</p>
          </div>
          <div>
            <label htmlFor=''>Password</label>
            <br />
            <input
              type='text'
              placeholder='neter password'
              name='password'
              value={formValue.password}
              onChange={handlechange}
            />
          </div>
          <p style={{ color: 'red' }}>{formerrors.password}</p>
          <button>Submit</button>
        </form>
      </div>
      <div>
        {Object.keys(formerrors).length === 0 && isSubmit ? (
          <h1 style={{ color: 'green' }}>form submitted succesfully</h1>
        ) : (
          <h1 style={{ color: 'red' }}>form not submited</h1>
        )}
      </div>
    </div>
  );
};

export default Form;
