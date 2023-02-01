import { createElem } from 'src/utils/create-element';
import { createLink } from 'src/utils/create-link-element';
import { linkHandler } from 'src/utils/link-handler';
import { login } from 'src/logic/redux/actions';
import { store, appDispatch } from 'src/logic/redux';
import { createButton } from '../ui/Button/Button';
import { createInputElement } from '../ui/Input/Input';
import { mailIcon, passwordIcon } from '../../const/icons/icons';
import styles from './Login.module.scss';

export const renderLoginPage = (): HTMLElement => {
  const stateInput = {
    email: '',
    password: '',
  };

  const main: HTMLElement = createElem('main', 'main');
  main.classList.add('main_backdrop');
  const mainContainer: HTMLElement = createElem('div', 'main__container');
  const mainContent: HTMLElement = createElem('div', styles['login-page']);

  const formContainer = createElem('div', 'form_container');

  const logo = createElem('div', 'form_logo');

  const errorWrapp = createElem('div', 'form__error');

  const wrapperEmail = createElem('form', 'form__wrapp');
  const labelEmail = createElem('label', 'form_label');
  const iconEmail = createElem('div', 'icon__container');
  iconEmail.innerHTML = mailIcon;
  const inputEmail = createInputElement({ type: 'email', placeholder: 'Введите email', id: 'email', name: 'email' });
  inputEmail.oninput = () => {
    stateInput.email = inputEmail.value;
  };

  wrapperEmail.append(labelEmail, iconEmail, inputEmail);

  const wrapperPas = createElem('form', 'form__wrapp');
  const labelPas = createElem('label', 'form_label');
  const iconPass = createElem('div', 'icon__container');
  iconPass.innerHTML = passwordIcon;
  const inputPas = createInputElement({
    type: 'password',
    placeholder: 'Введите пароль',
    id: 'password',
    name: 'password',
  });

  inputPas.oninput = () => {
    stateInput.password = inputPas.value;
  };

  wrapperPas.append(iconPass, labelPas, inputPas);

  const button = createButton(
    'Войти',
    () => {
      appDispatch(login({ email: stateInput.email, password: stateInput.password }));
    },
    'form_button'
  );

  const registrationContainer = createElem('div', 'reg__container');
  const registrationLink = createLink('/register', 'reg__link', true, 'Зарегистрироваться');
  registrationLink.onclick = linkHandler;

  const registrationText = createElem('div', 'reg__text');
  registrationText.innerHTML = `, если у вас не аккаунта.`;
  registrationContainer.append(registrationLink, registrationText);

  formContainer.append(logo, errorWrapp, wrapperEmail, wrapperPas, button, registrationContainer);
  mainContent.append(formContainer);
  mainContainer.append(mainContent);
  main.append(mainContainer);

  store.subscribe(() => {
    const loginState = store.getState().auth.login;

    const loginLoading = loginState.isLoading;
    button.innerText = loginLoading ? 'Загрузка' : 'Войти';

    if (loginState.error) {
      errorWrapp.style.visibility = 'visible';
      errorWrapp.innerHTML = loginState.error?.message as string;
    } else {
      errorWrapp.style.visibility = 'hidden';
    }
  });

  return main;
};
