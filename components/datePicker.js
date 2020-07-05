import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CurrentUserContext } from '../context/context'
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import styles from './datePicker.module.css';

const useStylesDate = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

const validate = (values) => {
    const errors = {};
    if (new Date(values.data1) < new Date()) {
        errors.data1 = `Arrival date cannot be less than today's date!`
    } else if ( (new Date(values.data1) - (new Date()) < 7200000 ) ) {
        errors.data1 = `Selected time less than 2 hours`
    } else if ( new Date(values.data2) < new Date(values.data1)) {
        errors.data2 = `Date mismatch`
    } else if ( (new Date(values.data2) - new Date(values.data1)) < 14400000) {
        errors.data2 = `At least 4 hours`
    }
    return errors;
}

export default function MaterialUIPickers() {
    const [state, dispatch] = useContext(CurrentUserContext);

    const { handleSubmit, values, errors } = useFormik({
        initialValues: {
            data1: state.data1,
            data2: state.data2
        },
        onSubmit(values) {
        }
        , validate
    })
    const setData1 = (e) => {
        dispatch({ type: 'SET_DATA_1', payload: e.target.value })
        values.data1 = e.target.value;
    }

    const setData2 = (e) => {
        dispatch({ type: 'SET_DATA_2', payload: e.target.value })
        values.data2 = e.target.value;
    }

    return (
        <form
            className={`${useStylesDate().container} ${styles.form}`}
            noValidate
            onSubmit={handleSubmit}
        >
            <div className={styles.formElement}>
            <TextField
                id="datetime-local"
                label="arrival date"
                type="datetime-local"
                className={useStylesDate().textField}
                value={state.data1}
                onChange={setData1}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {errors.data1 && <div className={styles.error} >{errors.data1}</div>}
            </div>
            <div className={styles.formElement}>
            <TextField
                id="datetime-local"
                label="departure date"
                type="datetime-local"
                className={`${useStylesDate().textField} ${styles.textFieldCOntainer}`}
                value={state.data2}
                onChange={setData2}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {errors.data2 && <div className={styles.error} >{errors.data2}</div>}
            </div>
            <button disabled={errors.data1 || errors.data2} type="submit">Submit</button>
        </form>
    );
}