import AppRouter from './components/AppRouter';
import Sidebar from './components/Sidebar';
import { useAuth } from './hooks/useAuth';
import styles from './App.module.scss';
import "./assets/scss/style.scss";

function App() {  
  const { isAuth } = useAuth();
  return (
    <div className={styles.app}>
      { isAuth && <Sidebar/> }
      <AppRouter />
    </div>
  );
}

export default App;