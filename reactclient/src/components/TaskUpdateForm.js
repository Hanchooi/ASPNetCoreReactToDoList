import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function TaskUpdateForm(props) {
    const initialFormData = Object.freeze({
        title: props.task.title,
        content: props.task.content
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

        const taskToUpdate = {
            taskId: props.task.taskId,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.API_URL_UPDATE_TASK;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onTaskUpdated(taskToUpdate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Updating the Task titled "{props.task.title}".</h1>

            <div className="mt-5">
                <label className="h3 form-label">Task title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Task content</label>
                <input value={formData.content} name="content" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onTaskUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    );
}
