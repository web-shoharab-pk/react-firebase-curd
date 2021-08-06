import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import firebaseDB from '../firebase';

const Contacts = () => {
    const [contactsObject, setContactsObject] = useState({});
    const [currentId, setCurrentId] = useState('');
 

    useEffect(() => {
        firebaseDB.child('contacts').on('value', snapshot => {
            if (snapshot.val() != null) {
                setContactsObject({
                    ...snapshot.val()
                })
            } else {
                setContactsObject({})
            }
        })
    }, [])

    const addOrEdit = obj => {

        if (!currentId) {
            firebaseDB.child('contacts').push(obj,
                err => {
                    if (err) {
                        console.log(err);
                    }
                }
            )
        } else {
            firebaseDB.child(`contacts/${currentId}`).set(obj,
                err => {
                    if (err) {
                        console.log(err);
                    } else {
                        setCurrentId('')
                    }
                }
            )
        }
       
    }

    const onDelete = (key) => {
        if(window.confirm('Are you sure to delete this record?')) {
            firebaseDB.child(`contacts/${key}`).remove(
                err => {
                    if (err) {
                        console.log(err);
                    } else {
                        setCurrentId('')
                    }
                }
            )
        }
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container-fluid text-center">
                    <h1 className="display-4">Contact Register</h1>

                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm addOrEdit={addOrEdit} {...({addOrEdit, currentId, contactsObject})} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactsObject).map(id => {
                                    return <tr key={id}>
                                        <td>{contactsObject[id].fullName}</td>
                                        <td>{contactsObject[id].mobile}</td>
                                        <td>{contactsObject[id].email}</td>
                                        <td>
                                            <a onClick={() => setCurrentId(id)} href="#k" className="btn text-primary">
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a href="#k" className="btn text-danger" onClick={() => onDelete(id)}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Contacts;