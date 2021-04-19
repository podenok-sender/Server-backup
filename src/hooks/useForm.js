import { useState } from 'react'

export const useForm = initialValues => {
    const [values, setValues] = useState(initialValues)

    return {
        values: values,
        setValues: setValues,
        handleChange: (e, regex = /.*/, message = '', whitelist = []) => {
            setValues({
                ...values,
                [e.target.name]: {
                    value: e.target.value,
                    error:
                        regex.test(e.target.value) || whitelist.includes(e.target.value)
                            ? null
                            : message
                }
            })
        }
    }
}
