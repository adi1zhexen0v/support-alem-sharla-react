export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Ошибка: Некорректный формат e-mail.';
    case 'auth/email-already-in-use':
      return 'Ошибка: E-mail уже используется.';
    case 'auth/missing-password':
      return 'Ошибка: Заполните поле пароля.';
    case 'auth/weak-password':
      return 'Ошибка: Слабый пароль. Пароль должен быть длиннее.';
    case 'auth/wrong-password':
      return 'Ошибка: Введен неверный пароль.';
    case 'auth/user-not-found':
      return 'Ошибка: Пользователь с указанным e-mail не найден.';
    case 'auth/user-disabled':
      return 'Ошибка: Пользователь отключен администратором.';
    case 'auth/too-many-requests':
      return 'Ошибка: Превышен лимит попыток входа. Попробуйте позже.';
    case 'auth/operation-not-allowed':
      return 'Ошибка: Метод аутентификации не разрешен на вашем Firebase проекте.';
    case 'auth/network-request-failed':
      return 'Ошибка: Ошибка сети, невозможно выполнить запрос.';
    default:
      return 'Ошибка при аутентификации.';
  }
};
