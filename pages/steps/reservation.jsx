import React, { useContext } from 'react';
import { CurrentUserContext } from '../../context/context'
import { useStyles } from '../../components/styleButtons'
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Router from 'next/router'
import styles from '../../components/datePicker.module.css';


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
    } else if ((new Date(values.data1) - (new Date()) < 7200000)) {
        errors.data1 = `Selected time less than 2 hours`
    } else if (new Date(values.data2) < new Date(values.data1)) {
        errors.data2 = `Date mismatch`
    } else if ((new Date(values.data2) - new Date(values.data1)) < 14400000) {
        errors.data2 = `At least 4 hours`
    }
    return errors;
}


export default function reservation() {
    const [state, dispatch] = useContext(CurrentUserContext);

    const { handleSubmit, values, errors } = useFormik({
        initialValues: {
            data1: state.data1,
            data2: state.data2
        },
        onSubmit(values) {
            if (!errors.data2 && !errors.data1) {
                return Router.push("/steps/location")
            }
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
        <div className='appWrapper'>
            <div>
                <h1>select checkin checkout datetime</h1>
            </div>
            <form
                className={`${useStylesDate().container} ${styles.form}`}
                noValidate
                onSubmit={handleSubmit}
            >
                <div className={styles.formContainer}>
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
                </div>
                {/* <button disabled={errors.data1 || errors.data2} type="submit">Submit</button> */}
                <div className='lineButtons'>
                    <div className={useStyles().root}>
                        <Button
                            variant="contained"
                            color='primary'
                            href="/">
                            ❮ back
                    </Button>
                    </div>
                    <div className={useStyles().root}>
                        <Button
                            variant="contained"
                            color='primary'
                            // href="/steps/location"
                            type="submit"
                        >
                            next ❯
                    </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
