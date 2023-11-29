import { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from './AuthInput.module.scss';

interface AuthInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  icon: IconDefinition;
  isPassword?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  value,
  setValue,
  placeholder,
  icon,
  isPassword,
}) => {
  return (
    <div className={styles.block}>
      <FontAwesomeIcon icon={icon} />
      <input
        type={isPassword ? "password" : "text"}
        className={styles.input}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        placeholder={placeholder}
      />
    </div>
  );
};

export default AuthInput;
