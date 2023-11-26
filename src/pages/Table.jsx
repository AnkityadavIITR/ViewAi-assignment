import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios';
import { server } from '../App';
import toast from 'react-hot-toast';

const Table = () => {
    const [userdata,setUserData]=useState();
    const [change,setChange]=useState(false);

    const fetchData = async () => {
        try {
          const res = await axios.get(`${server}?results=20`);
          const {results}=res.data;
          console.log(results);
          if (results) {
            window.localStorage.setItem('user_data', JSON.stringify(results));
            setChange(false)
            setUserData(results)
            toast.success("Fetch the New Users")
          }
        } catch (error) {
          console.error(error.message);
        }
      };

    useEffect(() => {
        if (!JSON.parse(window.localStorage.getItem('user_data')) || change) {
          fetchData();
        } else {
          setUserData(JSON.parse(window.localStorage.getItem('user_data')));
        }
      }, [change]);

      const handleRefreshClick = () => {
        localStorage.clear();
        setUserData(null);
        setChange(true);
      };

  return (
    <div className=' p-2 sm:p-5 md:p-10 bg-gray-100'>
    <h1 className=' text-2xl text-center font-serif mb-3'>Your Random User</h1>
    <button type='submit' onClick={handleRefreshClick} className='text-end px-3 py-1 bg-blue-600 text-white mb-2 '>Click New Users</button>
    <div className='overflow-x-auto'>
      <table className='w-full mx-auto p-2  min-w-screen-sm rounded-md '>
        <thead className='bg-gray-50 border-b-2 border-gray-200'>
          <tr >
            <th className={'p-[5px] w-20 md:p-3 text-sm font-semibold tracking-wide text-left'}>S.No</th>
            <th className='p-[5px] md:p-3 text-sm font-semibold tracking-wide text-left'>City</th>
            <th className='p-[5px] md:p-3 text-sm font-semibold tracking-wide text-left'>State</th>
            <th className='p-[5px] w-30 md:p-3 text-sm font-semibold tracking-wide text-left'>Country</th>
            <th className='p-[5px] md:p-3 text-sm font-semibold tracking-wide text-left'>Postcode</th>
            <th className='p-[5px] md:p-3 text-sm font-semibold tracking-wide text-left'> Number</th>
            <th className='p-[5px] w-30 md:p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
            <th className='p-[5px] md:p-3 text-sm font-semibold tracking-wide text-left'>Latitude</th>
            <th className='p-[5px] md:p-3 text-sm font-semibold tracking-wide text-left'>Longitutde</th>
          </tr>
        </thead>
            {
                userdata?(
                    <tbody className='divide-y divide-gray-100'>
                        {   
                            userdata.map((data,i)=>(
                                <tr className={i%2==0?"bg-gray-50" :"bg-white"} key={i}>
                                    <td className='font-bold md:p-3 text-blue-500 hover:underline'>{i+1}</td>
                                    <td className='md:p-3 text-sm'>{data.location?.city}</td>
                                    <td className='md:p-3 text-sm'>{data.location?.state}</td>
                                    <td className='md:p-3 w-30 text-sm'>{data.location?.country}</td>
                                    <td className='md:p-3 text-sm'>{data.location?.postcode}</td>
                                    <td className='md:p-3 text-sm'>{data.location?.street?.number}</td>
                                    <td className='md:p-3 text-sm w-30'>{data.name.first} {data.name.last}</td>
                                    <td className='md:p-3 text-sm'>{data.location?.coordinates?.latitude}</td>
                                    <td className='md:p-3 text-sm'>{data.location?.coordinates?.longitude}</td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                ):(null)
            }
      </table>
    </div>
    </div>
  )
}

export default Table;
