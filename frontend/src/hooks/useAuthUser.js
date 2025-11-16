import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '../lib/api.js';
import React from 'react'

const useAuthUser = () => {
  
  const authUser=useQuery({
    queryKey:["authUser"],
    queryFn:getAuthUser,
    retry:false,//auth check
    
  });
  console.log("authUser query result:", authUser);
  console.log("authUser.data:", authUser.data);


  return {isLoading:authUser.isLoading,authUser:authUser.data?.user}
}

export default useAuthUser
