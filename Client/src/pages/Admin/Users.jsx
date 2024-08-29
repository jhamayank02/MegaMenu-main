/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { base_url } from '../../Utils/baseUrl';
import { FaEye,  FaTrash } from 'react-icons/fa';
import { List } from '@mui/material';
import { MdBlockFlipped } from "react-icons/md";
import { Space, Switch } from "antd";
import { CgUnblock } from "react-icons/cg";
import { config } from '../../Utils/axiosConfig';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import BasicModal from '../../components/Models/Model';
import Loader from '../../components/reusablesUI/Loader'


const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: null,
    email: null,
    mobile: null
  });
  const [open, setOpen] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);
  const handleOpen = ()=>setOpen(true);
  const handleClose = ()=>setOpen(false);

  
const columns = [
  {
    header: "Sr.No.",
    accessorKey: "id",
    cell: ({ row }) => {
      const id = row.id;
      return <span>{id}</span>;
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    invertSorting: true,
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Contact",
    accessorKey: "mobile",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => {
      return (
        <select
          value={row.original.role}
          className="border-2 p-2 outline-none rounded-md border-[#038CCC]"
        >
          <option value="Admin">Admin</option>
          <option value="Admin">Users</option>
          <option value="Bussiness">Bussiness</option>
        </select>
      );
    },
  },
  {
    header: "Action",
    cell: ({row}) => {
    
     return (
      <List
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <div onClick={()=>deleteUser(row.original._id)} className="bg-red-200 p-2 rounded-md" >
        <FaTrash className="text-red-500" />
      </div>
      <div onClick={()=>fetchUserDetails(row.original._id)} className="bg-blue-200 p-2 rounded-md">
        {/* <FaEye className="text-blue-500 " /> */}
        <BasicModal open={open} handleOpen={handleOpen} handleClose={handleClose} icon={<FaEye className="text-blue-500 " />}>
        <div className="w-1/2 h-[50vh]">
          {fetchingUser && <div className='flex items-center justify-center h-[inherit] w-full'>Fetching User Details...</div>}
          {!fetchingUser && <div className=''>
            <div>
              <div><span>Name:</span>{userDetails?.name}</div>
              <div><span>Email:</span>{userDetails?.email}</div>
              <div><span>Mobile:</span>{userDetails?.mobile}</div>
            </div>
          </div>}
          </div>
        </BasicModal>
      </div>
      <Space direction="vertical">
        <Switch
          checkedChildren={<MdBlockFlipped className="mt-[5px]" />}
          unCheckedChildren={<CgUnblock />}
          defaultChecked
        />
      </Space>
    </List>
    )}
  },
];
  
  const deleteUser = async (id)=>{
    try {
      const response = await fetch(`${base_url}user/${id}`, {
        method: "DELETE",
        ...config
      });
      const data = await response.json();
      if(!data.success){
        toast.error(data.message);
        return;
      }
      setReload(prev => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  const fetchUserDetails = async (id)=>{
    try {
      // setFetchingUser(true);
      const response = await fetch(`${base_url}user/${id}`, {
        method: "GET",
        ...config
      });
      const data = await response.json();
      // if(!data.success){
      //   toast.error(data.message);
      //   return;
      // }
      setUserDetails({
        name: data?.getaUser?.name,
        email: data?.getaUser?.email,
        name: data?.getaUser?.mobile,
      })
      // setFetchingUser(false);
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  useEffect(() => {
    const FetchUsers = async () => {
      let response = await fetch(`${base_url}user/all-users`);
      let data = await response.json();
      setUsers(data);
      setIsLoading(false);
    };
    FetchUsers();
    
  }, [reload])
  

  return (
    <>
    <Toaster />
      <div className=" border-2 mt-10 mx-12 rounded-md shadow-md gap-4 h-auto flex flex-col items-center justify-around  p-6">
        <div className="w-full">
          <h1 className="text-2xl font-bold uppercase">
            List Of Registerd Users on KFS
          </h1>
        </div>
      </div>
      <div className="m-12 shadow-md border-2 rounded-md p-2">
        <BasicTable columns={columns} data={users} />
      </div>
    </>
  );
}

export default Users
