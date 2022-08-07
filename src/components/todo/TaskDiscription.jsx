import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTodoReqAction, updateTodoReqAction } from '../../store/actions';
import './TaskDiscription.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SubmitButton from '../form/SubmitBytton/SubmitButton';

function TaskDiscription() {
	const dispatch = useDispatch(); 
	const {id} = useParams();
	const [todo, setTodo] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		async function getTask() { 
			const todo = await dispatch(getTodoReqAction(id)); 

			setTodo(todo);
			setStatus(todo.status ? 'done' : 'in-progress');
		} 

		getTask();
	}, [id, dispatch])  //Тут таккож просив дописати 

	function changeStatus() {
		setStatus(status === 'done' ? 'in-progress' : 'done');
	}

	function saveValue(values) {
		dispatch(updateTodoReqAction(id, values));
	}

	function validation(values) {
		const errors = {};

		if(!values.task.length) {
			errors.task = 'Fiels is required';
		}

		return errors
	}

	return (
		<section className='task-discription'>
			<div className='task-discription__info'>
				<Link className={`task-discription__link-back btn ${status}`} to='/'>BACK</Link>
				<Formik
					onSubmit={saveValue}
					validate={validation}
					enableReinitialize={true}
				 	initialValues={todo}>
					<Form className='task-discription__form'>
						<div className='task-discription__inputs'>
							<div className={`task-discription__top ${status}`}>
								<div className={`task-discription__task-info ${status}`}>
									<span>Task:</span>
									<Field name='task' className='task-discription__task' type="text"/>
									<ErrorMessage className='task-discription__error-massage' name='task' component='span' />
								</div>
								<div className='task-discription__status-info'>
									<Field className='status-info__checkbox' id='status' name='status' type='checkbox'></Field>
									<label className='status-info__label' htmlFor="status" onClick={changeStatus}>{status}</label>
								</div>
							</div>
							<Field as='textarea' name='discription' className={`task-discription__text ${status}`}></Field>
						</div>
						<SubmitButton></SubmitButton>
					</Form>
				</Formik>
			</div>
		</section>
	)
}

export default TaskDiscription;