import React, { useContext } from 'react';
import { CurrentUserContext } from '../../context/context'
import { useStyles } from '../../components/styleButtons'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMapWrapper from '../../components/googleMap'
import TextField from '@material-ui/core/TextField';
import styles from '../../components/overview.module.css';

const useStylesDate = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function overview() {

    const rem = () => {
        localStorage.clear();
    }

    const [state, dispatch] = useContext(CurrentUserContext)

    return (
        <div className='appWrapper'>
            <div className={styles.overview}>
                <div className='text'>
                    <h1>selected data</h1>
                </div>
                <form
                    className={`${useStylesDate().container} ${styles.form}`}
                    noValidate>
                    <div className={styles.formElement}>
                        <TextField
                            id="datetime-local"
                            label="Next appointment"
                            type="datetime-local"
                            disabled={true}
                            value={state.data1}
                            defaultValue="2017-05-24T10:30"
                            className={useStylesDate().textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={styles.formElement}>
                        <TextField
                            id="datetime-local"
                            label="Next appointment"
                            type="datetime-local"
                            disabled={true}
                            value={state.data2}
                            defaultValue="2017-05-24T10:30"
                            className={useStylesDate().textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </form>
                <div>
                    <GoogleMapWrapper locked={true} />
                </div>
                <div className={styles.location}>
                    <div>
                        latitude: {state.location.lat}
                    </div>
                    <div className={styles.locationElement}>
                        longitude: {state.location.lng}
                    </div>
                </div>
            </div>
            <div className='lineButtons'>
                <div className={useStyles().root}>
                    <Button variant="contained" color='primary' href="/steps/location">
                        ❮ back
                    </Button>
                </div>
                <div className={useStyles().root}>
                    <Button
                        variant="contained"
                        color='primary'
                        href="/"
                        onClick={rem}
                    >
                        finish ❯
                    </Button>
                </div>
            </div>
        </div>
    );
}



