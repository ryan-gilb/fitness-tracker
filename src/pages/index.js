import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Workout from '../components/Workout';
import session from '../session';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardLabel,
  CardContent,
} from '../components/Card';

export default function IndexPage() {
  const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
  return (
    <Layout>
      <Header medium>Your Current Session</Header>
      {session.workouts.length > 0
        ? session.workouts.map(workout => (
            <Workout
              key={workout.id}
              display={workout.display}
              sets={workout.sets}
              reps={workout.reps}
              weight={workout.weight}
            />
          ))
        : creatingNewWorkout || (
            <HeaderWrapper>
              <Header small>It's pretty empty in here</Header>
            </HeaderWrapper>
          )}

      {creatingNewWorkout && (
        <NewWorkout handleCompletion={() => setCreatingNewWorkout(false)} />
      )}

      <FAB onClick={() => setCreatingNewWorkout(true)}>
        <FontAwesomeIcon icon="plus" />
      </FAB>
    </Layout>
  );
}

function NewWorkout({ handleCompletion }) {
  const [name, setName] = useState('New Workout');
  const [sets, setSets] = useState(5);
  const [reps, setReps] = useState(5);
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(false);

  const nameRef = React.createRef();
  const setsRef = React.createRef();
  const repsRef = React.createRef();
  const weightRef = React.createRef();

  function handleSubmit(event) {
    event.stopPropagation();

    for (let [state, ref] of [
      [name, nameRef],
      [sets, setsRef],
      [reps, repsRef],
      [weight, weightRef],
    ]) {
      if (!state) {
        setError(true);
        ref.current.focus();
        return;
      }
    }

    session.addWorkout({ id: name, display: name, sets, reps, weight });
    handleCompletion();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Input
            type="text"
            ref={nameRef}
            value={name}
            onClick={e => e.stopPropagation()}
            onChange={e => setName(e.target.value)}
            onFocus={e => e.target.select()}
            error={error && !name}
          />
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardLabel htmlFor="sets">Sets</CardLabel>
          <Input
            small
            type="number"
            value={sets}
            onClick={e => e.stopPropagation()}
            onChange={e => setSets(e.target.value)}
            error={error && !sets}
          />
        </CardContent>
        <CardContent>
          <CardLabel htmlFor="reps">Reps</CardLabel>
          <Input
            small
            type="number"
            value={reps}
            onClick={e => e.stopPropagation()}
            onChange={e => setReps(e.target.value)}
            name="reps"
            error={error && !reps}
          />
        </CardContent>
        <CardContent>
          <CardLabel htmlFor="weight">Weight</CardLabel>
          <Input
            small
            autoFocus
            ref={weightRef}
            type="number"
            pattern="[0-9]*"
            value={weight}
            onClick={e => e.stopPropagation()}
            onChange={e => setWeight(e.target.value)}
            name="weight"
            error={error && !weight}
          />
        </CardContent>
      </CardBody>
      <Buttons>
        <Done onClick={handleSubmit}>Done</Done>
        <Cancel onClick={handleCompletion}>Cancel</Cancel>
      </Buttons>
    </Card>
  );
}

const Button = styled.button`
  border: 2px solid ${props => props.theme.robinhoodGreen};
  border-radius: 8px;
  background-color: ${props => props.theme.robinhoodGreen};
  color: white;
  width: 7rem;
  height: 3rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Buttons = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Done = styled(Button)``;

const Cancel = styled(Button)`
  background-color: ${props => props.theme.robinhoodRed};
  border-color: ${props => props.theme.robinhoodRed};
`;

function Chevron({ direction }) {
  return <StyledFontAwesomeIcon icon={`chevron-${direction}`} />;
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.robinhoodGreen};
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid white;
  border-radius: 0;
  background-color: ${props => props.theme.darkerRobinhoodBlack};
  color: white;
  appearance: none;
  text-align: center;
  height: 2rem;

  ${props =>
    css`
      ${props.small ? 'width: 3rem;' : ''}
      ${props.error ? `border-bottom-color: ${props.theme.robinhoodRed};` : ''}
    `}
`;

const HeaderWrapper = styled.section`
  margin: 2rem;
`;

const FAB = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  border-radius: 50%;
  border: none;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: ${props => props.theme.robinhoodGreen};
  color: white;

  :hover {
    color: white;
  }
`;
