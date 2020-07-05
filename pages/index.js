import React from 'react';
import { useStyles } from '../components/styleButtons'
import Button from '@material-ui/core/Button';

function MyImage() {
  return <img src="/Capture.jpg" alt="my image" />
}

export default function Index() {
  return (
    <div className='appWrapper'>
      <div className='text'>
        <h1>Task for King David</h1>
        <MyImage/>
      </div>
      <div className={`${useStyles().root} lineButtons`}>
        <Button variant="contained" color='primary' href="/steps/reservation">
          to begin
        </Button>
      </div>
    </div>
  );
}
