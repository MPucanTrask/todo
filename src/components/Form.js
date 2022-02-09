import React from "react";
import {useState, useReducer} from "react";
import {getBrandOptions} from "../data/brandOptions";
import CustomCheckbox from "./CustomCheckbox";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      brand: '',
      age: 0,
      firstName: '',
      lastName: '',
      'decision': false
    }
  }

  return {
    ...state,
    [event.name]: event.value
  }
}

function Form() {
  const [formData, setFormData] = useReducer(formReducer, {
    age: 18, firstName: 'Chico'
  })

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setFormData({
        reset: true
      })
    }, 2000)
  }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox'
    const eventValueAfterCheckIsNumber = event.target.type === 'number' ? parseInt(event.target.value) : event.target.value

    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : eventValueAfterCheckIsNumber
    })
  }

  const brandOptions = getBrandOptions()

  const checkboxes = [
    {
      label: 'Are you in?',
      disabled: formData.age < 18,
      name: 'decision',
      checked: formData['decision'] || false
    },
    {
      label: 'Audi premium?',
      disabled: formData.brand !== 'audi',
      name: 'specificBrand',
      checked: formData['specificBrand'] || false
    }
  ]

  return (
    <div className="c-todo-card">
      <h3>TODO list</h3>
      {submitting &&
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}><strong>{name}</strong>: {value.toString()}</li>
            ))}
          </ul>
        </div>
      }

      <form onSubmit={handleSubmit}>
        <fieldset disabled={submitting}>
          <legend>Personal information's</legend>
          <label>
            <div>First Name</div>
            <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} />
          </label>
          <label>
            <div>Last Name</div>
            <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} />
          </label>
        </fieldset>
        <fieldset disabled={submitting}>
          <legend>Specification</legend>
          <label>
            <div>Brand</div>
            <select name="brand" onChange={handleChange} value={formData.brand || ''}>
              {brandOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label>
            <div>Age</div>
            <input type="number" name="age" onChange={handleChange} step="1" value={formData.age || ''}/>
          </label>
          {checkboxes.map(({...otherParameters}) => (
            <CustomCheckbox
              onChange={handleChange}
              {...otherParameters}
            />
          ))}
        </fieldset>
        <button type="submit" disabled={submitting} className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Form;
