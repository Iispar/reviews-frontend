import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Selections from '../pages/settings/Selections';
import UserInfo from '../pages/settings/UserInfo';
import DeleteAccount from '../pages/settings/DeleteAccount';

describe('settings site works fully', () => {
  test('selections component renders correctly', () => {
    const mock = jest.fn();
    const selectionsContainer = render(
      <Selections visible setPassword={mock} />,
    ).container;

    const editUser = selectionsContainer.querySelector('#selections__buttons__newUser');
    const deleteAccount = selectionsContainer.querySelector('#selections__buttons__delAccount');
    const form = selectionsContainer.querySelector('#selections__form');

    expect(editUser).toBeTruthy();
    expect(deleteAccount).toBeTruthy();
    expect(form).toBeTruthy();
  });
  test('userInfo renders and works', async () => {
    const mockSubmit = jest.fn((e) => e.preventDefault());
    const mockClick = jest.fn();
    const userInfoContainer = render(
      <UserInfo
        updateName={mockSubmit}
        updateUsername={mockSubmit}
        updatePassword={mockSubmit}
        openForm={mockClick}
        visible
        setNewPassword={() => jest.fn()}
      />,
    ).container;

    const title = userInfoContainer.querySelector('#userInfo__header__title__username');
    const profilePicChange = userInfoContainer.querySelector('#userInfo__header__title__change');
    const closeBtn = userInfoContainer.querySelector('#userInfo__header__closeButton');
    const password = userInfoContainer.querySelector('#userInfo__values__password');

    expect(title).toBeTruthy();
    expect(profilePicChange).toBeTruthy();
    expect(closeBtn).toBeTruthy();
    expect(password).toBeTruthy();
  });
  test('deleteAccount renders and works', async () => {
    const deleteContainer = render(
      <DeleteAccount visible />,
    ).container;

    const title = deleteContainer.querySelector('#deleteAccount__header');
    const form = deleteContainer.querySelector('#deleteAccount__form');

    expect(title).toBeTruthy();
    expect(form).toBeTruthy();
  });
});
