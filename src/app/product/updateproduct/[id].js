"use client"
import {useState} from "react"; 
import {useRouter} from "next/navigation";
import toast from 'react-hot-toast';
export async function getStaticProps({ params }) {
    return {
      props: { id: params.id }, // Pass the dynamic data to the component
    };
  }
  export async function getStaticPaths() {
    return {
      paths: [
        { params: { id: '1' } },
        { params: { id: '2' } },
      ],
      fallback: false, // Return a 404 for paths not returned here
    };
  }
const UpdatePage= ({id}) => {
    
    //const [data, setData] = useState({ProductName:"",ProductCode:"",Img:"",UnitPrice:"",Qty:"",TotalPrice:""});
    const [data, setData] = useState(null);
    const [updatedData, setUpdatedData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router=useRouter();
    const { id } = router.query;

    useEffect(() => {
      if (!id) return;
  
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://crud.teamrabbil.com/api/v1/ReadProductByID/${id}`);
          const result = await response.json();
          setData(result);
          setUpdatedData(result.Qty);  // Assuming you're updating the 'name' field
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id]);


    const inputOnChange = (name,value) => {
      setUpdatedData(e.target.value);

        // setData((data)=>({
        //     ...data,
        //     [name]:value
        // }))
    }
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!data.ProductName){ setError('Product Name is Required');return;}
        // if(!data.ProductCode){ setError('Product Code is Required');return;}
        // if(!data.Img){ setError('Product Image is Required');return;}
        // if(!data.Qty){ setError('Product Qty is Required');return;}
        // if(!data.UnitPrice){ setError('Unit Price is Required');return;}
        // if(!data.TotalPrice){ setError('Total Price is Required');return;}
        setLoading(true);
        setError(null);
    
        try {
          const response = await fetch(`https://crud.teamrabbil.com/api/v1/UpdateProduct/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({Qty:updatedData}),
          });
    
          if (!response.ok) {
            throw new Error('Failed to Update data');
          }
    
          const result = await response.json();
          toast.success('Data Updated successfully');
          //setData({ ProductName:"",ProductCode:"",Img:"",UnitPrice:"",Qty:"",TotalPrice:"" }); 
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
                  <span className="label-text font-bold">Product Name</span>
                </label>
                <input type="text" onChange={(e)=>{inputOnChange("ProductName",e.target.value)}} 
                placeholder="Input Product Name" className="input input-bordered"   />
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Product Code</span>
                </label>
                <input type="text" onChange={(e)=>{inputOnChange("ProductCode",e.target.value)}} 
                placeholder="Input Product Code" className="input input-bordered"   />
              </div>

               


              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold" >Image</span>
                </label>
                <input type="text" onChange={(e)=>{inputOnChange("Img",e.target.value)}} placeholder="Input Image URL" className="input input-bordered"  />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Unit Price</span>
                </label>
                <input type="number" onChange={(e)=>{inputOnChange("UnitPrice",e.target.value)}} placeholder="Input Unit Price" className="input input-bordered"  />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Quantity</span>
                </label>
                <input type="number" onChange={(e)=>{inputOnChange("Qty",e.target.value)}} placeholder="Input qty" className="input input-bordered"  />
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Total Price</span>
                </label>
                <input type="number" onChange={(e)=>{inputOnChange("TotalPrice",e.target.value)}} placeholder="Input  total price" className="input input-bordered"  />
              </div>
               

              <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit"  >
        {loading ? 'Saving...' : 'Submit'}
        <br />
       
      </button> <span className="label-text">{error && <p style={{ color: 'red' }}>{error}</p>}</span>
      
                
              </div>
            </form>
          </div>
        </div>
      </div>

    );
};
export default UpdatePage ;