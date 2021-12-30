import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import ManageService from '../ManageService/ManageService';

const ManageServices = () => {
    const {services,setServices} = useAuth();

    const handleDelete = id =>{
        Swal.fire({
            title: 'Are you sure? You want to delete this!',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(` https://floating-cliffs-41974.herokuapp.com/services/${id}`,{
                  method:'DELETE',
                  headers:{
                      "content-type":"application/json"
                  }
              })
              .then(res => res.json())
              .then(data => {
                  if(data.deletedCount){
                    Swal.fire(
                        'Deleted!',
                        'Your Service has been deleted.',
                        'success'
                      )
                    };
                setServices(services.filter(service => service._id !== id));
              })
            }
          })
    };


    return (
        <Container className='py-3'>
            <div style={{backgroundColor:"white",borderRadius:"15px"}} className='p-3'>
                <Table responsive="sm" className='p-5' >
                    <thead>
                        <tr className='p-5 thead'>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        services.map(service => <ManageService
                        key={service._id}
                        service={service}
                        handleDelete={handleDelete}
                        />)
                    }
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default ManageServices;