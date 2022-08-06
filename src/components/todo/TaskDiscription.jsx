import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTodoReqAction, updateTodoReqAction } from '../../store/actions';
import './TaskDiscription.scss'
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Formik, Form, Field } from 'formik';

function TaskDiscription() {
	const dispatch = useDispatch(); 
	const {id} = useParams();
	const [todo, setTodo] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		async function getTask() { 
			const todo = await dispatch(getTodoReqAction(id)); 

			setTodo(todo);
			setStatus(todo.status ? 'done' : 'in-progress')
		} 

		getTask();
	}, [id, dispatch])  //Тут таккож просив дописати 

	function changeStatus() {
		setStatus(status === 'done' ? 'in-progress' : 'done')
	}

	function saveValue(value) {
		dispatch(updateTodoReqAction(id, value));
	}

	return (
		<section className='task-discription'>
			<div className='task-discription__info'>
				<Link className={`task-discription__link-back btn ${status}`} to='/'>BACK</Link>
				<Formik
					onSubmit={saveValue}
					enableReinitialize={true}
				 	initialValues={todo}>
					{
						() => (
							<Form className='task-discription__form'>
								<div className='task-discription__inputs'>
									<div className={`task-discription__top ${status}`}>
										<div className={`task-discription__task-info ${status}`}>
											<span>Task:</span>
											<Field name='task' className='task-discription__task' type="text"/>
										</div>
										<div className='task-discription__status-info'>
											<Field className='status-info__checkbox' id='status' name='status' type='checkbox'></Field>
											<label className='status-info__label' htmlFor="status" onClick={changeStatus}>{status}</label>
										</div>
									</div>
									<Field as='textarea' name='discription' className={`task-discription__text ${status}`}></Field>
								</div>
								<Button
									sx={{
										display: 'flex',
										padding: '8px 15px 5px 15px',
										marginLeft: '20px',
										color: 'white',
										background: 'none',
										":hover": {
											background: 'rgb(0, 182, 121)',
										}
									}} 
									startIcon={<SaveIcon />}
									type='submit'
									className={`task-discription__btn btn ${status}`}>
									Save
								</Button>
							</Form>
						)
					}
				</Formik>
			</div>
		</section>
	)
}

export default TaskDiscription;