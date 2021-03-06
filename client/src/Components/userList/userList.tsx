import './userList.scss';
import UserItem from '../userItem/userItem';
import React from 'react';
import { IUser } from '../../interfaces';

type UserListProps = {
  userList: IUser[];
  userData: IUser;
};

const userList: React.FC<UserListProps> = ({userList, userData}) => {
  const sortedList: IUser[] = userList && userList.sort(
    (b: IUser, a: IUser) => a.score - b.score
  );
  let topScore: number = 0;
  if (sortedList && sortedList.length) {
    topScore = sortedList[0].score;
  }
  const users: JSX.Element[] =
    userList && userList.length > 0
      ? userList
          .sort((a: IUser, b: IUser) => b.score - a.score)
          .map((user: IUser) => (
            <UserItem
              key={user.id}
              self={user.id === userData.id}
              topScore={topScore}
              user={user}
            />
          ))
      : [<div key="loading">loading...</div>];

  return <div className='user_list'> {userList &&userData ? users: null}</div>;
};

export default userList;
