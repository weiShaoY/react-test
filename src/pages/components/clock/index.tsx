import Left from './left';
import Right from './right';

function Clock() {

  return (
    <div
      className="grid grid-cols-2 h-full w-full"
    >
      <Left></Left>

      <Right></Right>
    </div>
  );
}

export default Clock;
