import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import 'boxicons';

function UserMenu() {
  const {
    user: { photoURL, auth },
  } = useContext(AuthContext);
  const handleLogout = () => {
    auth.signOut();
  };

  const[open,setOpen] = useState(false);
  
  return (
    <div>
        <button onClick={()=>{setOpen(!open)}} className="h-12 w-12 rounded-full overflow-hidden ">
            <img className="h-full w-full object-cover" src={photoURL}/>
        </button>
        <div className={`dropdown-menu ${open ? 'active': 'inactive'}`}>
            <button onClick={handleLogout} className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-2 rounded inline-flex items-center">
                <box-icon name="log-out"></box-icon>
                <span>Đăng xuất</span>
            </button>
        </div>
    </div>
  )
}

export default UserMenu;
