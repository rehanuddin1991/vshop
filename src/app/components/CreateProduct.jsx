"use client"
import {useState} from "react";
//import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "../utility/FormHelper";
//import SubmitButton from "@/components/SubmitButton";
import {useRouter} from "next/navigation";
import toast from 'react-hot-toast';
const CreateProduct = () => {
    const [data, setData] = useState({ProductName:"",ProductCode:"",Img:"",UnitPrice:"",Qty:"",TotalPrice:""});
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router=useRouter();
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!data.ProductName){ setError('Product Name is Required');return;}
        if(!data.ProductCode){ setError('Product Code is Required');return;}
        if(!data.Img){ setError('Product Image is Required');return;}
        if(!data.Qty){ setError('Product Qty is Required');return;}
        if(!data.UnitPrice){ setError('Unit Price is Required');return;}
        if(!data.TotalPrice){ setError('Total Price is Required');return;}
        setLoading(true);
        setError(null);
    
        try {
          const response = await fetch('https://crud.teamrabbil.com/api/v1/CreateProduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error('Failed to save data');
          }
    
          const result = await response.json();
          toast.success('Data saved successfully');
          setData({ ProductName:"",ProductCode:"",Img:"",UnitPrice:"",Qty:"",TotalPrice:"" }); 
          router.push("/product/ProductList")
          
        } catch (err) {
          setError(err.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

    return (

        <div className="hero bg-base-200    ">
        <div className="hero-content  max-w-[50rem] ">
           
          <div className="card bg-base-100   max-w-[50rem]   shadow-2xl">
          <legend className="text-[blue] font-bold m-1 p-1 text-lg text-center">Create Product</legend>
            <form  className="card-body items-center justify-center gap-4   grid grid-cols-1 lg:grid-cols-2"  onSubmit={handleSubmit}>
            
           
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Product Name <span className="text-[red] font-bold">*</span> </span>
                </label>
                <input type="text" onChange={(e)=>{inputOnChange("ProductName",e.target.value)}} 
                placeholder="Input Product Name" className="input input-bordered"   />
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Product Code <span className="text-[red] font-bold">*</span></span>
                </label>
                <input type="text" onChange={(e)=>{inputOnChange("ProductCode",e.target.value)}} 
                placeholder="Input Product Code" className="input input-bordered"   />
              </div>

               


              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold" >Image <span className="text-[red] font-bold">*</span></span>
                </label>
                <input type="text" onChange={(e)=>{inputOnChange("Img",e.target.value)}} placeholder="Input Image URL" className="input input-bordered"  />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Unit Price <span className="text-[red] font-bold">*</span></span>
                </label>
                <input type="number" onChange={(e)=>{inputOnChange("UnitPrice",e.target.value)}} placeholder="Input Unit Price" className="input input-bordered"  />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Quantity <span className="text-[red] font-bold">*</span></span>
                </label>
                <input type="number" onChange={(e)=>{inputOnChange("Qty",e.target.value)}} placeholder="Input qty" className="input input-bordered"  />
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Total Price <span className="text-[red] font-bold">*</span></span>
                </label>
                <input type="number" onChange={(e)=>{inputOnChange("TotalPrice",e.target.value)}} placeholder="Input  total price" className="input input-bordered"  />
              </div>
               

              <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit"  >
        {loading ? 'Saving...' : 'Save'}
        <br />
       
      </button> <span className="label-text">{error && <p style={{ color: 'red' }}>{error}</p>}</span>
      
                
              </div>
            </form>
          </div>
        </div>
      </div>

    );
};
export default CreateProduct;