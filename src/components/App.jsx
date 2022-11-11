import { useState } from 'react';

import { FeedbackOptions } from './Feedback/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notifications } from './Statistics/Notifications';

import { Container } from './Feedback/FeedbackOptions.styled';

export function App() {
  const [state, setState] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
  });

  const onLeaveFeedback = option => {
    setState(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, item) => acc + item, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return Number(Math.round((state.good / countTotalFeedback()) * 100));
  };
  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions options={state} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notifications message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
}

export default App;
