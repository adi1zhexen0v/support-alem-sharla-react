import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthInput from "./components/AuthInput";
import { firebaseAuthSignIn } from "../../firebase/auth";
import { CHAT_ROUTE } from "../../utils/consts";
import { getErrorMessage } from "../../utils/errors";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setUser } from "../..//redux/slices/userSlice";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signIn = async (event: FormEvent) => {
    setError("Загрузка...");
    event.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      const authResult = await firebaseAuthSignIn(email, password);

      if (typeof authResult === "string") {
        setError(getErrorMessage(authResult));
      } else {
        const { email, uid } = authResult;
        const token = await authResult.getIdToken();
        dispatch(
          setUser({
            email,
            token,
            id: uid,
          }),
        );
        navigate(CHAT_ROUTE);
      }
    } else {
      setError("Ошибка: Заполните все поля");
    }
  };

  return (
    <div className="auth">
      <form className="auth-form" onSubmit={signIn}>
        <h1 className="auth-form__title">Вход</h1>
        <AuthInput
          value={email}
          setValue={setEmail}
          placeholder="E-mail"
          icon={faEnvelope}
        />
        <AuthInput
          value={password}
          setValue={setPassword}
          placeholder="Пароль"
          icon={faLock}
          isPassword={true}
        />
        <input type="submit" value="Войти" className="auth-form__submit" />
        {error && <p className="auth-form__error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
