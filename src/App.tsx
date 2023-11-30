import AppRouter from './components/AppRouter';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';
import { useAuth } from './hooks/useAuth';
import { useUpdateUser } from './hooks/useUpdateUser';
import styles from './App.module.scss';
import "./assets/scss/style.scss";

function App() {  
  const { isAuth, isLoading, user } = useAuth();
  useUpdateUser(user);

  if (isLoading) {
    return (
      <Loader isLarge={true} isFullPage={true} />
    );
  }

  return (
    <div className={styles.app}>
      { isAuth && <Sidebar/> }
      <div className={styles.content}>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;