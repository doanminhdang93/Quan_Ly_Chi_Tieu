import '../Home.css';
import Graph from '../components/Graph';
import Form from '../components/Form';
import UserMenu from '../components/UserMenu';
import Table from '../components/Table';
import MonthlyGraph from '../components/MonthlyGraph';
import ScrollButton from '../components/ScrollButton';

const Home = () =>{
    return(
        <div className="Home bg-gray-100">
            <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
                <h1 className="text-5xl py-8 mb-2 bg-slate-700 text-white rounded-2xl border border-gray-200">Quản lý chi tiêu</h1>
                
                {/* UserMenu */}
                <div className="flex justify-end">   
                    <UserMenu></UserMenu>
                </div> 
                
                <div className="grid grid-cols-1 gap-4">
                    {/* grid column */}
                    <div className="grid md:grid-cols-2 gap-4"> 
                        {/* Graph */}
                        <Graph></Graph>
                        {/* Form */}
                        <Form></Form>
                    </div>

                    <h1 className="text-4xl font-bold mt-12">Biểu đồ mức chi tiêu biến động qua các tháng</h1>
                    {/* Monthly Graph */}
                    <div>
                        <MonthlyGraph></MonthlyGraph>
                    </div>

                    <h1 className="text-4xl font-bold mt-12">Bảng thống kê chi tiêu hàng tháng</h1>
                    {/* Table */}
                    <div className='flex justify-center '>
                        <Table></Table>
                    </div>
                    <div className='flex justify-end'>
                    {/* Scroll to top button */}
                        <ScrollButton></ScrollButton>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Home;