import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, FormGroup, Label, Input,
} from 'reactstrap';
import { useAuth0 } from '../react-auth0-spa.jsx';

import '../styles/event-form.css';
import '../styles/pillbox.css';
import MedList from './MedList.jsx';
// import sample from './exampleData';

const Pillbox = () => {
  const { user } = useAuth0();

  // componentDidMount() {
  // axios.get('/api/pillbox/:userId')
  //   .then(response){
  //   console.log(response);
  // }
  // .catch((error) => {
  //     console.log(error);
  //   };
  // }

  const [med, setMed] = useState([]);
  const handleMed = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setMed(value);
  };
  const [dosage, setDosage] = useState([]);
  const handleDosage = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setDosage(value);
  };

  const [time, setTime] = useState([]);
  const handleTime = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setTime(value);
  };

  const [notes, setNotes] = useState([]);
  const handleNotes = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setNotes(value);
  };

  let [times] = useState([]);
  const addTime = () => {
    // may need to change times to a string and concat string
    console.log('getting time', times);
    times = times.push(time);
  };

  const [pic, setPic] = useState([]);
  const handlePic = (e) => {
    setPic(URL.createObjectURL(e.target.files[0]));
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios.post('/pillbox', {
      med,
      dosage,
      times,
      notes,
      pic,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* {sample.map((med) => {
          return (
            <div>
              <p id="rcorners1">
                Medication: {med.medication}
                <br />
                Dosage: {med.dosage}
                <br />
                Times: {med.times}
                <br />
                Notes: {med.notes}
                <br />
              </p>
            </div>
          );
        })} */}

      <div>
        <p id="rcorners1">
          Medication: {med}
          <br />
          Dosage (mg): {dosage}
          <br />
          Times: {times}
          {/* This needs to be fixed */}
          {times.map((newTime, i) => {
            return (
              <li key={times[i]}> {newTime} </li>
            );
          })}
          <br />
          Notes: {notes}
          <br />
          Pic:
          <br />
          <img src={pic} height="95" width="95" alt="" />
        </p>
      </div>
      <div className="form-container">
        <h1>
          Pillbox <span className="text-primary" />
        </h1>
      </div>
      <div className="new-event-form">
        <form onSubmit={handleClick}>
          <FormGroup>
            <Label for="med">Medication</Label>
            <Input
              type="text"
              name="med"
              id="med"
              placeholder="medication"
              value={med}
              onChange={handleMed}
            />
          </FormGroup>

          <FormGroup>
            <Label for="dosage">Dosage</Label>
            <Input
              type="text"
              name="dosage"
              id="dosage"
              placeholder="dosage"
              value={dosage}
              onChange={handleDosage}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="time">Time</Label>
            <Input
              type="time"
              name="time"
              id="time"
              dateformat="HH:mm"
              placeholder="time placeholder"
              value={time}
              onChange={handleTime}
            />
            <br />
            <Button color="primary" size="sm" onClick={addTime}>Add Time</Button>{' '}
          </FormGroup>
          <FormGroup>
            <Label for="notes">Notes</Label>
            <Input
              type="textarea"
              name="notes"
              id="notes"
              onChange={handleNotes}
            />
          </FormGroup>
          <input type="file" name="pic" onChange={handlePic} />
          <img src={pic} height="100" width="100" alt="" />
          <br />
          <br />
          <Button color="primary" size="sm">Submit</Button>{' '}
        </form>
      </div>
      <MedList />
    </div>
  );
};
export default Pillbox;
