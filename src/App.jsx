import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'


function App() {

    const [dataForm, setDataForm] = useState([])

    useEffect(() => {
        const dataForm = JSON.parse(localStorage.getItem('dataForm'))

        if (dataForm) {
            setDataForm(dataForm)
        }
    }, [])

    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    function onSubmit(data) {
        // Parse : String to Object
        const form = JSON.parse(localStorage.getItem('dataForm') || '[]')

        const dataForm = {
            email: data.email,
            password: data.password
        }

        form.push(dataForm)

        // Stringify : Object to String
        localStorage.setItem('dataForm', JSON.stringify(form))
    }

    return (
        <div className="w-full h-full py-[5rem] flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Email</label><br />
                    <input
                        type="text"
                        name="email"
                        {...register("email", {
                            required: true,
                            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                        })}
                    />
                    {errors.email?.type === "required" && (
                        <p className="text-red-500">Email is required.</p>
                    )}
                    {errors.email?.type === "pattern" && (
                        <p className="text-red-500">Email is not valid.</p>
                    )}

                </div><br />
                <div className="form-control">
                    <label>Password</label><br />
                    <input
                        type="password"
                        name="password"
                        {...register("password", {
                            required: true,
                            minLength: 8
                        })}
                    />
                    {errors.password?.type === 'required' && (
                        <p className="text-red-500">Password is required.</p>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <p className="text-red-500">Password should be at least 8 character</p>
                    )}
                </div><br />
                <div className="form-control">
                    <button type="submit" className='bg-violet-500 text-white p-2 w-full'>Login</button>
                </div>
            </form>

            {/* Show data */}
            <div>
                {
                    dataForm.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{item.email}</p>
                                <p>{item.password}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default App
