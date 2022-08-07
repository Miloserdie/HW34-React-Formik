import { useFormikContext } from "formik";
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function SubmitButton() {
	const formikContext = useFormikContext();
	
	return (
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
			disabled={formikContext.isSubmitting || !formikContext.dirty || !formikContext.isValid}
			type='submit'
			className={`task-discription__btn btn`}>
			Save
		</Button>
	)
}

export default SubmitButton;