import ModelCreateUser from "./ModelCreateUser"
import './ManagaUser.scss'
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import { getApiUserAll } from "../../../service/ApiCreateNewUser"
import ModelUpdateUser from "./ModelUpdateUser"
import ModelDeleteUser from "./ModelDeleteUser"
const ManageUser =(props)=>{

    const [showModelUser,SetShowModelUser] = useState(false);
    const [showUpdateUser,SetShowUpdateUser] = useState(false)
    const [showDeleteUser,setDeleteUser] = useState(false)
    const [listUser,setListUser] = useState([]);
    const [dataUpdate,setDataUpdate] = useState({})
    const [dataDeleteUser,setDataDelete] = useState({});

    useEffect(()=>{
       fecthData();
        
    },[])

    const fecthData=async()=>{
       let res = await getApiUserAll();
        console.log(res);
        
        if(res.EC === 0){
            setListUser(res.DT)
        }


    }
    
    const handleUpdateUser = (user)=>{
        SetShowUpdateUser(true)
        setDataUpdate(user)
    }

    const handelDeleteUser =(user)=>{
        setDeleteUser(true)
        setDataDelete(user)

    }


    const handleCreateUser =()=>{
        SetShowModelUser(true)
    }

    const resetUpdateData=()=>{
        setDataUpdate({})
    }
    return(
        <>
            <div className="manage-user-container">
                <div className="title">
                    <h2>Quản Lí User</h2>

                </div>
                <div className="btn-button">
                    <button className="btn btn-primary" onClick={()=> handleCreateUser()}>Add New User</button>

                </div>
                <div className="">
                    <TableUser 
                    handelDeleteUser={handelDeleteUser}
                    handleUpdateUser={handleUpdateUser}
                    listUser={listUser}/>
                </div>

                <ModelCreateUser
                    show={showModelUser}
                    setShow={SetShowModelUser}
                    fetchData={fecthData}
                />

                <ModelUpdateUser 
                    show={showUpdateUser}
                    setShow={SetShowUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchData={fecthData}
                    resetUpdateData={resetUpdateData}

                />

                <ModelDeleteUser
                    show={showDeleteUser}
                    setShow={setDeleteUser}
                    dataDeleteUser={dataDeleteUser}
                />
            </div>

        </>
    )
}
export default ManageUser