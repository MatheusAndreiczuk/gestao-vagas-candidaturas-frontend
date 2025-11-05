import { Navbar } from '../../components/Navbar.js'

function Home (){
    return (
        <div className='h-screen overflow-hidden flex flex-col'>
            <Navbar />

            <div className='flex-1 flex items-start justify-center pt-10'>
                <div className='w-5/6'>
                    <fieldset className='border rounded-md p-10 shadow-lg'>

                    </fieldset>
                </div>
            </div>
        </div>
    )
}

export default Home