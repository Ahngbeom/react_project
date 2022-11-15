import React, { useState, useRef } from 'react';

import Counter from './introduction/Counter';
import CreateUser from './introduction/CreateUser';
import Hello from './introduction/Hello';
import InputSample from './introduction/InputSample';
import UserList from './introduction/UserList';
import Wrapper from './introduction/Wrapper';

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
      email,
      active: false
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: ''
    })
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
  }

  const onToggle = id => {
    setUsers(users.map(user => user.id === id ? {...user, active: !user.active} : user));
  }

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
        <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      </Wrapper>

    </div>
  );
}

export default App;
