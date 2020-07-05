import React from 'react';
import { useStyles } from '../../components/styleButtons'
import Button from '@material-ui/core/Button';
import styles from '../../styles/reservation.module.css'
import GoogleMap from '../../components/googleMap';

export default function location() {
    return (
        <div className='appWrapper'>
            <div>
                <h1>select address from map</h1>
            </div>
            <GoogleMap />
            <div className='lineButtons'>
                <div className={useStyles().root}>
                    <Button variant="contained" color='primary' href="/steps/reservation">
                        ❮ back
                        </Button>
                </div>
                <div className={useStyles().root}>
                    <Button variant="contained" color='primary' href="/steps/overview">
                        next ❯
                        </Button>
                </div>
            </div>
        </div>
    );
}