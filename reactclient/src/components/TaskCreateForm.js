import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function TaskCreateForm(props) {
    const initialFormData = Object.freeze({
        title: "Task x",
        content: "This is Task x and it has some very interesting content."
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const taskToCreate = {
            taskId: 0,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.API_URL_CREATE_TASK;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onTaskCreated(taskToCreate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Create New Task</h1>

            <div className="mt-5">
                <label className="h3 form-label">Task title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Task content</label>
                <input value={formData.content} name="content" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onTaskCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    );
}
