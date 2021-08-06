import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = ({ addOrEdit, currentId, contactsObject }) => {



    const { register, handleSubmit } = useForm();
    const [values, setValues] = useState({
        fullName: '',
        mobile: '',
        email: '',
        address: ''
    })

    useEffect(() => {
        if (!currentId) {
            setValues({ ...values })
        } else {
            setValues({...contactsObject[currentId]})
        }
    }, [currentId,  values, contactsObject])
    const onSubmit = data => {
        console.log(data);
        addOrEdit(data)
    };



    return (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input
                defaultValue={values.fullName}
                    {...register("fullName", { required: true })}
                    type="text" placeholder="Full Name"
                    className="form-control" />
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <input
                    defaultValue={values.mobile}
                        {...register("mobile", { required: true })} type="text" placeholder="Mobile" className="form-control" />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input
                    defaultValue={values.email}
                        {...register("email", { required: true })} type="email" placeholder="Email" className="form-control" />
                </div>

            </div>
            <div className="form-group">
                <textarea
                defaultValue={values.address}
                    {...register("address", { required: true })}
                    className="form-control" placeholder="Address"></textarea>
            </div>
            <div className="form-group">
                <input type="submit" value={!currentId ? 'SAVE' : 'UPDATE'} className="btn btn-primary btn-block" />

            </div>
        </form>
    );
};

export default ContactForm;