import '../Home.css';
import Graph from '../components/Graph';
import Form from '../components/Form';
import UserMenu from '../components/UserMenu';

function Home(){
    return(
        <div className="Home bg-gray-100">
            <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
                <h1 className="text-5xl py-8 mb-2 bg-slate-700 text-white rounded-2xl border border-gray-200">Quản lý chi tiêu</h1>
                
                {/* UserMenu */}
                <div className="flex justify-end">   
                    <UserMenu></UserMenu>
                </div> 
                
                {/* grid column */}
                <div className="grid md:grid-cols-2 gap-4"> 
                    {/* Graph */}
                    <Graph></Graph>
                    {/* Form */}
                    <Form></Form>
                </div>
            </div>
        </div>
    )
}

export default Home;