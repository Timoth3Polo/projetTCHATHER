import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { Input, Button } from "@tchather/tchather-ui";
import style from "./home.module.css";
import { userLogin } from '../../services/userService';
const Home: React.FC<RouteComponentProps> = () => {
  const [userEmail, setUserEmail] = useState<string>("")
  const [userPassword, setUserPassword] = useState<string>("")
  const handleSubmit = async () => {
    const response = await userLogin({userEmail, userPassword})
    console.log(response);
  }
  return (

    <div className={style.Home_Page}>
      <div className={style.Login_Container}>
      <h2>Connexion</h2>
        <div className={style.Input_Wrapper}>
            <Input placeholder="Email" value={userEmail} onChange={(e: any) => setUserEmail(e.target.value)} />
        </div>
        <div className={style.Input_Wrapper}>
            <Input placeholder="Mot de passe" value={userPassword} onChange={(e: any) => setUserPassword(e.target.value)} />
        </div>
        <Button onClick={handleSubmit} type="success" customClass={style.Login_Button}>Connexion</Button>
      </div>
    </div>
  );
};

export default Home;
