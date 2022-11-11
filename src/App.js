import React, { useState, useRef } from 'react';

import Counter from './Counter';
import CreateUser from './CreateUser';
import Hello from './Hello';
import InputSample from './InputSample';
import UserList from './UserList';
import Wrapper from './Wrapper';

function App() {
  let [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs, [name]: value
    });
  };

  const [users, setUsers] = useState([]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: ''
    })
    nextId.current += 1;
  };

  return (
    <div style={{ 'display': 'flex', 'flexWrap': 'wrap' }}>
      <Wrapper title="Child Component Test">
        <Hello />
        <Hello color="red" name="react" isSpecial />
        <Hello color="pink" name="react" />
      </Wrapper>

      <Wrapper title="useState Counter Test">
        <Counter />
      </Wrapper>

      <Wrapper title="useState Input Test">
        <InputSample />
      </Wrapper>

      <Wrapper title="Dynamic Array Test">
        <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
        <UserList users={users} />
      </Wrapper>

    </div>
  );
}

export default App;
