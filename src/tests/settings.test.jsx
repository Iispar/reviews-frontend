import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Settings from '../pages/settings/Settings';
import Selections from '../pages/settings/Selections';
import UserInfo from '../pages/settings/UserInfo';
import DeleteAccount from '../pages/settings/DeleteAccount';

describe('settings site works fully', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });
  test('page renders with components', () => {
    const pageContainer = render(
      <BrowserRouter>
        <Settings visible />
      </BrowserRouter>,
    ).container;
    const header = pageContainer.querySelector('#settings__grid__header');
    const title = pageContainer.querySelector('#settings__grid__title');
    const selections = pageContainer.querySelector('#settings__grid__selections');
    const footer = pageContainer.querySelector('#settings__grid__footer');

    expect(header).toBeTruthy();
    expect(title).toBeTruthy();
    expect(selections).toBeTruthy();
    expect(footer).toBeTruthy();
  });
  test('selections component renders correctly', () => {
    const selectionsContainer = render(
      <Selections visible />,
    ).container;

    const editUser = selectionsContainer.querySelector('#selections__buttons__newUser');
    const deleteAccount = selectionsContainer.querySelector('#selections__buttons__delAccount');
    const form = selectionsContainer.querySelector('#selections__form');

    expect(editUser).toBeTruthy();
    expect(deleteAccount).toBeTruthy();
    expect(form).toBeTruthy();
  });
  test('userInfo renders and works', async () => {
    const mockClick = jest.fn();
    const userInfoContainer = render(
      <UserInfo
        updateName={mockClick}
        updateUsername={mockClick}
        updatePassword={mockClick}
        openForm={mockClick}
        visible
      />,
    ).container;

    const title = userInfoContainer.querySelector('#userInfo__header__title__username');
    const profilePicChange = userInfoContainer.querySelector('#userInfo__header__title__change');
    const closeBtn = userInfoContainer.querySelector('#userInfo__header__closeButton');
    const name = userInfoContainer.querySelector('#userInfo__values__name');
    const username = userInfoContainer.querySelector('#userInfo__values__username');
    const password = userInfoContainer.querySelector('#userInfo__values__password');

    expect(title).toBeTruthy();
    expect(profilePicChange).toBeTruthy();
    expect(closeBtn).toBeTruthy();
    expect(name).toBeTruthy();
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();

    const usernameBtn = userInfoContainer.querySelector('#userInfo__values__username__input__change');
    const nameBtn = userInfoContainer.querySelector('#userInfo__values__name__input__change');
    const passwordBtn = userInfoContainer.querySelector('#userInfo__values__password__confirmContainer__input__change');
    await user.click(usernameBtn);
    await user.click(nameBtn);
    await user.click(passwordBtn);
    await user.click(closeBtn);
    expect(mockClick).toBeCalledTimes(4);
  });
  test('deleteAccount renders and works', async () => {
    const mockClick = jest.fn();
    const deleteContainer = render(
      <DeleteAccount onSubmit={mockClick} openForm={mockClick} visible />,
    ).container;

    const title = deleteContainer.querySelector('#deleteAccount__header');
    const form = deleteContainer.querySelector('#deleteAccount__form');

    expect(title).toBeTruthy();
    expect(form).toBeTruthy();

    const submitBtn = deleteContainer.querySelector('#deleteAccount__form__inputs__deleteButton');
    const closeBtn = deleteContainer.querySelector('#userInfo__header__closeButton');
    await user.click(submitBtn);
    await user.click(closeBtn);
    expect(mockClick).toBeCalledTimes(2);
  });
});
