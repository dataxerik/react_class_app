import Rebase from 're-base';
import firebae from 'firebase';

const firebaseApp = firebae.initializeApp({
    apiKey: "AIzaSyBD_Zge45nGt_Md2DeAbPvW01drLIE4i3M",
    authDomain: "react-wes-bos-class.firebaseapp.com",
    databaseURL: "https://react-wes-bos-class.firebaseio.com" 
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a defaul export
export default base;