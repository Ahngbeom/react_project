import React, { useRef, useMemo, useCallback, useReducer } from 'react';

import Counter from './introduction/Counter';
import CreateUser from './introduction/CreateUser';
import Hello from './introduction/Hello';
import InputSample from './introduction/InputSample';
import UserList from './introduction/UserList';
import Wrapper from './introduction/Wrapper';

function countActiveUsers(users) {
  console.log('활성 사용자 수 세는 중....');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'a',
      email: 'a@gmail.com',
      active: false
    },
    {
      id: 2,
      username: 'b',
      email: 'b@gmail.com',
      active: true
    },
    {
      id: 3,
      username: 'c',
      email: 'c@gmail.com',
      active: false
    }
  ]
}

function reducer(state, action) {

  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => user.id === action.id ? { ...user, active: !user.active } : user)
      }
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
      active: false
    };
    dispatch({
      type: 'CREATE_USER',
      user: user
    })
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    dispatch({ type: 'REMOVE_USER', id: id });
  }, []);

  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE_USER', id: id });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

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
        <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        <div>활성 사용자 수: {count}</div>
      </Wrapper>

    </div>
  );
}

export default App;
