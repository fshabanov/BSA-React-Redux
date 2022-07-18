import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import isValidEmail from 'src/helpers/isValidEmail';
import useRouter from 'src/hooks/useRouter';
import 'src/assets/css/sign.css';
import EmailInput from 'src/components/input/EmailInput';
import PasswordInput from 'src/components/input/PasswordInput';
import NameInput from 'src/components/input/NameInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import { authActions } from 'src/store/actions';
import { IState } from 'src/@types';

const SignUp: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');

	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: IState) => state.auth);
	const { navigate } = useRouter();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isValidEmail(email)) {
			setEmailError('Invalid email');
			return;
		}
		dispatch(authActions.signUp({ fullName: name, email, password }));
	};
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailError('');
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	return (
		<main className='sign-up-page'>
			<h1 className='visually-hidden'>Travel App</h1>
			<form className='sign-up-form' autoComplete='off' onSubmit={handleSignUp}>
				<h2 className='sign-up-form__title'>Sign Up</h2>
				<NameInput value={name} onChange={handleNameChange} />
				<EmailInput
					value={email}
					onChange={handleEmailChange}
					error={emailError}
				/>
				<PasswordInput value={password} onChange={handlePasswordChange} />
				<button className='button' type='submit'>
					Sign Up
				</button>
			</form>
			<span>
				Already have an account?
				<Link to='/sign-in' className='sign-up-form__link'>
					Sign In
				</Link>
			</span>
		</main>
	);
};

export default SignUp;
